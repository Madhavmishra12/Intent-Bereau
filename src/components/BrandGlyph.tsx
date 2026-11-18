interface BrandGlyphProps {
  variant?: 'brand' | 'button';
}

export function BrandGlyph({ variant = 'brand' }: BrandGlyphProps) {
  return (
    <span className={variant === 'button' ? 'button-brand-glyph' : 'brand-logo-crop'} aria-hidden="true">
      <img src="/assets/logo/ib-monogram-avatar.png" alt="" />
    </span>
  );
}
