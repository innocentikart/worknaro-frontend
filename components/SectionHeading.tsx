export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <p className="text-[13px] font-semibold text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-[1.85rem] font-bold tracking-tight sm:text-4xl ${
          inverted ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`text-base leading-relaxed sm:text-[1.05rem] ${
            inverted ? "text-white/70" : "text-slate"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
