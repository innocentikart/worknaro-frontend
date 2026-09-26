/** Curved accent underline matching the FAQ “answered” treatment. */
export function AccentUnderline({
  className = "accent-underline",
  wide = false,
}: {
  className?: string;
  /** Slightly longer path for multi-word accents */
  wide?: boolean;
}) {
  if (wide) {
    return (
      <svg
        className={className}
        viewBox="0 0 220 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 8.5C38 3.5 78 2 118 3.8C158 5.5 192 8.2 218 4.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 180 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8.5C28 3.5 58 2 90 3.5C122 5 152 8 178 4.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
