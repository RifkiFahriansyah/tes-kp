/**
 * Supabase database type definitions.
 * Mirrors the `menus` table schema created in the Supabase dashboard.
 *
 * SQL to create the table:
 * ─────────────────────────────────────────────────────────
 * CREATE TABLE menus (
 *   id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
 *   name         text        NOT NULL,
 *   price        numeric     NOT NULL,
 *   description  text,
 *   image_url    text,
 *   is_signature boolean     NOT NULL DEFAULT false,
 *   created_at   timestamptz NOT NULL DEFAULT now()
 * );
 * ─────────────────────────────────────────────────────────
 */
export type Database = {
  public: {
    Tables: {
      menus: {
        Row: {
          id:           string;
          name:         string;
          price:        number;
          description:  string | null;
          image_url:    string | null;
          is_signature: boolean;
          created_at:   string;
        };
        Insert: {
          id?:           string;
          name:          string;
          price:         number;
          description?:  string | null;
          image_url?:    string | null;
          is_signature?: boolean;
          created_at?:   string;
        };
        Update: {
          id?:           string;
          name?:         string;
          price?:        number;
          description?:  string | null;
          image_url?:    string | null;
          is_signature?: boolean;
          created_at?:   string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
  graphql_public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

/** Convenience type for a menu row returned from the database */
export type MenuRow = Database["public"]["Tables"]["menus"]["Row"];

/** Convenience type for inserting a menu row */
export type MenuInsert = Database["public"]["Tables"]["menus"]["Insert"];

/** Convenience type for updating a menu row */
export type MenuUpdate = Database["public"]["Tables"]["menus"]["Update"];
