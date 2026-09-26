import Link from "next/link";

export function Logo({
  href = "/",
  inverted = false,
  onClick,
}: {
  href?: string;
  inverted?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 font-semibold tracking-tight ${
        inverted ? "text-white" : "text-ink"
      }`}
    >
      <span className="relative h-8 w-8 shrink-0" aria-hidden="true">
        <span className="absolute left-0 top-0 h-[22px] w-[22px] rounded-[7px] bg-[#4f6ef7]" />
        <span className="absolute bottom-0 right-0 h-[22px] w-[22px] rounded-[7px] bg-[#8b5cf6]/70" />
      </span>
      <span className="text-[17px]">Organitio</span>
    </Link>
  );
}
