"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FilterCardProps {
  onFilterChange: (
    filterType: string,
    selectedDate: Date | [Date, Date],
  ) => void;
}

const FilterCard: React.FC<FilterCardProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState("daily");
  const [date, setDate] = useState<Date | [Date, Date]>(new Date());

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    if (newFilter === "weekly") {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Set to Monday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Sunday
      setDate([startOfWeek, endOfWeek]);
    } else {
      setDate(new Date());
    }
    onFilterChange(newFilter, date);
  };

  const handleDateChange = (date: Date | [Date, Date]) => {
    setDate(date);
    onFilterChange(filter, date);
  };

  const renderDatePicker = () => {
    switch (filter) {
      case "daily":
        return (
          <DatePicker
            selected={date as Date}
            onChange={(date: Date) => handleDateChange(date)}
            dateFormat="yyyy-MM-dd"
            todayButton="Today"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        );
      case "weekly":
        return (
          <DatePicker
            selected={(date as [Date, Date])[0]}
            onChange={(dates: [Date, Date]) => handleDateChange(dates)}
            startDate={(date as [Date, Date])[0]}
            endDate={(date as [Date, Date])[1]}
            selectsRange
            dateFormat="yyyy-MM-dd"
            className="w-full rounded-md border border-gray-300 p-2"
            showWeekNumbers
          />
        );
      case "monthly":
        return (
          <DatePicker
            selected={date as Date}
            onChange={(date: Date) => handleDateChange(date)}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        );
      case "annually":
        return (
          <DatePicker
            selected={date as Date}
            onChange={(date: Date) => handleDateChange(date)}
            dateFormat="yyyy"
            showYearPicker
            showYearDropdown
            dropdownMode="select"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4 rounded-md bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-medium">Filter Traffic</h3>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Filter Type</label>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Select Date</label>
        {renderDatePicker()}
      </div>
    </div>
  );
};

export default FilterCard;
