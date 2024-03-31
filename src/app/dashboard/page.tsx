// pages/dashboard.tsx
import React from "react";
import AllBusinessCount from "@/components/cards/dashboard/allBusinessCount";
import AllCustomerCount from "@/components/cards/dashboard/allCustomerCount";
import IncomeTotal from "@/components/cards/dashboard/incomeTotal";
import { Card, Input } from "antd";

// all the contents are dummy for now, need to integrate API
const Dashboard: React.FC = () => {
  const dashboardContent = [
    { TotalBusiness: 21 },
    { TotalCustomer: 750 },
    { TotalIncome: "$15036" },
  ];

  return (
    <section className="flex flex-col p-10">
      {/* <>
      <h1 className="text-xl font-bold">Dashboard</h1>

        <h1 className="text-sm font-light mb-[3%]">
          See all your records here.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <AllBusinessCount />
          <AllCustomerCount />
          <IncomeTotal />
        </div>
      </> */}
      <div className="grid gap-5 grid-cols-12" style={{ margin: "10px 0" }}>
        <Card className="col-span-8" bordered>
          <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
            Awesome!
          </span>
          <br />
          <br />
          <span>
            You just made a good decision! start creating your buisness,
            customers, members.
          </span>
          <br />
          <br />
          <span
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Happy growday!
          </span>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
