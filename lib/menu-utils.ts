import type { MenuRow } from "@/lib/database.types";

/**
 * Normalised shape used by the menu cards.
 * Shared between the server component (SignatureMenuSection) and
 * the client component (SignatureMenu) — must NOT import any client-only code.
 */
export type DisplayMenuItem = {
  id:    string;
  name:  string;
  price: string;   // always formatted as Rp string
  desc:  string;
  img:   string | null;
  badge: string | null;
  notes: string[];
};

/** Convert a Supabase MenuRow to the display model. */
export function menuRowToDisplay(row: MenuRow): DisplayMenuItem {
  return {
    id:    row.id,
    name:  row.name,
    price: `Rp ${Number(row.price).toLocaleString("id-ID")}`,
    desc:  row.description ?? "",
    img:   row.image_url,
    badge: row.is_signature ? "Signature" : null,
    notes: [],
  };
}
