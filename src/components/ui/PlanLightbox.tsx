"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Blueprint } from "@/lib/blueprintsData";

type Props = {
  items: Blueprint[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/** Full-screen viewer for a technical drawing, with keyboard + arrow navigation. */
export default function PlanLightbox({ items, index, onClose, onNavigate }: Props) {
  const open = index !== null;
  const active = open ? items[index] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onNavigate((index + dir + items.length) % items.length);
    },
    [index, items.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, go]);

  return (
    <AnimatePresence>
      {open && active && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-ink/90 backdrop-blur-sm" onClick={onClose} />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 md:top-8 md:right-8 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-bone/10 text-bone transition-colors hover:bg-bone/20"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <button
            onClick={() => go(-1)}
            aria-label="Previous plan"
            className="absolute left-3 md:left-8 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-bone/10 text-bone transition-colors hover:bg-bone/20"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next plan"
            className="absolute right-3 md:right-8 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-bone/10 text-bone transition-colors hover:bg-bone/20"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <motion.div
            key={active.src}
            className="relative z-[1] flex h-[86vh] w-full max-w-5xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full flex-1 min-h-0 overflow-hidden rounded-2xl bg-white">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain p-4 md:p-8"
                priority
              />
            </div>
            <div className="mt-5 flex items-center gap-4 eyebrow text-bone/80">
              <span>{active.label}</span>
              <span className="h-1 w-1 rounded-full bg-bone/40" />
              <span className="text-bone/50">{active.meta}</span>
              <span className="text-bone/40">
                {index! + 1} / {items.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
