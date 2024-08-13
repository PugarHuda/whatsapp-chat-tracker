import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MovingAverageChart: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [categories, setCategories] = useState<string[]>([]);
  const [nilaiBD, setNilaiBD] = useState<number[]>([]);
  const [total, setTotal] = useState<number[]>([]);
  const [sumNilaiBD, setSumNilaiBD] = useState<number[]>([]);

  const getDaysInMonth = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, month + 1, 0).getDate();
  };

  const generateRandomData = (numDays: number) => {
    return Array.from({ length: numDays }, () =>
      Math.floor(Math.random() * 100),
    );
  };

  useEffect(() => {
    const numDays = getDaysInMonth(selectedDate);
    setCategories(
      Array.from({ length: numDays }, (_, i) => (i + 1).toString()),
    );
    setNilaiBD(generateRandomData(numDays));
    setTotal(generateRandomData(numDays));
    setSumNilaiBD(generateRandomData(numDays));
  }, [selectedDate]);

  const calculateMovingAverage = (data: number[], windowSize: number) => {
    let movingAverage = [];
    for (let i = 0; i < data.length - windowSize + 1; i++) {
      const window = data.slice(i, i + windowSize);
      const average = window.reduce((acc, val) => acc + val, 0) / windowSize;
      movingAverage.push(average);
    }
    return movingAverage;
  };

  const movingAverageBD = calculateMovingAverage(nilaiBD, 5);
  const movingAverageTotal = calculateMovingAverage(total, 5);
  const movingAverageSumNilaiBD = calculateMovingAverage(sumNilaiBD, 5);

  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      width: [2, 2, 2],
      curve: "smooth",
      dashArray: [5, 5, 5], // This makes all the lines dashed
    },
    markers: {
      size: 5,
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: function (value: number) {
          return `${value}%`;
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (value: number) {
          return `${value}%`;
        },
      },
    },
    annotations: {
      points: movingAverageSumNilaiBD.map((value, index) => ({
        x: categories[index],
        y: value,
        marker: {
          size: 5,
          fillColor: "#fff",
          strokeColor: "#00E396",
          radius: 2,
        },
        label: {
          borderColor: "#00E396",
          offsetY: -15,
          style: {
            color: "#00E396",
            background: "#fff",
          },
          text: `${value.toFixed(1)}%`,
        },
      })),
    },
  };

  const series = [
    {
      name: "Nilai BD",
      data: movingAverageBD,
      color: "#006400", // Dark green color for Nilai BD
    },
    {
      name: "Total",
      data: movingAverageTotal,
      color: "#808080", // Grey color for Total
    },
    {
      name: "Sum Nilai BD",
      data: movingAverageSumNilaiBD,
      color: "#00E396", // Light green color for Sum Nilai BD
    },
  ];

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1">
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Select Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="rounded border p-2"
        />
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default MovingAverageChart;
