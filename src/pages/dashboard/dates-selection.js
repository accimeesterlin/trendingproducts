import React, { useState, useCallback } from "react";
// import { useToasts } from "react-toast-notifications";
import moment from "moment";
import {
  // Page,
  Layout,
  // Button,
  // Modal,
  DatePicker,
  Select,
  TextField,
} from "@shopify/polaris";

const DatesSelection = () => {
  const cMonth = moment().month();
  const cYear = moment().year();

  const [{ month, year }, setDate] = useState({ month: cMonth, year: cYear });

  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });

  const handleMonthChange = useCallback(
    (currentMonth, currentYear) =>
      setDate({ month: currentMonth, year: currentYear }),
    []
  );

  const addTime = (dayAmount) => {
    const cStartDay = moment(selectedDates.start).day();
    const cEndDay = moment(selectedDates.end);

    setSelectedDates({
      start: new Date(moment(selectedDates.start).day(cStartDay - dayAmount)),
      end: new Date(cEndDay),
    });
  };

  const [selected, setSelected] = useState("today");

  const handleSelectChange = (value) => {
    const num = Number(value);
    addTime(num);

    setSelected(value);
  };

  const options = [
    { label: "Today", value: "0" },
    { label: "Yesterday", value: "1" },
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 90 days", value: "90" },
    { label: "Last month", value: "30" },
    { label: "Last year", value: "365" },
    { label: "Week to date", value: "7" },
    { label: "Month to date", value: "30" },
    { label: "Quarter to date", value: "90" },
    { label: "Year to date", value: "365" },
    { label: "2nd Quarter to date", value: "90" },
    { label: "1st Quarter to date", value: "180" },
    { label: "4th Quarter to date", value: "60" },
    { label: "3rd Quarter to date", value: "200" },
  ];

  return (
    <Layout>
      <Layout.Section>
        <Select
          label="Date range"
          options={options}
          onChange={handleSelectChange}
          value={selected}
        />
      </Layout.Section>

      <Layout.Section>
        <TextField
          value={selectedDates.start}
          onChange={(value) =>
            setSelectedDates({
              start: new Date(value),
              end: new Date(selectedDates.end),
            })
          }
          label="Starting"
          type="date"
        />
      </Layout.Section>
      <Layout.Section>
        <TextField
          value={selectedDates.end}
          onChange={(value) =>
            setSelectedDates({
              start: new Date(selectedDates.start),
              end: new Date(value),
            })
          }
          label="Ending"
          type="date"
        />
      </Layout.Section>
      <Layout.Section>
        <DatePicker
          month={month}
          year={year}
          onChange={setSelectedDates}
          onMonthChange={handleMonthChange}
          selected={selectedDates}
          multiMonth
          allowRange
        />
      </Layout.Section>
    </Layout>
  );
};

export default DatesSelection;
