export type NavCurrent = "page" | "location" | undefined;

export function getNavCurrent(
  pathname: string | null,
  href: string,
): NavCurrent {
  if (!pathname) return undefined;
  if (pathname === href) return "page";
  if (pathname.startsWith(href + "/")) return "location";
  return undefined;
}

export function nextRadioIndex(
  key: string,
  currentIndex: number,
  count: number,
): number | null {
  if (count <= 0) return null;
  switch (key) {
    case "ArrowDown":
    case "ArrowRight":
      return (currentIndex + 1) % count;
    case "ArrowUp":
    case "ArrowLeft":
      return (currentIndex - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
