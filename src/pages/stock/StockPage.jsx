import { lazy, useEffect, useRef, useState } from "react";
import Scrollbar from "smooth-scrollbar";
import { useOutletContext } from "react-router-dom";
import { MessageOutlined } from "@ant-design/icons";
import Chat from "../../components/Chat/Chat";
import botIcon from "../../utils/images/bot.gif"

const StockTableWrapper = lazy(() => import("./StockTableWrapper"));
const StockCards = lazy(() => import("./StockCards"));

const StockPage = () => {
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
    setInvoiceIdSearchField,
  ] = useOutletContext();

  const [showCustomerTable, setShowCustomerTable] = useState("customer");
  const [productFilteredYear, setProductFilteredYear] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [spinLoading, setSpinLoading] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false)

  useEffect(() => {
    setDisabledCalender(true);
    setDisabledCat(true);
    setDisabledCity(true);
    setDisabledSegment(true);
    setDisabledTransaction(true);
    const isWindows = navigator.platform.indexOf("Win") > -1;
    const sidenavScrollbar = document.querySelector("#sidenav-scrollbar");

    if (isWindows && sidenavScrollbar) {
      const options = {
        damping: "0.5",
      };

      Scrollbar.init(sidenavScrollbar, options);
    }
  }, []);

  const handleTabClick = (index, key) => {
    setActiveTab(index);
    setShowCustomerTable(key);
    setTimeout(() => {
      window.scrollTo({
        top: 660,
        behavior: "smooth",
      });
    }, 100);
    setProductFilteredYear("");
  };

  const handleBotIconClick = () => {
    setShowChatBot(!showChatBot)
  }

  return (
    <div className="">
      {/* Stock Cards */}
      {/* <StockCards
        filter={[filteredCategory, filteredCity, startDate, endDate]}
      /> */}
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
                    handleTabClick(1, "customer");
                    setDisabledCalender(true);
                    setDisabledCat(true);
                    setDisabledCity(true);
                    setDisabledSegment(true);
                    setDisabledTransaction(true);
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
                      person
                    </i>
                    <span className="ms-1">Vendors</span>
                  </span>
                </li>
                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 3 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(3, "warehouse-sale");
                    setDisabledCalender(false);
                    setDisabledCat(true);
                    setDisabledCity(true);
                    setDisabledSegment(true);
                    setDisabledTransaction(true);
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
                      warehouse
                    </i>
                    <span className="ms-1">Warehouse Sales</span>
                  </span>
                </li>

                <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 4 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(4, "stock-aging");
                    setDisabledCalender(false);
                    setDisabledCat(true);
                    setDisabledCity(true);
                    setDisabledSegment(true);
                    setDisabledTransaction(true);
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
                      data_thresholding
                    </i>
                    <span className="ms-1">Stock Aging</span>
                  </span>
                </li>

                {/* <li
                  className={`nav-item cursor-pointer ${
                    activeTab === 5 ? "table-wrapper-active-tab" : ""
                  }`}
                  onClick={() => {
                    handleTabClick(5, "sales");
                    setDisabledCalender(false);
                    setDisabledCat(false);
                    setDisabledCity(false);
                    setDisabledSegment(false);
                    setDisabledTransaction(false);
                    setProductSearchField("")
                    setwareHouseSearchField("")
                    setCustomerSearchField("")
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
                      inventory
                    </i>
                    <span className="ms-1">Sales</span>
                  </span>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Tables Wrapper */}
          <StockTableWrapper
            showCustomerTable={showCustomerTable}
            filteredCategory={filteredCategory}
            filteredCity={filteredCity}
            productFilteredYear={productFilteredYear}
            setProductFilteredYear={setProductFilteredYear}
            filteredSegment={filteredSegment}
            startDate={startDate}
            endDate={endDate}
            // transactionType={transactionType}
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
          <div className="chatbot-container">
          <img src={botIcon} alt="Bot" className="chatbot-icon" title="AVS Bot" onClick={handleBotIconClick} />
          {/* <MessageOutlined  /> */}
          </div>
          {
            showChatBot && <Chat handleBotIconClick={handleBotIconClick} />
          }
        </div>
      </div>
    </div>
  );
};

export default StockPage;
