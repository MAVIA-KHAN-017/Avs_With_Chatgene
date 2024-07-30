import React, { useEffect, useState } from "react";
import { useFetchReceivables } from "../../hooks/useFetchReceivables";
import CustomTable from "../../components/Table/CustomTable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const todayYear = new Date().getFullYear();

const ReceiableTableWrapper = ({
  showReceivableTable,
  startDate,
  endDate,
  filteredCity,
  filteredCategory,
  filteredSegment,
  setFilteredCity,
  setFilteredCategory,
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
}) => {
  const [receivableWithDateData, setReceivableWithDateData] = useState([]);
  const [receivablesWithFilterData, setReceivablesWithFilterData] = useState(
    []
  );
  const [spinLoading, setSpinLoading] = useState(false);
  const [receivablePageNo, setReceivablePageNo] = useState(1);
  const [receivableFilterPageNo, setReceivableFilterPageNo] = useState(1);
  const [receivablePageSize, setReceivablePageSize] = useState(50);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if ((startDate || endDate) !== "") {
      setReceivableWithDateData([]);
      setReceivablePageNo(1);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setReceivablesWithFilterData([]);
    setReceivableFilterPageNo(1);
  }, [startDate, endDate, filteredCategory, filteredCity, filteredSegment]);

  const {
    data: receivableTodayData,
    isLoading: receivableTodayLoading,
    isError: receivableTodayError,
  } = useFetchReceivables(
    `receivable-today-table-data ${[
      wareHouseSearchField,
      invoiceIdSearchField,
      invoiceCodeSearchField,
    ]}`,
    `/receivables_today?customer_search=${
      wareHouseSearchField === "" ? "%20" : wareHouseSearchField
    }&invoice_id=${invoiceIdSearchField}&invoice_code=${invoiceCodeSearchField}`
  );

  const {
    data: recievableWithFilterData,
    isLoading: recievableWithFilterLoading,
    isError: recievableWithFilterError,
  } = useFetchReceivables(
    `recievableWithFilterTable ${[
      filteredCategory,
      filteredCity,
      filteredSegment,
      startDate,
      endDate,
      receivableFilterPageNo,
    ]}`,
    `/receivables_with_filter?Category_Filter=${filteredCategory}&Segment=${filteredSegment}&City_Filter=${filteredCity}&start_date=${startDate}&end_date=${endDate}&page=${receivableFilterPageNo}&page_size=50`
  );

  const {
    data: recievableWithFilterProcData,
    isLoading: recievableWithFilterProLoading,
    isError: recievableWithFilterProError,
  } = useFetchReceivables(
    `recievableWithFilterTablePro ${[
      filteredCategory,
      filteredCity,
      filteredSegment,
      customerSearchField,
      startDate,
      endDate,
    ]}`,
    `/receivables_with_filter_proc?category_filter=${filteredCategory}&city_filter=${filteredCity}&segment_filter=${filteredSegment}&customer_search=${customerSearchField}&start_date=${startDate}&end_date=${endDate}`
  );

  useEffect(() => {
    if (
      recievableWithFilterData &&
      !receivablesWithFilterData.includes(recievableWithFilterData[0])
    ) {
      if (recievableWithFilterData.length === 0) {
        setLoadMore(false);
        setSpinLoading(false);
      } else {
        setReceivablesWithFilterData((pre) => [
          ...pre,
          ...recievableWithFilterData,
        ]);
        setSpinLoading(false);
        setLoadMore(true);
      }
    }
  }, [recievableWithFilterData]);

  const {
    data: newReceivableWithDateData,
    isLoading: newReceivableWithDateLoading,
    isError: newReceivableWithDateError,
  } = useFetchReceivables(
    `receivable-start-end-table-data ${[
      startDate,
      endDate,
      receivablePageNo,
      receivablePageSize,
    ]}`,
    `/receivables_start_end_date?start_date=${startDate}&end_date=${endDate}&page=${receivablePageNo}&page_size=${receivablePageSize}`
  );

  const {
    data: receivableWithDateSearch,
    isLoading: receivableWithDateSearchLoading,
    isError: receivableWithDateSearchError,
  } = useFetchReceivables(
    `receivable-start-end-table-search ${[
      startDate,
      endDate,
      wareHouseSearchField,
      invoiceIdSearchField,
      invoiceCodeSearchField,
    ]}`,
    `/receivables_start_end_date__proc?start_date=${startDate}&end_date=${endDate}&customer_search=${
      wareHouseSearchField === "" ? "%20" : wareHouseSearchField
    }&invoice_id=${invoiceIdSearchField}&invoice_code=${invoiceCodeSearchField}`
  );

  useEffect(() => {
    if (
      newReceivableWithDateData &&
      !receivableWithDateData.includes(newReceivableWithDateData[0])
    ) {
      if (newReceivableWithDateData.length === 0) {
        setLoadMore(false);
        setSpinLoading(false);
      } else {
        setReceivableWithDateData((pre) => [
          ...pre,
          ...newReceivableWithDateData,
        ]);
        setSpinLoading(false);
        setLoadMore(true);
      }
    }
  }, [newReceivableWithDateData]);

  // const {
  //   data: receivableByCityData,
  //   isLoading: receivableByCityLoading,
  //   isError: receivableByCityError,
  // } = useFetchReceivables(
  //   `receivable-by-city-table-data ${[filteredCity, wareHouseSearchField]}`,
  //   `/receivables_by_city?city_filter=${filteredCity}&customer_search=${
  //     wareHouseSearchField === "" ? "%20" : wareHouseSearchField
  //   }`
  // );
  // const {
  //   data: receivableBySegmentData,
  //   isLoading: receivableBySegmentLoading,
  //   isError: receivableBySegmentError,
  // } = useFetchReceivables(
  //   `receivable-by-segment-table-data ${[
  //     filteredSegment,
  //     wareHouseSearchField,
  //   ]}`,
  //   `/receivables_by_segment?segment_filter=${filteredSegment}&customer_search=${
  //     wareHouseSearchField === "" ? "%20" : wareHouseSearchField
  //   }`
  // );
  // const {
  //   data: receivableByCategoryData,
  //   isLoading: receivableByCategoryLoading,
  //   isError: receivableByCategoryError,
  // } = useFetchReceivables(
  //   `receivable-by-category-table-data ${[
  //     filteredCategory,
  //     wareHouseSearchField,
  //   ]}`,
  //   `/receivables_by_category?category_filter=${filteredCategory}&customer_search=${
  //     wareHouseSearchField === "" ? "%20" : wareHouseSearchField
  //   }`
  // );

  const handleReceiableStartTableFilter = (page, pageSize) => {
    setReceivablePageNo(page);
    setReceivablePageSize(pageSize);
  };

  return (
    <div>
      {showReceivableTable ? (
        showReceivableTable === "receivables-today" ? (
          <div className="col-lg- col-md-12 mb-md-0 mb-4 mt-0">
            <CustomTable
              data={receivableTodayData}
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
              loading={receivableTodayLoading}
              title={showReceivableTable}
              loadMore={false}
            />
          </div>
        ) : showReceivableTable === "receivables-with-start-end-date" ? (
          <div className="col-lg- col-md-12 mb-md-0 mb-4 mt-0">
            <CustomTable
              data={
                (wareHouseSearchField !== "" ||
                  invoiceIdSearchField !== "" ||
                  invoiceCodeSearchField !== "") 
                  ? receivableWithDateSearch
                  : receivableWithDateData.length === 0
                  ? newReceivableWithDateData
                  : receivableWithDateData
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
                (wareHouseSearchField !== "" ||
                  invoiceIdSearchField !== "" ||
                  invoiceCodeSearchField !== "")
                  ? receivableWithDateSearchLoading
                  : newReceivableWithDateLoading
              }
              title={showReceivableTable}
              setPageNo={ (wareHouseSearchField === "" &&
                invoiceIdSearchField === "" &&
                invoiceCodeSearchField === "") ? setReceivablePageNo : null}
              spinLoading={spinLoading}
              setSpinLoading={setSpinLoading}
              loadMore={loadMore}
            />
          </div>
        ) : showReceivableTable === "receivables-with-filter" ? (
          <div className="col-lg- col-md-12 mb-md-0 mb-4 mt-0">
            <CustomTable
              data={
                customerSearchField !== ""
                  ? recievableWithFilterProcData
                  : receivablesWithFilterData.length === 0
                  ? recievableWithFilterData
                  : receivablesWithFilterData
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
                  ? recievableWithFilterProLoading
                  : recievableWithFilterLoading
              }
              title={showReceivableTable}
              setPageNo={customerSearchField === "" ? setReceivableFilterPageNo : null}
              spinLoading={spinLoading}
              setSpinLoading={setSpinLoading}
              loadMore={loadMore}
            />
          </div>
        ) : (
          ""
        )
      ) : // showReceivableTable === "receivables-by-city" ? (
      //   <div className="col-lg- col-md-12 mb-md-0 mb-4 mt-0">
      //     <CustomTable
      //       data={receivableByCityData}
      //       searchFields={[
      //         customerSearchField,
      //         setCustomerSearchField,
      //         productSearchField,
      //         setProductSearchField,
      //         wareHouseSearchField,
      //         setwareHouseSearchField,
      //         invoiceIdSearchField,
      //         setInvoiceIdSearchField,
      //         invoiceCodeSearchField,
      //         setInvoiceCodeSearchField,
      //       ]}
      //       loading={receivableByCityLoading}
      //       title={showReceivableTable}
      //       loadMore={false}
      //     />
      //   </div>
      // ) : showReceivableTable === "receivables-by-segment" ? (
      //   <div className="col-lg- col-md-12 mb-md-0 mb-4 mt-0">
      //     <CustomTable
      //       data={receivableBySegmentData}
      //       searchFields={[
      //         customerSearchField,
      //         setCustomerSearchField,
      //         productSearchField,
      //         setProductSearchField,
      //         wareHouseSearchField,
      //         setwareHouseSearchField,
      //         invoiceIdSearchField,
      //         setInvoiceIdSearchField,
      //         invoiceCodeSearchField,
      //         setInvoiceCodeSearchField,
      //       ]}
      //       loading={receivableBySegmentLoading}
      //       title={showReceivableTable}
      //       loadMore={false}
      //     />
      //   </div>
      // ) : showReceivableTable === "receivables-by-category" ? (
      //   <div className="col-lg- col-md-12 mb-md-0 mb-4 mt-0">
      //     <CustomTable
      //       data={receivableByCategoryData}
      //       searchFields={[
      //         customerSearchField,
      //         setCustomerSearchField,
      //         productSearchField,
      //         setProductSearchField,
      //         wareHouseSearchField,
      //         setwareHouseSearchField,
      //         invoiceIdSearchField,
      //         setInvoiceIdSearchField,
      //         invoiceCodeSearchField,
      //         setInvoiceCodeSearchField,
      //       ]}
      //       loading={receivableByCategoryLoading}
      //       title={showReceivableTable}
      //       loadMore={false}
      //     />
      //   </div>
      // ) : (
      //   ""
      // )
      null}
    </div>
  );
};

export default ReceiableTableWrapper;
