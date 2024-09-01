"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToOverview() {
  const router = useRouter();

  useEffect(() => {
    router.push("/overview"); // Redirect ke /overview saat halaman diakses
  }, [router]);

  return null; // Tidak menampilkan konten apapun
}
