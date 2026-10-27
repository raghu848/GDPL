/**
 * Soft floating-gradient orbs for a section background (pure CSS motion, see
 * `.about-float` in globals.css). Put it as the first child of a section that
 * has the `sec-flow` class; it sits behind the section's content.
 * `strength` scales the orbs so pale sections stay pale.
 */
export default function FloatingBackdrop({ strength = 0.7 }: { strength?: number }) {
  return (
    <div aria-hidden className="about-float" style={{ "--k": strength } as React.CSSProperties}>
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
