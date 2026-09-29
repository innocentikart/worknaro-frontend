/** Visitor SVG avatars shared across landing product previews. */
export const VISITOR_AVATARS = {
  coral: "/avatars/visitor-coral.svg",
  purple: "/avatars/visitor-purple.svg",
  green: "/avatars/visitor-green.svg",
} as const;

export type VisitorAvatarId = keyof typeof VISITOR_AVATARS;

export const VISITOR_AVATAR_LIST = [
  { id: "coral" as const, src: VISITOR_AVATARS.coral },
  { id: "purple" as const, src: VISITOR_AVATARS.purple },
  { id: "green" as const, src: VISITOR_AVATARS.green },
] as const;

/** Cycle visitor avatars by index (wraps at list length). */
export function visitorAvatarAt(index: number): string {
  const list = VISITOR_AVATAR_LIST;
  return list[((index % list.length) + list.length) % list.length].src;
}

/** Stable avatar pick from a name/initials key. */
export function visitorAvatarForKey(key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash + key.charCodeAt(i) * (i + 1)) % 997;
  }
  return visitorAvatarAt(hash);
}
