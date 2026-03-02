"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Upload, Loader2 } from "lucide-react";
import type { MenuRow } from "@/lib/database.types";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ModalMode = "add" | "edit";

interface MenuFormModalProps {
  mode:        ModalMode;
  initial?:    MenuRow | null;
  onClose:     () => void;
  onSubmit:    (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MenuFormModal({
  mode,
  initial,
  onClose,
  onSubmit,
  isSubmitting,
}: MenuFormModalProps) {
  const formRef = useRef<HTMLFormElement>(null);

  // Image preview
  const [preview, setPreview]       = useState<string | null>(initial?.image_url ?? null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef                 = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
    if (file.size > MAX_SIZE) {
      setImageError("Ukuran gambar melebihi batas 2 MB. Pilih gambar yang lebih kecil.");
      e.target.value = ""; // reset input
      setPreview(initial?.image_url ?? null);
      return;
    }

    setImageError(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    await onSubmit(formData);
  }

  const isEdit = mode === "edit";

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-forest-green/10 bg-forest-green">
          <h2
            className="text-xl font-black text-cream"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {isEdit ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-cream/60 hover:text-cream transition p-1 rounded-lg hover:bg-white/10 disabled:opacity-40 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto flex-1">
          <form
            ref={formRef}
            id="menu-form"
            onSubmit={handleSubmit}
            className="px-7 py-6 space-y-5"
          >
            {/* Hidden fields for edit mode */}
            {isEdit && initial && (
              <>
                <input type="hidden" name="id"                 value={initial.id} />
                <input type="hidden" name="existing_image_url" value={initial.image_url ?? ""} />
              </>
            )}

            {/* ── Name ── */}
            <div>
              <label className={labelCx}>Menu Name <span className="text-deep-red">*</span></label>
              <input
                name="name"
                type="text"
                required
                defaultValue={initial?.name ?? ""}
                placeholder="e.g. Signature Espresso"
                className={inputCx}
              />
            </div>

            {/* ── Price ── */}
            <div>
              <label className={labelCx}>Price (IDR) <span className="text-deep-red">*</span></label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-green/50 text-sm font-semibold">
                  Rp
                </span>
                <input
                  name="price"
                  type="number"
                  required
                  min={0}
                  step={500}
                  defaultValue={initial?.price ?? ""}
                  placeholder="35000"
                  className={`${inputCx} pl-10`}
                />
              </div>
            </div>

            {/* ── Description ── */}
            <div>
              <label className={labelCx}>Description</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={initial?.description ?? ""}
                placeholder="Short, evocative description of this item…"
                className={`${inputCx} resize-none`}
              />
            </div>

            {/* ── Image Upload ── */}
            <div>
              <label className={labelCx}>Menu Image</label>

              {/* Preview box / upload trigger */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-44 rounded-2xl border-2 border-dashed border-forest-green/20 bg-cream/40 flex items-center justify-center overflow-hidden cursor-pointer group hover:border-deep-red/40 transition"
              >
                {preview ? (
                  <>
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover rounded-2xl"
                      unoptimized={preview.startsWith("blob:")}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-2xl">
                      <span className="text-white text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                        <Upload size={14} /> Change Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-forest-green/40 group-hover:text-deep-red/60 transition">
                    <Upload size={24} strokeWidth={1.5} />
                    <span className="text-xs font-semibold tracking-wider uppercase">
                      Click to upload image
                    </span>
                    <span className="text-[10px]">PNG, JPG, WEBP · Max 2 MB</span>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                name="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {imageError && (
              <p className="text-red-500 text-xs mt-1">{imageError}</p>
            )}

            {/* ── Is Signature ── */}
            <label className="flex items-center gap-3 cursor-pointer select-none group">
              <input
                name="is_signature"
                type="checkbox"
                value="true"
                defaultChecked={initial?.is_signature ?? false}
                className="peer sr-only"
              />
              {/* Custom toggle */}
              <div className="w-11 h-6 rounded-full border-2 border-forest-green/20 bg-cream peer-checked:bg-deep-red peer-checked:border-deep-red transition-colors relative">
                <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5 group-has-[input:checked]:translate-x-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-forest-green">
                  Mark as Signature
                </p>
                <p className="text-[11px] text-forest-green/50">
                  Appears on the landing page menu section
                </p>
              </div>
            </label>
          </form>
        </div>

        {/* ── Footer Actions ── */}
        <div className="px-7 py-5 border-t border-forest-green/10 flex items-center justify-end gap-3 bg-cream/40">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-forest-green border border-forest-green/20 hover:bg-forest-green/8 transition disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="menu-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-deep-red hover:bg-deep-red/90 transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting && <Loader2 size={14} className="animate-spin" />}
            {isSubmitting
              ? (isEdit ? "Saving…" : "Adding…")
              : (isEdit ? "Save Changes" : "Add to Menu")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shared class strings ─────────────────────────────────────────────────────

const labelCx =
  "block text-[11px] font-bold text-forest-green tracking-widest uppercase mb-1.5";

const inputCx =
  "w-full px-4 py-3 rounded-xl border border-forest-green/20 bg-cream/40 text-forest-green text-sm placeholder:text-forest-green/30 focus:outline-none focus:ring-2 focus:ring-deep-red/30 focus:border-deep-red transition";
