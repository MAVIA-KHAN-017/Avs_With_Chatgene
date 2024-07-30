import React, { useEffect, useRef, useState } from "react";
import CustomTable from "../../components/Table/CustomTable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useFetchSale } from "../../hooks/useFetchSale";
dayjs.extend(customParseFormat);
const todayYear = new Date().getFullYear();

const SaleTableWrapper = ({
  showCustomerTable,
  filteredCategory,
  filteredCity,
  filteredSegment,
  startDate,
  endDate,
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
  const [saleFilteredCity, setSaleFilteredCity] = useState(filteredCity);
  const [saleFilteredCategory, setSaleFilteredCategory] =
    useState(filteredCategory);
  const [salesStatisticsPageNo, setSalesStatisticsPageNo] = useState("1");
  const [salesStatisticsPageSize, setSalesStatisticsPageSize] = useState("50");
  const [salesSummaryPageNo, setSalesSummaryPageNo] = useState("1");
  const [invoiceSalesStatisticsPageNo, setInvoiceSalesStatisticsPageNo] =
    useState("1");
  const [invoiceSalesStatisticsPageSize, setInvoiceSalesStatisticsPageSize] =
    useState("50");
  const [topProductPageNo, setTopProductPageNo] = useState("1");
  const [topProductPageSize, setTopProductPageSize] = useState("50");

  const [topSellingProductData, setTopSellingProductData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [invoiceSalesData, setInvoiceSalesData] = useState([]);
  const [saleSummaryData, setSaleSummaryData] = useState([]);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    setSaleFilteredCategory(filteredCategory);
    setSaleFilteredCity(filteredCity);
    // setFilteredSegment(" ");
  }, [filteredCategory, filteredCity]);

  useEffect(() => {
    if ((startDate || endDate) !== "") {
      setSalesData([]);
      setInvoiceSalesData([]);
      setSaleSummaryData([]);
      setTopSellingProductData([]);
      setSalesStatisticsPageNo(1);
      setInvoiceSalesStatisticsPageNo(1);
      setSalesSummaryPageNo(1);
      setTopProductPageNo(1);
    }
  }, [startDate, endDate]);
  useEffect(() => {
    if ((saleFilteredCategory || saleFilteredCity || filteredSegment) !== "") {
      setSalesData([]);
      setInvoiceSalesData([]);
      setSaleSummaryData([]);
      setSalesStatisticsPageNo(1);
      setInvoiceSalesStatisticsPageNo(1);
      setSalesSummaryPageNo(1);
    }
  }, [saleFilteredCategory, saleFilteredCity, filteredSegment]);

  const { data: salesStatisticsData, isLoading: salesStatisticsLoading } =
    useFetchSale(
      `sales-statistics ${[
        salesStatisticsPageNo,
        salesStatisticsPageSize,
        saleFilteredCategory,
        saleFilteredCity,
        // transactionType,
        filteredSegment,
        startDate,
        endDate,
      ]}`,
      `/sales_statistics?category_filter=${saleFilteredCategory}&city_filter=${saleFilteredCity}&segment_filter=${filteredSegment}&start_date=${startDate}&end_date=${endDate}&page=${salesStatisticsPageNo}&page_size=${salesStatisticsPageSize}`
    );

  const {
    data: salesStatisticsSearchData,
    isLoading: salesStatisticsSearchLoading,
  } = useFetchSale(
    `sales-statistics-search ${[
      saleFilteredCategory,
      saleFilteredCity,
      invoiceCodeSearchField,
      filteredSegment,
      customerSearchField,
      productSearchField,
      wareHouseSearchField,
      startDate,
      endDate,
    ]}`,
    `/sales_statistics_proc?category_filter=${saleFilteredCategory}&city_filter=${saleFilteredCity}&segment_filter=${filteredSegment}&invoice_code=${invoiceCodeSearchField}&start_date=${startDate}&end_date=${endDate}&customer_search=${customerSearchField}&product_search=${productSearchField}&warehouse_search=${wareHouseSearchField}`
  );

  useEffect(() => {
    if (salesStatisticsData && !salesData.includes(salesStatisticsData[0])) {
      if (salesStatisticsData.length === 0) {
        setLoadMore(false);
        setSpinLoading(false);
      } else {
        setSalesData((pre) => [...pre, ...salesStatisticsData]);
        setSpinLoading(false);
        setLoadMore(true);
      }
    }
  }, [salesStatisticsData]);

  const {
    data: invoiceSalesStatisticsData,
    isLoading: invoiceSalesStatisticsLoading,
  } = useFetchSale(
    `invoice-sales-statistics ${[
      invoiceSalesStatisticsPageNo,
      invoiceSalesStatisticsPageSize,
      saleFilteredCategory,
      saleFilteredCity,
      // transactionType,
      filteredSegment,
      startDate,
      endDate,
    ]}`,
    `/sales_statistics_by_invoice?category_filter=${saleFilteredCategory}&city_filter=${saleFilteredCity}&segment_filter=${filteredSegment}&start_date=${startDate}&end_date=${endDate}&page=${invoiceSalesStatisticsPageNo}&page_size=${invoiceSalesStatisticsPageSize}`
  );

  const {
    data: invoiceSalesStatisticsSearchData,
    isLoading: invoiceSalesStatisticsSearchLoading,
  } = useFetchSale(
    `invoice-sales-statistics-search ${[
      saleFilteredCategory,
      saleFilteredCity,
      // transactionType,
      filteredSegment,
      customerSearchField,
      productSearchField,
      wareHouseSearchField,
      invoiceIdSearchField,
      invoiceCodeSearchField,
      startDate,
      endDate,
    ]}`,
    `/sales_statistics_by_invoice_proc?category_filter=${saleFilteredCategory}&city_filter=${saleFilteredCity}&segment_filter=${filteredSegment}&invoice_id=${invoiceIdSearchField}&invoice_code=${invoiceCodeSearchField}&start_date=${startDate}&end_date=${endDate}&product_search=${productSearchField}&warehouse_search=${wareHouseSearchField}`
  );

  useEffect(() => {
    if (
      invoiceSalesStatisticsData &&
      !invoiceSalesData.includes(invoiceSalesStatisticsData[0])
    ) {
      if (invoiceSalesStatisticsData.length === 0) {
        setLoadMore(false);
        setSpinLoading(false);
      } else {
        setInvoiceSalesData((pre) => [...pre, ...invoiceSalesStatisticsData]);
        setSpinLoading(false);
        setLoadMore(true);
      }
    }
  }, [invoiceSalesStatisticsData]);

  const { data: salesSummaryData, isLoading: salesSummaryLoading } =
    useFetchSale(
      `sales-summary ${[
        saleFilteredCategory,
        saleFilteredCity,
        filteredSegment,
        startDate,
        endDate,
        salesSummaryPageNo,
      ]}`,
      `/sales_summary?category_filter=${saleFilteredCategory}&city_filter=${saleFilteredCity}&segment_filter=${filteredSegment}&start_date=${startDate}&end_date=${endDate}&page=${salesSummaryPageNo}&page_size=50`
    );

  const { data: salesSummaryProcData, isLoading: salesSummaryProcLoading } =
    useFetchSale(
      `sales-summary-proc ${[
        saleFilteredCategory,
        saleFilteredCity,
        filteredSegment,
        startDate,
        endDate,
        customerSearchField,
      ]}`,
      `/Sale_Summary_Search_proc?category_filter=${saleFilteredCategory}&city_filter=${saleFilteredCity}&segment_filter=${filteredSegment}&start_date=${startDate}&end_date=${endDate}&customer_search=${customerSearchField}`
    );

  useEffect(() => {
    if (salesSummaryData && !saleSummaryData.includes(salesSummaryData[0])) {
      if (salesSummaryData.length === 0) {
        setLoadMore(false);
        setSpinLoading(false);
      } else {
        setSaleSummaryData((pre) => [...pre, ...salesSummaryData]);
        setSpinLoading(false);
        setLoadMore(true);
      }
    }
  }, [salesSummaryData]);

  const { data: topSellingProduct, isLoading: topSellingProductLoading } =
    useFetchSale(
      `top-selling-product ${[topProductPageNo, startDate, endDate]}`,
      `/top_selling_products/?start_date=${startDate}&end_date=${endDate}&page=${topProductPageNo}&page_size=50`
    );
  const {
    data: topSellingProductSearch,
    isLoading: topSellingProductSearchLoading,
  } = useFetchSale(
    `top-selling-product-search ${[productSearchField, startDate, endDate]}`,
    `/top_selling_products_proc/?start_date=${startDate}&end_date=${endDate}&product_search=${productSearchField}`
  );

  useEffect(() => {
    if (
      topSellingProduct &&
      !topSellingProductData.includes(topSellingProduct[0])
    ) {
      if (topSellingProduct.length === 0) {
        setLoadMore(false);
        setSpinLoading(false);
      } else {
        setTopSellingProductData((pre) => [...pre, ...topSellingProduct]);
        setSpinLoading(false);
        setLoadMore(true);
      }
    }
  }, [topSellingProduct]);

  // useEffect(() => {
  //   if ((filteredCategory || filteredCity || filteredSegment) !== "") {
  //     setSalesData([]);
  //     setInvoiceSalesData([]);
  //     setSalesStatisticsPageNo(1);
  //     setInvoiceSalesStatisticsPageNo(1);
  //   }
  // }, [filteredCategory, filteredSegment, filteredCity]);

  return (
    <div>
      {showCustomerTable ? (
        showCustomerTable === "sales" ? (
          <div className="">
            <CustomTable
              data={
                (productSearchField  !== "" ||
                  wareHouseSearchField  !== "" ||
                  customerSearchField  !== "" ||
                  invoiceCodeSearchField  !== "")
                  ? salesStatisticsSearchData
                  : salesData.length === 0
                  ? salesStatisticsData
                  : salesData
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
              loading={
                (productSearchField  !== "" ||
                  wareHouseSearchField  !== "" ||
                  customerSearchField  !== "" ||
                  invoiceCodeSearchField  !== "")
                  ? salesStatisticsSearchLoading
                  : salesStatisticsLoading
              }
              title={ showCustomerTable}
              setPageNo={(productSearchField === "" && wareHouseSearchField === "" &&  customerSearchField === "" && invoiceCodeSearchField === "") ? setSalesStatisticsPageNo : null}
              spinLoading={spinLoading}
              setSpinLoading={setSpinLoading}
              loadMore={loadMore}
            />
          </div>
        ) : showCustomerTable === "invoice-sales" ? (
          <div className="">
            <CustomTable
              data={
                (productSearchField !== "" ||
                  wareHouseSearchField !== "" ||
                  customerSearchField !== "" ||
                  invoiceIdSearchField !== "" ||
                  invoiceCodeSearchField !== "") 
                  ? invoiceSalesStatisticsSearchData
                  : invoiceSalesData.length === 0
                  ? invoiceSalesStatisticsData
                  : invoiceSalesData
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
              loading={
                (productSearchField !== "" ||
                  wareHouseSearchField !== "" ||
                  customerSearchField !== "" ||
                  invoiceIdSearchField !== "" ||
                  invoiceCodeSearchField !== "") 
                  ? invoiceSalesStatisticsSearchLoading
                  : invoiceSalesStatisticsLoading
              }
              title={showCustomerTable}
              setPageNo={ (productSearchField === "" &&
                wareHouseSearchField === "" &&
                customerSearchField === "" &&
                invoiceIdSearchField === "" &&
                invoiceCodeSearchField === "") ? setInvoiceSalesStatisticsPageNo : null}
              spinLoading={spinLoading}
              setSpinLoading={setSpinLoading}
              loadMore={loadMore}
            />
          </div>
        ) : showCustomerTable === "sales-summary" ? (
          <div className="">
            <CustomTable
              data={
                customerSearchField !== ""
                  ? salesSummaryProcData
                  : saleSummaryData
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
              loading={
                customerSearchField !== ""
                  ? salesSummaryProcLoading
                  : salesSummaryLoading
              }
              title={showCustomerTable}
              setPageNo={customerSearchField === "" ? setSalesSummaryPageNo : null}
              spinLoading={spinLoading}
              setSpinLoading={setSpinLoading}
              loadMore={loadMore}
            />
          </div>
        ) : showCustomerTable === "top-selling" ? (
          <div className="col-lg- col-md-12 mb-md-0 mb-4 mt-0">
            <div className=""></div>
            <CustomTable
              data={
                productSearchField !== ""
                  ? topSellingProductSearch
                  : topSellingProductData
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
              loading={
                productSearchField !== ""
                  ? topSellingProductSearchLoading
                  : topSellingProductLoading
              }
              title={"top-selling-products"}
              setPageNo={productSearchField === "" ? setTopProductPageNo : null}
              spinLoading={spinLoading}
              setSpinLoading={setSpinLoading}
              loadMore={loadMore}
            />
          </div>
        ) : (
          ""
        )
      ) : null}
    </div>
  );
};

export default SaleTableWrapper;
