import { Metadata } from "next";
import React from "react";
import RedirectToOverview from "./router/overview"; // Import komponen redirect

export const metadata: Metadata = {
  title: "Moemtaz",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
  return (
    <RedirectToOverview /> // Gunakan komponen redirect
  );
}
