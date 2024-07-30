import React, { useEffect, useRef, useState } from "react";
import SideBar from "../components/sideBar/SideBar";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, DatePicker } from "antd";
import { segmentOption } from "../utils/helper";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";
const today = new Date().toISOString().slice(0, 10);
const { RangePicker } = DatePicker;

const Layout = () => {
  const tableResetBtnRef = useRef(null);
  const [pageTitle, setPageTitle] = useState("Home");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [transactionType, setTransactionType] = useState("Sale");
  const [filteredSegment, setFilteredSegment] = useState(" ");
  const [filteredCity, setFilteredCity] = useState(" ");
  const [filteredCategory, setFilteredCategory] = useState(" ");
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [disabledCat, setDisabledCat] = useState(true);
  const [disabledCity, setDisabledCity] = useState(true);
  const [disabledSegment, setDisabledSegment] = useState(true);
  const [disabledCalender, setDisabledCalender] = useState(true);
  const [disabledTransaction, setDisabledTransaction] = useState(true);

  const [customerSearchField, setCustomerSearchField] = useState("");
  const [productSearchField, setProductSearchField] = useState("");
  const [wareHouseSearchField, setwareHouseSearchField] = useState("");
  const [invoiceIdSearchField, setInvoiceIdSearchField] = useState("");
  const [invoiceCodeSearchField, setInvoiceCodeSearchField] = useState("");

  const [height, setHeight] = useState(window?.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[]);

  useEffect(() => {
    if(startDate === "" || startDate === null) {
      setStartDate(endDate)
    }
  },[endDate])

  useEffect(() => {
    if(endDate === "" || endDate === null) {
      setEndDate(startDate)
    }
  },[startDate])
  const handleDate = (date, dateString) => {
    const startDateObj = new Date(dateString[0]);
    const endDateObj = new Date(dateString[1]);

    if (startDateObj > endDateObj) {
      setStartDate(dateString[1]);
      setEndDate(dateString[0]);
    } else {
      setStartDate(dateString[0]);
      setEndDate(dateString[1]);
    }
  };
  const handleReset = () => {
    if (tableResetBtnRef.current !== null) {
      tableResetBtnRef.current.click();
    }
    setFilteredCity(" ");
    setFilteredCategory(" ");
    setFilteredSegment(" ");
    setStartDate("");
    setEndDate("");
    setCustomerSearchField("")
    setwareHouseSearchField("")
    setProductSearchField("")
    setInvoiceCodeSearchField("")
    setInvoiceIdSearchField("")
    // setTransactionType("Sale");
  };

 

  return (
    <div className="g-sidenav-show dashboard-main-container">
      <SideBar setPageTitle={setPageTitle} />
      <main className="main-content position-relative border-radius-lg app-main-container">
        {/* <!-- Navbar --> */}
        <Navbar pageTitle={pageTitle} />
        {/* <!-- End Navbar --> */}
        {/* Children Components */}
        <div className="statistics-filter-container mb-4 ">
          <div
            className="date-picker-container"
            style={{ display: showDatePicker ? "" : "none" }}
          >
            <RangePicker
              allowEmpty={[true, true]}
              onChange={handleDate}
              value={[
                startDate !== "" ? dayjs(startDate, dateFormat) : null,
                endDate !== "" ? dayjs(endDate, dateFormat) : null,
              ]}
              format={dateFormat}
              maxDate={dayjs(today, dateFormat)}
              disabled={disabledCalender}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <span>Segment:</span>
              <select
                disabled={disabledSegment}
                className="filtered-option-selector"
                onChange={(e) => {
                  setFilteredSegment(e.target.value);
                  setFilteredCategory(" ");
                  setFilteredCity(" ");
                }}
                value={filteredSegment}
              >
                <option value=" ">All</option>
                {segmentOption.map((segment) => {
                  return (
                    <option value={segment.value} key={segment.key}>
                      {segment.key}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span>Category:</span>
              <select
                disabled={disabledCat}
                className="filtered-option-selector"
                onChange={(e) => {
                  setFilteredCategory(e.target.value);
                  setFilteredSegment(" ");
                }}
                value={filteredCategory}
              >
                <option value="" disabled>
                  ---Select Category---
                </option>
                <option value=" ">All</option>
                <option value="Compressor">Compressor</option>
                <option value="Electrical">Electrical</option>
                <option value="Rice">Rice</option>
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span>City:</span>
              <select
                disabled={disabledCity}
                className="filtered-option-selector"
                onChange={(e) => {
                  setFilteredCity(e.target.value);
                  setFilteredSegment(" ");
                }}
                value={filteredCity}
              >
                <option value="" disabled>
                  ---Select City---
                </option>
                <option value=" ">All</option>
                <option value="KHI">Karachi</option>
                <option value="LHR">Lahore</option>
                <option value="ISL">Islamabad</option>
              </select>
            </div>
            <div className="table-wrapper-global-reset-btn-container mb-0 me-2">
              <Button
                onClick={() => handleReset()}
                className="ant-btn-primary mb-1"
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>

        <Outlet
          context={[
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
            setFilteredCity,
            setFilteredCategory,
            setFilteredSegment,
            customerSearchField,
            setCustomerSearchField,
            wareHouseSearchField,
            setwareHouseSearchField,
            productSearchField,
            setProductSearchField,
            invoiceCodeSearchField,
            setInvoiceCodeSearchField,
            invoiceIdSearchField,
            setInvoiceIdSearchField
          ]}
        />
      </main>
    </div>
  );
};

export default Layout;
