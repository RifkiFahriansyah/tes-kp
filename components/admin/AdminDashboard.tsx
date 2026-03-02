"use client";

import { useState, useTransition, useCallback } from "react";
import Image from "next/image";

import toast, { Toaster } from "react-hot-toast";
import {
  Coffee,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Star,
  ImageOff,
  Loader2,
  UtensilsCrossed,
} from "lucide-react";

import MenuFormModal, { type ModalMode } from "@/components/admin/MenuFormModal";
import {
  logoutAction,
  addMenuAction,
  updateMenuAction,
  deleteMenuAction,
  getMenusAction,
} from "@/app/admin/actions";
import type { MenuRow } from "@/lib/database.types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface AdminDashboardProps {
  initialMenus: MenuRow[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminDashboard({ initialMenus }: AdminDashboardProps) {
  const [menus, setMenus]                 = useState<MenuRow[]>(initialMenus);
  const [isPending, startTransition]      = useTransition();
  const [isLogoutPending, startLogout]    = useTransition();
  const [isSubmitting, setIsSubmitting]   = useState(false);

  // Modal state
  const [modalMode, setModalMode]         = useState<ModalMode>("add");
  const [editTarget, setEditTarget]       = useState<MenuRow | null>(null);
  const [modalOpen, setModalOpen]         = useState(false);

  // Confirm delete overlay
  const [deleteTarget, setDeleteTarget]   = useState<MenuRow | null>(null);
  const [isDeleting, setIsDeleting]       = useState(false);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const refreshMenus = useCallback(() => {
    startTransition(async () => {
      const { data, error } = await getMenusAction();
      if (error) toast.error("Failed to refresh menu list.");
      else setMenus(data);
    });
  }, []);

  // ── Open modal helpers ────────────────────────────────────────────────────

  function openAddModal() {
    setEditTarget(null);
    setModalMode("add");
    setModalOpen(true);
  }

  function openEditModal(item: MenuRow) {
    setEditTarget(item);
    setModalMode("edit");
    setModalOpen(true);
  }

  function closeModal() {
    if (isSubmitting) return;
    setModalOpen(false);
    setEditTarget(null);
  }

  // ── CRUD handlers ─────────────────────────────────────────────────────────

  async function handleFormSubmit(formData: FormData) {
    setIsSubmitting(true);
    const action   = modalMode === "add" ? addMenuAction : updateMenuAction;
    const label    = modalMode === "add" ? "Menu item added!" : "Menu item updated!";

    const toastId  = toast.loading(modalMode === "add" ? "Adding item…" : "Saving changes…");

    const result   = await action(formData);

    if (result.error) {
      toast.error(result.error, { id: toastId });
    } else {
      toast.success(label, { id: toastId });
      closeModal();
      refreshMenus();
    }
    setIsSubmitting(false);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);

    const toastId = toast.loading("Deleting item…");
    const result  = await deleteMenuAction(deleteTarget.id, deleteTarget.image_url);

    if (result.error) {
      toast.error(result.error, { id: toastId });
    } else {
      toast.success("Menu item deleted.", { id: toastId });
      refreshMenus();
    }

    setIsDeleting(false);
    setDeleteTarget(null);
  }

  function handleLogout() {
    startLogout(async () => {
      await logoutAction();
    });
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-cream"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* ── Toast Container ── */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "var(--font-inter), sans-serif",
            fontSize:   "13px",
            borderRadius: "12px",
            color:      "#1B3022",
          },
          success: { iconTheme: { primary: "#1B3022", secondary: "#F5F5DC" } },
          error:   { iconTheme: { primary: "#8B0000", secondary: "#F5F5DC" } },
        }}
      />

      {/* ── Header ── */}
      <header className="bg-forest-green sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-deep-red flex items-center justify-center">
              <Coffee size={16} className="text-white" />
            </div>
            <div>
              <span
                className="text-cream font-black text-lg leading-none"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Triple A
              </span>
              <span className="text-cream/50 text-[10px] font-semibold tracking-widest uppercase block leading-none mt-0.5">
                Admin Dashboard
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-deep-red text-white text-[13px] font-bold hover:bg-deep-red/90 transition active:scale-[0.98] cursor-pointer"
            >
              <Plus size={15} />
              <span className="hidden sm:inline">Add Menu</span>
            </button>
            <button
              onClick={handleLogout}
              disabled={isLogoutPending}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-cream/70 hover:text-cream hover:bg-white/10 text-[13px] font-medium transition disabled:opacity-50 cursor-pointer"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">

        {/* Page Title Row */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h2
              className="text-3xl font-black text-forest-green"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Menu Items
            </h2>
            <p className="text-forest-green/50 text-sm mt-1">
              {menus.length} {menus.length === 1 ? "item" : "items"} in your menu
            </p>
          </div>

          {/* Refresh indicator */}
          {isPending && (
            <div className="flex items-center gap-2 text-forest-green/50 text-sm">
              <Loader2 size={14} className="animate-spin" />
              Refreshing…
            </div>
          )}
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">

          {menus.length === 0 ? (
            // ── Empty State ──
            <div className="flex flex-col items-center justify-center py-24 text-center px-6">
              <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mb-5">
                <UtensilsCrossed size={28} className="text-forest-green/30" />
              </div>
              <h3
                className="text-xl font-black text-forest-green mb-2"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                No menu items yet
              </h3>
              <p className="text-forest-green/50 text-sm max-w-xs mb-6">
                Start building your menu by adding your first signature item.
              </p>
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-red text-white text-sm font-bold hover:bg-deep-red/90 transition cursor-pointer"
              >
                <Plus size={15} />
                Add First Item
              </button>
            </div>
          ) : (
            // ── Data Table ──
            <div className="overflow-x-auto">
              <table className="w-full min-w-160">
                <thead>
                  <tr className="border-b border-forest-green/8">
                    <th className={thCx + " w-16 text-center"} />
                    <th className={thCx}>Name</th>
                    <th className={thCx}>Price</th>
                    <th className={thCx + " text-center"}>Signature</th>
                    <th className={thCx + " text-right"}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menus.map((item, i) => (
                    <tr
                      key={item.id}
                      className={`border-b border-forest-green/6 transition-colors hover:bg-cream/40 ${
                        i % 2 === 0 ? "bg-white" : "bg-cream/20"
                      }`}
                    >
                      {/* Thumbnail */}
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-cream flex items-center justify-center shrink-0">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <ImageOff size={18} className="text-forest-green/25" />
                          )}
                        </div>
                      </td>

                      {/* Name + Description */}
                      <td className="px-4 py-3">
                        <p className="text-sm font-bold text-forest-green leading-snug">
                          {item.name}
                        </p>
                        {item.description && (
                          <p className="text-xs text-forest-green/45 mt-0.5 line-clamp-1 max-w-xs">
                            {item.description}
                          </p>
                        )}
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3">
                        <span className="text-sm font-black text-deep-red whitespace-nowrap">
                          Rp {Number(item.price).toLocaleString("id-ID")}
                        </span>
                      </td>

                      {/* Signature badge */}
                      <td className="px-4 py-3 text-center">
                        {item.is_signature ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-deep-red/10 text-deep-red text-[10px] font-bold tracking-wider uppercase">
                            <Star size={9} fill="currentColor" />
                            Yes
                          </span>
                        ) : (
                          <span className="text-forest-green/30 text-xs">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 rounded-xl text-forest-green/50 hover:text-forest-green hover:bg-forest-green/8 transition cursor-pointer"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="p-2 rounded-xl text-forest-green/50 hover:text-deep-red hover:bg-deep-red/8 transition cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Table footer info */}
        {menus.length > 0 && (
          <p className="text-center text-forest-green/35 text-[11px] mt-4 tracking-wide">
            Showing all {menus.length} menu items · sorted by newest first
          </p>
        )}
      </main>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <MenuFormModal
          mode={modalMode}
          initial={editTarget}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {/* ── Delete Confirm Overlay ── */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-deep-red/10 flex items-center justify-center mx-auto mb-5">
              <Trash2 size={24} className="text-deep-red" />
            </div>
            <h3
              className="text-xl font-black text-forest-green mb-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Delete Menu Item?
            </h3>
            <p className="text-forest-green/60 text-sm mb-6">
              <strong className="text-forest-green">&ldquo;{deleteTarget.name}&rdquo;</strong> will be
              permanently removed from the database. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-xl border border-forest-green/20 text-forest-green text-sm font-semibold hover:bg-forest-green/5 transition disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-xl bg-deep-red text-white text-sm font-bold hover:bg-deep-red/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isDeleting && <Loader2 size={14} className="animate-spin" />}
                {isDeleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const thCx =
  "px-4 py-3.5 text-left text-[10px] font-bold text-forest-green/40 tracking-widest uppercase bg-cream/60";
