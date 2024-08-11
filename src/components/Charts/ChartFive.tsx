import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartFiveProps {
  data: number[];
  categories: string[];
  totalItems: number;
}

const ChartFive: React.FC<ChartFiveProps> = ({
  data,
  categories,
  totalItems,
}) => {
  const options: ApexOptions = {
    colors: ["#8099EC"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 500,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 3,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toString();
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      title: {
        text: "TIME",
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "TOTAL ITEM",
      },
      min: 0,
      labels: {
        formatter: function (val) {
          return val.toString();
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 7,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: true,
      },
    },
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex justify-between border-b border-stroke px-6 pb-4.5 pt-5.5 dark:border-dark-3">
        <div>
          <h2 className="mb-1.5 text-body-2xlg font-bold text-dark dark:text-white">
            Traffic Chat
          </h2>
          <span className="text-sm font-light">Total Items: {totalItems}</span>
        </div>
      </div>
      <div className="px-6 pb-1 pt-7.5">
        <div id="chartFive" className="-ml-3.5">
          <ReactApexChart
            options={options}
            series={[{ name: "Total Item", data }]}
            type="bar"
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartFive;
