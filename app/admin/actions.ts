"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase";
import type { MenuRow, MenuInsert, MenuUpdate } from "@/lib/database.types";

// ─── Constants ──────────────────────────────────────────────────────────────

const SESSION_COOKIE   = "aaa_admin_session";
const SESSION_VALUE    = "authenticated";
const COOKIE_MAX_AGE   = 60 * 60 * 8; // 8 hours
const STORAGE_BUCKET   = "menu-images";

// ─── Auth Actions ────────────────────────────────────────────────────────────

/** Validates the admin password and sets a session cookie. */
export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const password     = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "ADMIN_PASSWORD env variable is not configured." };
  }

  if (password !== adminPassword) {
    return { error: "Incorrect password. Please try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   COOKIE_MAX_AGE,
    path:     "/",
  });

  redirect("/admin");
}

/** Clears the admin session cookie. */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/** Checks whether the current request has a valid admin session. */
export async function checkSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

// ─── Menu CRUD Actions ───────────────────────────────────────────────────────

/** Fetches all menu items ordered by creation date (newest first). */
export async function getMenusAction(): Promise<{ data: MenuRow[]; error?: string }> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data: (data ?? []) as MenuRow[] };
}

/** Fetches only signature menu items for the landing page. */
export async function getSignatureMenusAction(): Promise<MenuRow[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .eq("is_signature", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[getSignatureMenusAction]", error.message);
    return [];
  }
  return (data ?? []) as MenuRow[];
}

/**
 * Uploads an image file to Supabase Storage and returns the public URL.
 * Returns null if no file is provided.
 */
async function uploadMenuImage(
  file: File | null,
  existingUrl?: string | null
): Promise<string | null> {
  if (!file || file.size === 0) return existingUrl ?? null;

  const supabase  = createServerSupabase();
  const ext       = file.name.split(".").pop() ?? "jpg";
  const fileName  = `menu-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, { upsert: false, contentType: file.type });

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

/** Deletes an image from Supabase Storage by its public URL. */
async function deleteMenuImage(imageUrl: string | null | undefined): Promise<void> {
  if (!imageUrl) return;

  const supabase = createServerSupabase();
  // Extract the file path after the bucket name in the URL
  const marker   = `/${STORAGE_BUCKET}/`;
  const idx      = imageUrl.indexOf(marker);
  if (idx === -1) return;

  const filePath = imageUrl.slice(idx + marker.length);
  await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);
}

/** Inserts a new menu item. Accepts FormData so file uploads work. */
export async function addMenuAction(
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = createServerSupabase();

  const name        = (formData.get("name") as string).trim();
  const price       = parseFloat(formData.get("price") as string);
  const description = (formData.get("description") as string)?.trim() || null;
  const imageFile   = formData.get("image") as File | null;
  const isSignature = formData.get("is_signature") === "true";

  if (!name)           return { error: "Menu name is required." };
  if (isNaN(price))    return { error: "A valid price is required." };

  let imageUrl: string | null = null;
  try {
    imageUrl = await uploadMenuImage(imageFile);
  } catch (err) {
    return { error: (err as Error).message };
  }

  const row: MenuInsert = { name, price, description, image_url: imageUrl, is_signature: isSignature };
  const { error } = await supabase.from("menus").insert(row);

  if (error) return { error: error.message };
  return {};
}

/** Updates an existing menu item. Accepts FormData so file uploads work. */
export async function updateMenuAction(
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = createServerSupabase();

  const id          = formData.get("id") as string;
  const name        = (formData.get("name") as string).trim();
  const price       = parseFloat(formData.get("price") as string);
  const description = (formData.get("description") as string)?.trim() || null;
  const imageFile   = formData.get("image") as File | null;
  const existingUrl = formData.get("existing_image_url") as string | null;
  const isSignature = formData.get("is_signature") === "true";

  if (!id)             return { error: "Menu ID is required." };
  if (!name)           return { error: "Menu name is required." };
  if (isNaN(price))    return { error: "A valid price is required." };

  let imageUrl: string | null = existingUrl;
  try {
    imageUrl = await uploadMenuImage(imageFile, existingUrl);
  } catch (err) {
    return { error: (err as Error).message };
  }

  const updates: MenuUpdate = { name, price, description, image_url: imageUrl, is_signature: isSignature };
  const { error } = await supabase.from("menus").update(updates).eq("id", id);

  if (error) return { error: error.message };
  return {};
}

/** Deletes a menu item and its associated image. */
export async function deleteMenuAction(
  id: string,
  imageUrl: string | null
): Promise<{ error?: string }> {
  const supabase = createServerSupabase();

  const { error } = await supabase.from("menus").delete().eq("id", id);
  if (error) return { error: error.message };

  // Best-effort image cleanup (don't block on failure)
  await deleteMenuImage(imageUrl).catch(console.warn);

  return {};
}
