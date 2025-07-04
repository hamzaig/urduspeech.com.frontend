"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on dashboard and settings pages
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/settings")) {
    return null;
  }
  
  return <Navbar />;
} 