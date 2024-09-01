// /pages/admin/index.js or wherever your Admin1 component is

import React from "react";
import QRTable from "@/app/admin1/QRTable";
import BasicChart from "@/components/Charts/BasicChart";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";

export const metadata = {
  title: "Moemtaz",
  description: "This is Next.js Basic Chart page for NextAdmin Dashboard Kit",
};

const Admin1 = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Analisa Whatsapp" />
      <QRTable />
      <BasicChart />
      <br />
      <TableTwo />
    </DefaultLayout>
  );
};

export default Admin1;
