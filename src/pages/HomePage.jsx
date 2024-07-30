import React, { useEffect, useState } from "react";
import StatisticsCard from "../components/card/StatisticsCard";
import { DatePicker } from "antd";
import LineChart from "../components/Chart/LineChart";
import BarChart from "../components/Chart/BarChart";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useOutletContext } from "react-router-dom";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";
const today = new Date().toISOString().slice(0, 10);

const HomePage = () => {
  const [
    filteredCategory,
    filteredCity,
    startDate,
    endDate,
    filteredSegment,
    tableResetBtnRef,
    setDisabledCalender,
    setDisabledSegment,
    setDisabledCat,
    setDisabledCity,
    setDisabledTransaction,
  ] = useOutletContext();
  const [filteredYear, setFilteredYear] = useState("2023");

  useEffect(() => {
    setDisabledCalender(false);
    setDisabledCat(false);
    setDisabledCity(false);
    setDisabledSegment(true);
    setDisabledTransaction(true);
  }, [startDate]);

  return (
    <div>
      {/* Statistics Card */}
      <StatisticsCard
        filter={[filteredCategory, filteredCity, startDate, endDate]}
      />
      <div className="row mt-4">
        <div className="col-lg-6 col-md-6 mt-4 mb-4">
          <div className="card z-index-2 invoice-card-container">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="card-gradient-background invoice-card-graph shadow-primary border-radius-lg py-3 pe-1">
                <div className="chart">
                  {/* <div className="mb-4"></div> */}
                  <BarChart
                    year={filteredYear}
                    category={filteredCategory}
                    city={filteredCity}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 ">Sales Amount</h6>
              <p className="text-sm ">By Month</p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 mt-4 mb-4">
          <div className="card z-index-2  invoice-card-container">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="bg-gradient-success invoice-card-graph shadow-success border-radius-lg py-0 pe-1">
                <div className="chart">
                  <div className="statistics-filter-container mb-4">
                    <div className=""></div>
                    <DatePicker
                      defaultValue={dayjs("2023", "YYYY")}
                      maxDate={dayjs(today, dateFormat)}
                      onChange={(date, dateString) => {
                        setFilteredYear(dateString);
                      }}
                      picker="year"
                    />
                  </div>
                  <LineChart
                    year={filteredYear}
                    category={filteredCategory}
                    city={filteredCity}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 "> Invoice Statistics </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
