"use client";

import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import FilterCard from "@/components/Charts/FilterCard";

const CustomChart: React.FC = () => {
  const [filter, setFilter] = useState("daily");
  const [date, setDate] = useState<Date | [Date, Date]>(new Date());
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    let data: { x: number; y: number }[], categories: string[];
    switch (filter) {
      case "daily":
        data = Array.from({ length: 24 }, (_, i) => ({
          x: i,
          y: Math.floor(Math.random() * 10),
        }));
        categories = Array.from(
          { length: 24 },
          (_, i) => `${i.toString().padStart(2, "0")}:00`,
        );
        break;
      case "weekly":
        data = Array.from({ length: 7 }, (_, i) => ({
          x: i,
          y: Math.floor(Math.random() * 10),
        }));
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
        data = Array.from({ length: 30 }, (_, i) => ({
          x: i + 1,
          y: Math.floor(Math.random() * 10),
        }));
        categories = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
        break;
      case "annually":
        data = Array.from({ length: 12 }, (_, i) => ({
          x: i,
          y: Math.floor(Math.random() * 10),
        }));
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
  }, [filter, date]);

  const handleFilterChange = (
    filterType: string,
    selectedDate: Date | [Date, Date],
  ) => {
    setFilter(filterType);
    setDate(selectedDate);
  };

  const options = {
    chart: {
      type: "line",
      height: 500,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      dashArray: 5, // This makes the line dashed
    },
    xaxis: {
      categories: categories,
      title: {
        text: "DATE",
      },
    },
    yaxis: {
      title: {
        text: "TOTAL",
      },
      min: 0,
      max: 12,
    },
    annotations: {
      yaxis: [
        {
          y: 6,
          borderColor: "#FF4560",
          label: {
            borderColor: "#FF4560",
            style: {
              color: "#fff",
              background: "#FF4560",
            },
            text: "Trend Line",
          },
        },
      ],
    },
  };

  const series = [
    {
      name: "Admin 1",
      data: chartData.map((d) => d.y),
    },
  ];

  return (
    <div className="rounded-md bg-white p-4 shadow-sm">
      <div className="mb-4">
        <FilterCard onFilterChange={handleFilterChange} />
      </div>
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={500}
        />
      </div>
    </div>
  );
};

export default CustomChart;
