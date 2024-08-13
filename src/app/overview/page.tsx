import BasicChart from "@/components/Charts/BasicChart";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Moemtaz",
  description: "This is Next.js Basic Chart page for NextAdmin Dashboard Kit",
  // other metadata
};

const OverviewPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Analisa Whatsapp" />

      <BasicChart />
    </DefaultLayout>
  );
};

export default OverviewPage;
