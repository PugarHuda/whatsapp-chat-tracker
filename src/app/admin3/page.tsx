import BasicChart from "@/components/Charts/BasicChart";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";

export const metadata: Metadata = {
  title: "Moemtaz",
  description: "This is Next.js Basic Chart page for NextAdmin Dashboard Kit",
  // other metadata
};

const Admin3: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Analisa Whatsapp" />

      <BasicChart />
      <br />
      <TableTwo />
    </DefaultLayout>
  );
};

export default Admin3;
