"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/ui/footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on dashboard and settings pages
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/settings")) {
    return null;
  }
  
  return <Footer />;
} 