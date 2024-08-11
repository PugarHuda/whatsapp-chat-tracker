"use client";
import React, { useState, useEffect } from "react";
import ChartFive from "@/components/Charts/ChartFive";
import FilterCard from "@/components/Charts/FilterCard";
import CustomChart from "./CustomChart";
import MovingAverageChart from "./MovingAverageChart";

const BasicChart: React.FC = () => {
  const [filter, setFilter] = useState("daily");
  const [date, setDate] = useState<Date | [Date, Date]>(new Date());
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let data, categories;
    switch (filter) {
      case "daily":
        data = [
          0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 1, 1, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0,
          0,
        ];
        categories = Array.from(
          { length: 24 },
          (_, i) => `${i.toString().padStart(2, "0")}:00`,
        );
        break;
      case "weekly":
        data = [10, 20, 30, 40, 50, 60, 70];
        categories = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        break;
      case "monthly":
        data = [30, 40, 50, 60];
        categories = ["Week 1", "Week 2", "Week 3", "Week 4"];
        break;
      case "annually":
        data = [100, 200, 150, 300, 250, 400, 350, 450, 500, 550, 600, 650];
        categories = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        break;
      default:
        data = [];
        categories = [];
    }

    setChartData(data);
    setCategories(categories);
    setTotalItems(data.reduce((acc, curr) => acc + curr, 0));
  }, [filter, date]);

  const handleFilterChange = (
    filterType: string,
    selectedDate: Date | [Date, Date],
  ) => {
    setFilter(filterType);
    setDate(selectedDate);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <FilterCard onFilterChange={handleFilterChange} />
        </div>
        <div className="col-span-12">
          <ChartFive
            data={chartData}
            categories={categories}
            totalItems={totalItems}
          />
        </div>
        <div className="col-span-12">
          <CustomChart />
        </div>
        <div className="col-span-12">
          <MovingAverageChart/>
        </div>
      </div>
    </>
  );
};

export default BasicChart;
