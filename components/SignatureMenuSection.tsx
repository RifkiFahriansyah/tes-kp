/**
 * SignatureMenuSection — Server Component
 *
 * Fetches signature menu items from Supabase at request time and passes
 * them to the <SignatureMenu> client component.
 *
 * If the Supabase env variables are not configured yet (local dev without
 * a DB), the component gracefully falls back to the static hardcoded items
 * defined in lib/data.ts — no runtime error, no blank section.
 */

import SignatureMenu from "@/components/SignatureMenu";
import { menuRowToDisplay, type DisplayMenuItem } from "@/lib/menu-utils";
import { getSignatureMenusAction } from "@/app/admin/actions";

export default async function SignatureMenuSection() {
  // Guard: skip DB call when env vars are absent (avoids crash in local dev)
  const isConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let items: DisplayMenuItem[] | undefined;

  if (isConfigured) {
    const rows = await getSignatureMenusAction();
    if (rows.length > 0) {
      items = rows.map(menuRowToDisplay);
    }
    // If rows is empty, items stays undefined → SignatureMenu uses static fallback
  }

  // Pass items only when we have real DB data; otherwise let SignatureMenu
  // render its built-in static fallback (MENU_ITEMS from data.ts).
  return <SignatureMenu items={items} />;
}
