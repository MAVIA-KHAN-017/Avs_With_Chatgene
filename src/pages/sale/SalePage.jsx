import { lazy, useEffect, useRef, useState } from "react";
import Scrollbar from "smooth-scrollbar";
import { useOutletContext } from "react-router-dom";
import SaleCards from "./SaleCards";

const SaleTableWrapper = lazy(() => import("./SaleTableWrapper"));

const SalePage = () => {
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
  const [showCustomerTable, setShowCustomerTable] = useState("sales");
  const [activeTab, setActiveTab] = useState(1);
  // const [customerSearchField, setCustomerSearchField] = useState("");
  // const [productSearchField, setProductSearchField] = useState("");
  // const [wareHouseSearchField, setwareHouseSearchField] = useState("");
  // const [invoiceIdSearchField, setInvoiceIdSearchField] = useState("");
  // const [invoiceCodeSearchField, setInvoiceCodeSearchField] = useState("");
  const [spinLoading, setSpinLoading] = useState(false);

  useEffect(() => {
    setDisabledCalender(false);
    setDisabledCat(false);
    setDisabledCity(false);
    setDisabledSegment(false);
    setDisabledTransaction(false);
    const isWindows = navigator.platform.indexOf("Win") > -1;
    const sidenavScrollbar = document.querySelector("#sidenav-scrollbar");

    if (isWindows && sidenavScrollbar) {
      const options = {
        damping: "0.5",
      };

      Scrollbar.init(sidenavScrollbar, options);
    }
  }, []);

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


  const handleTabClick = (index, key) => {
    setActiveTab(index);
    setShowCustomerTable(key);
    setTimeout(() => {
      window.scrollTo({
        top: 660,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="">
      {/* Sale Cards */}
      <SaleCards
        filter={[filteredCategory, filteredCity, startDate, endDate]}
      />
      {/* Table Wrappers */}
      <div className="container-fluid">
        <div className="row mt-1">
          <div className="col-lg-12 col-md-6  me-sm-0">
            <div className="nav-wrapper position-relative end-0">
              <ul className="nav nav-pills nav-fill p-1" role="tablist">
                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 1 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(1, "sales");
                    setDisabledCalender(false);
                    setDisabledCat(false);
                    setDisabledCity(false);
                    setDisabledSegment(false);
                    setDisabledTransaction(false);
                    setProductSearchField("");
                    setwareHouseSearchField("");
                    setCustomerSearchField("");
                    setInvoiceCodeSearchField("")
                    setInvoiceIdSearchField("")
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
                      inventory
                    </i>
                    <span className="ms-1">Sales</span>
                  </span>
                </li>
                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 2 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(2, "invoice-sales");
                    setDisabledCalender(false);
                    setDisabledCat(false);
                    setDisabledCity(false);
                    setDisabledSegment(false);
                    setDisabledTransaction(false);
                    setProductSearchField("");
                    setwareHouseSearchField("");
                    setCustomerSearchField("");
                    setInvoiceCodeSearchField("")
                    setInvoiceIdSearchField("")
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
                      category
                    </i>
                    <span className="ms-1">Invoice Sale</span>
                  </span>
                </li>
                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 3 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(3, "sales-summary");
                    setDisabledCalender(false);
                    setDisabledCat(false);
                    setDisabledCity(false);
                    setDisabledSegment(false);
                    setDisabledTransaction(true);
                    setProductSearchField("");
                    setwareHouseSearchField("");
                    setCustomerSearchField("");
                    setInvoiceCodeSearchField("")
                    setInvoiceIdSearchField("")
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
                      segment
                    </i>
                    <span className="ms-1">Sale Summary</span>
                  </span>
                </li>
                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 4 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(4, "top-selling");
                    setDisabledCalender(false);
                    setDisabledCat(false);
                    setDisabledCity(false);
                    setDisabledSegment(true);
                    setDisabledTransaction(true);
                    setProductSearchField("");
                    setwareHouseSearchField("");
                    setCustomerSearchField("");
                    setInvoiceCodeSearchField("")
                    setInvoiceIdSearchField("")
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
                    sell
                    </i>
                    <span className="ms-1">Top Sales</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tables Wrapper */}
          <SaleTableWrapper
            showCustomerTable={showCustomerTable}
            filteredCategory={filteredCategory}
            filteredCity={filteredCity}
            filteredSegment={filteredSegment}
            startDate={startDate}
            endDate={endDate}
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

export default SalePage;
