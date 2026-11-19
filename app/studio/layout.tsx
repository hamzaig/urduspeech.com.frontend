import { Shell } from "@/components/shell";
import "./studio.css";
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
