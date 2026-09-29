import Image from "next/image";
import type { VisitorAvatarId } from "@/lib/visitor-avatars";
import { VISITOR_AVATARS } from "@/lib/visitor-avatars";

type VisitorAvatarProps = {
  id?: VisitorAvatarId;
  src?: string;
  className?: string;
  size?: number;
};

/** Circular visitor SVG avatar for landing product UIs. */
export function VisitorAvatar({
  id,
  src,
  className = "",
  size = 64,
}: VisitorAvatarProps) {
  const resolved = src ?? (id ? VISITOR_AVATARS[id] : VISITOR_AVATARS.coral);

  return (
    <Image
      src={resolved}
      alt=""
      width={size}
      height={size}
      className={["visitor-avatar-img", className].filter(Boolean).join(" ")}
      draggable={false}
    />
  );
}
