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
  const generateRandomData = (numDays: number) => {
    return Array.from({ length: numDays }, () =>
      Math.floor(Math.random() * 100),
    );
  };

  const getDaysInMonth = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, month + 1, 0).getDate();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "nilaiBD" | "sumNilaiBD",
    index: number,
  ) => {
    const value = parseFloat(e.target.value) || 0;

    if (type === "nilaiBD") {
      const updatedNilaiBD = [...nilaiBD];
      updatedNilaiBD[index] = value;
      setNilaiBD(updatedNilaiBD);
    } else if (type === "sumNilaiBD") {
      const updatedSumNilaiBD = [...sumNilaiBD];
      updatedSumNilaiBD[index] = value;
      setSumNilaiBD(updatedSumNilaiBD);
    }
  };

  useEffect(() => {
    const numDays = getDaysInMonth(selectedDate);
    setCategories(
      Array.from({ length: numDays }, (_, i) => (i + 1).toString()),
    );
    setNilaiBD(Array(numDays).fill(0)); // Initialize with zeros
    setTotal(generateRandomData(numDays)); // Assuming this stays random
    setSumNilaiBD(Array(numDays).fill(0)); // Initialize with zeros
  }, [selectedDate]);

  const calculateMovingAverage = (data: number[], windowSize: number) => {
    let movingAverage = Array(data.length).fill(null); // Initialize with null values
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - windowSize + 1); // Start index for the moving window
      const window = data.slice(start, i + 1); // Slice from start to current index
      const average = window.reduce((acc, val) => acc + val, 0) / window.length;
      movingAverage[i] = average; // Place the average at the current index
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
      dashArray: [5, 5, 5],
    },
    markers: {
      size: 5,
    },
    xaxis: {
      categories: categories,
      min: 0,
      max: categories.length, // Ensure the axis shows the full range of categories
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
      points: movingAverageSumNilaiBD
        .map((value, index) => {
          if (value !== null) {
            // Check if value is not null
            return {
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
            };
          }
          return null; // Return null if the value is null
        })
        .filter((point) => point !== null), // Filter out null values from annotations
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

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Input Data</label>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((_, index) => (
            <div key={index}>
              <input
                type="number"
                placeholder={`Nilai BD (${index + 1})`}
                className="mb-2 w-full rounded border p-2"
                onChange={(e) => handleInputChange(e, "nilaiBD", index)}
              />
              <input
                type="number"
                placeholder={`Nilai NR (${index + 1})`}
                className="w-full rounded border p-2"
                onChange={(e) => handleInputChange(e, "sumNilaiBD", index)}
              />
            </div>
          ))}
        </div>
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
