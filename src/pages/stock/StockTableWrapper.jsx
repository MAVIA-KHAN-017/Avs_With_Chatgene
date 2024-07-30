import React, { useEffect, useRef, useState } from "react";
import CustomTable from "../../components/Table/CustomTable";
import StockModal from "../../components/modal/stockModal";
import { Pagination, Spin } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useFetchStock } from "../../hooks/useFetchStock";
dayjs.extend(customParseFormat);
const todayYear = new Date().getFullYear();

const StockTableWrapper = ({
  showCustomerTable,
  filteredCategory,
  filteredCity,
  productFilteredYear,
  setProductFilteredYear,
  filteredSegment,
  startDate,
  endDate,
  // transactionType,
  customerSearchField,
  setCustomerSearchField,
  productSearchField,
  setProductSearchField,
  wareHouseSearchField,
  setwareHouseSearchField,
  invoiceIdSearchField,
  setInvoiceIdSearchField,
  invoiceCodeSearchField,
  setInvoiceCodeSearchField,
  spinLoading,
  setSpinLoading,
}) => {
  const [modal2Open, setModal2Open] = useState(false);
  const [productModal2Open, setProductModal2Open] = useState(false);
  const [vendorId, setVendorId] = useState(9);
  const [productId, setProductId] = useState(1);
  const [vendorPageNo, setVendorPageNo] = useState(1);
  const [warehousePageNo, setWarehousePageNo] = useState("1");
  const [warehousePageSize, setWarehousePageSize] = useState("50");
  const [agingPageNo, setAgingPageNo] = useState("1");
  const [agingPageSize, setAgingPageSize] = useState("50");
  const [saleFilteredCity, setSaleFilteredCity] = useState(filteredCity);
  const [saleFilteredCategory, setSaleFilteredCategory] =
    useState(filteredCategory);
  const [vendorSummaryData, setVendorSummaryData] = useState([]);
  const [stockAgingData, setStockAgingData] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if((filteredSegment || filteredCategory || filteredCity || startDate || endDate) !== ""){
      setStockAgingData([]);
      setWarehouseData([]);
      setAgingPageNo(1);
      setWarehousePageNo(1);
    }
  },[startDate, endDate, filteredCategory, filteredCity, filteredSegment])


  useEffect(() => {
    setSaleFilteredCategory(filteredCategory);
    setSaleFilteredCity(filteredCity);
    // setFilteredSegment(" ");
  }, [filteredCategory, filteredCity]);

  const { data: vendorSummary, isLoading: vendorSummaryLoading, isError: vendorSummaryError } = useFetchStock(
    `vendor-summary, ${[vendorPageNo]}`,
    `/vendor_summary/?page=${vendorPageNo}&page_size=50`
  );
  const { data: vendorSummarySearch, isLoading: vendorSummarySearchLoading, isError: vendorSummarySerachError } = useFetchStock(
    `vendor-summary-search ${customerSearchField}`,
    `/vendor_summary_proc/?customer_search=${customerSearchField}`
  );

  useEffect(() => {
    if(vendorSummary && !vendorSummaryData.includes(vendorSummary[0])){
      if(vendorSummary.length === 0){
        setLoadMore(false)
        setSpinLoading(false)
      }
      else {
      setVendorSummaryData(pre => [...pre, ...vendorSummary]);
      setSpinLoading(false);
      setLoadMore(true)
      }
    }
  },[vendorSummary])

  const { data: warehouseSale, isLoading: warehouseLoading } = useFetchStock(
    `warehouse-sale ${[
      warehousePageNo,
      warehousePageSize,
      startDate,
      endDate,
    ]}`,
    `/warehouse_sales_statistics?start_date=${startDate}&end_date=${endDate}&page=${warehousePageNo}&page_size=${warehousePageSize}`
  );

  const { data: warehouseSaleSearch, isLoading: warehouseSearchLoading } = useFetchStock(
    `warehouse-sale-search ${[
      productSearchField,
      wareHouseSearchField,
      startDate,
      endDate
    ]}`,
    `/warehouse_sales_statistics_proc?start_date=${startDate}&end_date=${endDate}&product_search=${productSearchField}&warehouse_search=${wareHouseSearchField}`
  );

  useEffect(() => {
    if(warehouseSale && !warehouseData.includes(warehouseSale[0])){
      if(warehouseSale.length === 0){
        setLoadMore(false)
        setSpinLoading(false)
      }
      else {
      setWarehouseData(pre => [...pre, ...warehouseSale]);
      setSpinLoading(false);
      setLoadMore(true)
      }
    }
  },[warehouseSale])

  const { data: newStockAging, isLoading: stockAgingLoading } = useFetchStock(
    `stock-aging ${[
      agingPageNo,
      agingPageSize,
      startDate,
      endDate
    ]}`,
    `/stock_aging?start_date=${startDate}&end_date=${endDate}&page=${agingPageNo}&page_size=${agingPageSize}`
  );
  const { data: stockAgingSearch, isLoading: stockAgingSearchLoading } =
    useFetchStock(
      `stock-aging-search ${[productSearchField, wareHouseSearchField, startDate, endDate]}`,
      `/stock_aging_proc?start_date=${startDate}&end_date=${endDate}&product_search=${productSearchField}&warehouse_search=${wareHouseSearchField}`
    );

    useEffect(() => {
      if(newStockAging && !stockAgingData.includes(newStockAging[0])){
        if(newStockAging.length === 0) {
          setLoadMore(false)
          setSpinLoading(false)
        } 
        else {
        setStockAgingData(pre => [...pre, ...newStockAging]);
        setSpinLoading(false);
        setLoadMore(true)
        }
      }
    },[newStockAging])

  const handleTopProductTableFilter = (page, pageSize) => {
    setTopProductPageNo(page);
    setTopProductPageSize(pageSize);
  };


  return (
    <div>
      {showCustomerTable ? (
        showCustomerTable === "customer" ? (
          <div className="col-lg- col-md-12 mb-md-0 mb-4 mt-0">
            <StockModal
              setModal2Open={setModal2Open}
              searchFields={[
                customerSearchField,
                setCustomerSearchField,
                productSearchField,
                setProductSearchField,
                wareHouseSearchField,
                setwareHouseSearchField,
                invoiceIdSearchField,
                setInvoiceIdSearchField,
                invoiceCodeSearchField,
                setInvoiceCodeSearchField,
              ]}
              modal2Open={modal2Open}
              vendorId={vendorId}
              requestKey="Vendor Summary"
              url={`detailed_vendor_information/${vendorId}?`}
              searchUrl = {`detailed_vendor_information_proc?vendor_id=${vendorId}&product_search=${productSearchField}&invoice_id=${invoiceIdSearchField}&invoice_code=${invoiceCodeSearchField}`}
              setSpinLoading={setSpinLoading}
              spinLoading={spinLoading}
            />
            <CustomTable
              data={customerSearchField !== "" ? vendorSummarySearch : vendorSummaryData}
              searchFields={[
                customerSearchField,
                setCustomerSearchField,
                productSearchField,
                setProductSearchField,
                wareHouseSearchField,
                setwareHouseSearchField,
                invoiceIdSearchField,
                setInvoiceIdSearchField,
                invoiceCodeSearchField,
                setInvoiceCodeSearchField,
              ]}
              loading={customerSearchField !== "" ? vendorSummarySearchLoading : vendorSummaryLoading}
              title={showCustomerTable}
              setPageNo={customerSearchField === "" ? setVendorPageNo : null}
              spinLoading={spinLoading}
              setSpinLoading={setSpinLoading}
              loadMore={loadMore}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setModal2Open(true);
                    setVendorId(record.vendor_id);
                  },
                };
              }}
            />
          </div>
        )  : showCustomerTable === "warehouse-sale" ? (
          <div className="">
            <CustomTable
              data={(productSearchField  !== "" || wareHouseSearchField !== "")  ? warehouseSaleSearch : warehouseData.length === 0 ? warehouseSale : warehouseData}
              searchFields={[
                customerSearchField,
                setCustomerSearchField,
                productSearchField,
                setProductSearchField,
                wareHouseSearchField,
                setwareHouseSearchField,
                invoiceIdSearchField,
                setInvoiceIdSearchField,
                invoiceCodeSearchField,
                setInvoiceCodeSearchField,
              ]}
              loading={(productSearchField !== "" || wareHouseSearchField !== "")  ? warehouseSearchLoading : warehouseLoading}
              title={showCustomerTable}
              setPageNo={(productSearchField === "" && wareHouseSearchField === "") ? setWarehousePageNo : null}
              spinLoading={spinLoading}
              setSpinLoading={setSpinLoading}
              loadMore={loadMore}
            />
          </div>
        ) : showCustomerTable === "stock-aging" ? (
          <div className="">
              <StockModal
                setModal2Open={setProductModal2Open}
                searchFields={[
                  customerSearchField,
                  setCustomerSearchField,
                  productSearchField,
                  setProductSearchField,
                  wareHouseSearchField,
                  setwareHouseSearchField,
                  invoiceIdSearchField,
                  setInvoiceIdSearchField,
                  invoiceCodeSearchField,
                  setInvoiceCodeSearchField,
                ]}
                modal2Open={productModal2Open}
                vendorId={productId}
                requestKey="Product Summary"
                url={`stock_summary?product_id=${productId}&`}
                searchUrl = {`stock_summary?product_id=${productId}&`}
                setSpinLoading={setSpinLoading}
                spinLoading={spinLoading}
              />
              <CustomTable
                data={
                  (productSearchField || wareHouseSearchField) !== ""
                    ? stockAgingSearch
                    : stockAgingData.length === 0 ? newStockAging : stockAgingData
                }
                searchFields={[
                  customerSearchField,
                  setCustomerSearchField,
                  productSearchField,
                  setProductSearchField,
                  wareHouseSearchField,
                  setwareHouseSearchField,
                  invoiceIdSearchField,
                  setInvoiceIdSearchField,
                  invoiceCodeSearchField,
                  setInvoiceCodeSearchField,
                ]}
                loading={(productSearchField !== "" || wareHouseSearchField !== "")  ?stockAgingSearchLoading : stockAgingLoading}
                title={showCustomerTable}
                setPageNo={ (productSearchField === "" && wareHouseSearchField === "") ?setAgingPageNo : null}
                spinLoading={spinLoading}
                setSpinLoading={setSpinLoading}
                loadMore={loadMore}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      setProductModal2Open(true);
                      setProductId(record.product_id);
                     
                    },
                  };
                }}
              />
            {/* <div className="table-filter-page-selection-container mt-0">
              {!stockAgingLoading && (
                <Pagination
                  defaultCurrent={1}
                  current={agingPageNo}
                  total={1200}
                  pageSize={agingPageSize}
                  onChange={(page, pageSize) =>
                    handleAgingTableFilter(page, pageSize)
                  }
                />
              )}
            </div> */}
          </div>
        ) : (
          ""
        )
      ) : null}
    </div>
  );
};

export default StockTableWrapper;
