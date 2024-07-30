import { useEffect, useState } from "react";
import ReceiableTableWrapper from "./ReceiableTableWrapper";
import RecievableCards from "./RecievableCards";
import { useOutletContext } from "react-router-dom";

const threeDaysAgo = new Date();
threeDaysAgo.setDate(threeDaysAgo.getDate() - 10);
const formattedTenDaysAgo = `${threeDaysAgo.getFullYear()}-${String(
  threeDaysAgo.getMonth() + 1
).padStart(2, "0")}-${String(threeDaysAgo.getDate()).padStart(2, "0")}`;
const today = new Date();
const formattedToday = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

const ReceivablePage = () => {
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
  ] = useOutletContext();
  const [filterStartDate, setFilterStartDate] = useState(startDate);
  const [filterEndDate, setFilterEndDate] = useState(endDate);
  // const [wareHouseSearchField, setwareHouseSearchField] = useState("");
  // const [invoiceIdSearchField, setInvoiceIdSearchField] = useState("");
  // const [invoiceCodeSearchField, setInvoiceCodeSearchField] = useState("");
  const [spinLoading, setSpinLoading] = useState(false);

  useEffect(() => {
    setDisabledCalender(false);
    setDisabledCat(false);
    setDisabledCity(false);
    setDisabledSegment(false);
    setDisabledTransaction(true);
    // if (startDate === "" || startDate === "") {
    //   setFilterStartDate(formattedTenDaysAgo);
    //   setFilterEndDate(formattedToday);
    // } else {
      setFilterStartDate(startDate);
      setFilterEndDate(endDate);
    // }
  }, [startDate, endDate]);

  useEffect(() => {
    if (filteredCategory !== " ") {
      // setFilteredCity(" ");
      setFilteredSegment(" ");
    }
  }, [filteredCategory]);
  useEffect(() => {
    if (filteredCity !== " ") {
      // setFilteredCategory(" ");
      setFilteredSegment(" ");
    }
  }, [filteredCity]);
  useEffect(() => {
    if (filteredSegment !== " ") {
      setFilteredCity(" ");
      setFilteredCategory(" ");
    }
  }, [filteredSegment]);

  const [showReceivableTable, setShowReceivableTable] =
    useState("receivables-today");
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (index, key) => {
    if (tableResetBtnRef.current !== null) {
      tableResetBtnRef.current.click();
    }
    setActiveTab(index);
    setShowReceivableTable(key);
    setTimeout(() => {
      window.scrollTo({
        top: 660,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div id="static-card-div">
      {/* Receivable Cards */}
      <RecievableCards
        startDate={startDate}
        endDate={endDate}
        filteredCity={filteredCity}
        filteredCategory={filteredCategory}
        filteredSegment={filteredSegment}
      />
      {/* Receiable Table */}
      <div className="container-fluid">
        <div className="row mt-1">
          {/* Table Wrappers */}
          <div className="col-lg-12 col-md-6  me-sm-0">
            <div className="nav-wrapper position-relative end-0">
              <ul className="nav nav-pills nav-fill p-1" role="tablist">
                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 1 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(1, "receivables-today");
                    setProductSearchField("");
                    setwareHouseSearchField("");
                    setCustomerSearchField("");
                    setInvoiceCodeSearchField("");
                    setInvoiceIdSearchField("");
                    setSpinLoading(false);
                  }}
                >
                  <span
                    className={`nav-link mb-0 px-0 py-1  ${
                      activeTab === 1 ? "table-wrapper-active-tab" : ""
                    }`}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-selected={activeTab === 1 ? "true" : "false"}
                  >
                    <i className="material-icons text-lg position-relative">
                      today
                    </i>
                    <span className="ms-1">Today Receivables</span>
                  </span>
                </li>
                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 2 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(2, "receivables-with-start-end-date");
                    setProductSearchField("");
                    setwareHouseSearchField("");
                    setCustomerSearchField("");
                    setInvoiceCodeSearchField("");
                    setInvoiceIdSearchField("");
                    setSpinLoading(false);
                  }}
                >
                  <span
                    className={`nav-link mb-0 px-0 py-1  ${
                      activeTab === 2 ? "table-wrapper-active-tab" : ""
                    }`}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-selected={activeTab === 2 ? "true" : "false"}
                  >
                    <i className="material-icons text-lg position-relative">
                      calendar_month
                    </i>
                    <span className="ms-1">Receivables With Date</span>
                  </span>
                </li>
                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 3 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(3, "receivables-with-filter");
                    setProductSearchField("");
                    setwareHouseSearchField("");
                    setCustomerSearchField("");
                    setInvoiceCodeSearchField("");
                    setInvoiceIdSearchField("");
                    setSpinLoading(false);
                  }}
                >
                  <span
                    className={`nav-link mb-0 px-0 py-1  ${
                      activeTab === 3 ? "table-wrapper-active-tab" : ""
                    }`}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-selected={activeTab === 3 ? "true" : "false"}
                  >
                    <i className="material-icons text-lg position-relative">
                      apartment
                    </i>
                    <span className="ms-1">Receivables</span>
                  </span>
                </li>

                {/* <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 3 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(3, "receivables-by-city");
                    setProductSearchField("");
                    setwareHouseSearchField("");
                    setCustomerSearchField("");
                    setInvoiceCodeSearchField("");
                    setInvoiceIdSearchField("");
                    setSpinLoading(false);
                  }}
                >
                  <span
                    className={`nav-link mb-0 px-0 py-1  ${
                      activeTab === 3 ? "table-wrapper-active-tab" : ""
                    }`}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-selected={activeTab === 3 ? "true" : "false"}
                  >
                    <i className="material-icons text-lg position-relative">
                      apartment
                    </i>
                    <span className="ms-1">Receivables By City</span>
                  </span>
                </li>
                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 4 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(4, "receivables-by-segment");
                    setProductSearchField("");
                    setwareHouseSearchField("");
                    setCustomerSearchField("");
                    setInvoiceCodeSearchField("");
                    setInvoiceIdSearchField("");
                    setSpinLoading(false);
                  }}
                >
                  <span
                    className={`nav-link mb-0 px-0 py-1  ${
                      activeTab === 4 ? "table-wrapper-active-tab" : ""
                    }`}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-selected={activeTab === 4 ? "true" : "false"}
                  >
                    <i className="material-icons text-lg position-relative">
                      segment
                    </i>
                    <span className="ms-1">Receivables By Segment</span>
                  </span>
                </li>
                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 5 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(5, "receivables-by-category");
                    setProductSearchField("");
                    setwareHouseSearchField("");
                    setCustomerSearchField("");
                    setInvoiceCodeSearchField("");
                    setInvoiceIdSearchField("");
                    setSpinLoading(false);
                  }}
                >
                  <span
                    className={`nav-link mb-0 px-0 py-1  ${
                      activeTab === 5 ? "table-wrapper-active-tab" : ""
                    }`}
                    data-bs-toggle="tab"
                    role="tab"
                    aria-selected={activeTab === 5 ? "true" : "false"}
                  >
                    <i className="material-icons text-lg position-relative">
                      category
                    </i>
                    <span className="ms-1">Receivables By Category</span>
                  </span>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Tables Wrapper */}
          <ReceiableTableWrapper
            showReceivableTable={showReceivableTable}
            startDate={filterStartDate}
            endDate={filterEndDate}
            filteredCity={filteredCity}
            filteredCategory={filteredCategory}
            filteredSegment={filteredSegment}
            setFilteredCity={setFilteredCity}
            setFilteredCategory={setFilteredCategory}
            customerSearchField={customerSearchField}
            setCustomerSearchField={setCustomerSearchField}
            productSearchField={productSearchField}
            setProductSearchField={setProductSearchField}
            wareHouseSearchField={wareHouseSearchField}
            setwareHouseSearchField={setwareHouseSearchField}
            invoiceIdSearchField={invoiceIdSearchField}
            setInvoiceIdSearchField={setInvoiceIdSearchField}
            invoiceCodeSearchField={invoiceCodeSearchField}
            setInvoiceCodeSearchField={setInvoiceCodeSearchField}
            spinLoading={spinLoading}
            setSpinLoading={setSpinLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ReceivablePage;
