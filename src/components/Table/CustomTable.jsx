import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Table, Spin } from "antd";

import { amountField, dateField, infinitTable } from "../../utils/helper";
import { useOutletContext } from "react-router-dom";
import ResizableTitle from "./ResizableTitle";
import GenerateTableColumns from "./GenerateTableColumns";
import FormatTableData from "./FormatTableData";
// import ResizableTitle from "./ResizableTitle";

const CustomTable = ({
  data,
  searchFields,
  loading,
  onRow,
  title,
  setPageNo,
  spinLoading,
  setSpinLoading,
  loadMore,
}) => {
  const [
    filteredCategory,
    filteredCity,
    startDate,
    endDate,
    filteredSegment,
    tableResetBtnRef,
  ] = useOutletContext();

  const tableRef = useRef(null);
  const [tableData, setTableData] = useState(data);
  const [tablePagination, setTablePagination] = useState({});
  const [tablePointer, setTablePointer] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchFilter, setSearchFilter] = useState("");
  const [showTopProduct, setShowTopProduct] = useState(false);
  const [columns, setColumns] = useState([]);
  const [baseHeight, setBaseHeight] = useState(300);
  const [defaultHeight, setDefaultHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setDefaultHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setDefaultHeight(window.innerHeight);
  }, [data]);

  const convertToMillion = (value) => {
    if (value < 1000 || typeof value !== "number") {
      return value;
    }
    // else if (value >= 1000000) {
    //   return (value / 1000000).toFixed(2) + " million";
    // } else if (value >= 100000) {
    //   let lacs = value / 100000;
    //   return lacs.toFixed(2) + " lac" + (lacs > 1 ? "s" : "");
    // }
    else {
      return (value / 1000000).toFixed(2) + " million";
    }
  };

  const handleScroll = (e) => {
    if (!loading && !spinLoading) {
      if (infinitTable.includes(title)) {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (
          scrollTop + clientHeight >= scrollHeight - 1 &&
          spinLoading === false &&
          loadMore
        ) {
          if (setPageNo !== null) {
            setSpinLoading(true);
            setPageNo((pre) => ++pre);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (
      title === "customer" ||
      title === "warehouse-sale" ||
      title === "stock-aging"
    ) {
      setBaseHeight(220);
    } else if (
      title === "receivables-today" ||
      title === "receivables-with-start-end-date" ||
      title === "receivables-by-city" ||
      title === "receivables-by-segment" ||
      title === "receivables-by-category"
    ) {
      setBaseHeight(338);
    } else if (
      title === "sales" ||
      title === "invoice-sales" ||
      title === "sales-summary" ||
      title === "top-selling"
    ) {
      setBaseHeight(310);
    } else if (title === "Vendor Summary" || title === "Product Summary") {
      setBaseHeight(270);
    }
  }, [title]);

  useEffect(() => {
    const tableBody = document.querySelector(".ant-table-body");
    if (tableBody && !loading) {
      tableBody.addEventListener("scroll", handleScroll);
    }
    return () => {
      tableBody?.removeEventListener("scroll", handleScroll);
    };
  }, [loading, spinLoading]);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  useEffect(() => {
    FormatTableData(
      data,
      title,
      setTableData,
      setShowTopProduct,
      setTablePagination,
      setTablePointer
    );
  }, [data, amountField, dateField, title]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    if (searchFields) {
      switch (dataIndex) {
        case "vendor_name":
        case "customer_name":
        case "vendor_description":
          const [, setCustomerSearchField] = searchFields;
          setCustomerSearchField(searchFilter);
          break;
        case "product_name":
        case "product_group":
          const [, , , setProductSearchField] = searchFields;
          setProductSearchField(searchFilter);
          break;
        case "warehouse_description":
        case "segment":
        case "description":
          const [, , , , , setwareHouseSearchField] = searchFields;
          setwareHouseSearchField(searchFilter);
          break;
        case "invoice_id":
          const [, , , , , , , setInvoiceIdSearchField] = searchFields;
          setInvoiceIdSearchField(searchFilter);
          break;
        case "invoice_code":
          const [, , , , , , , , , setInvoiceCodeSearchField] = searchFields;
          setInvoiceCodeSearchField(searchFilter);
          break;
        default:
          break;
      }
    }
    confirm({ closeDropdown: false });
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  const handleSearchIconClick = (column) => {
    if (searchFields) {
      switch (column) {
        case "vendor_name":
        case "customer_name":
        case "vendor_description":
          const [customerSearchField] = searchFields;
          setSearchFilter(customerSearchField);
          break;
        case "product_name":
        case "product_group":
          const [, , productSearchField] = searchFields;
          setSearchFilter(productSearchField);
          break;
        case "warehouse_description":
        case "segment":
        case "description":
          const [, , , , wareHouseSearchField] = searchFields;
          setSearchFilter(wareHouseSearchField);
          break;
        case "invoice_id":
          const [, , , , , , invoiceIdSearchField] = searchFields;
          setSearchFilter(invoiceIdSearchField);
          break;
        case "invoice_code":
          const [, , , , , , invoiceCodeSearchField] = searchFields;
          setSearchFilter(invoiceCodeSearchField);
          break;
        default:
          break;
      }
    }
  };
  const handleReset = (column) => {
    if (searchFields) {
      switch (column) {
        case "vendor_name":
        case "customer_name":
        case "vendor_description":
          const [, setCustomerSearchField] = searchFields;
          setCustomerSearchField("");
          break;
        case "product_name":
        case "product_group":
          const [, , , setProductSearchField] = searchFields;
          setProductSearchField("");
          break;
        case "warehouse_description":
        case "segment":
        case "description":
          const [, , , , , setwareHouseSearchField] = searchFields;
          setwareHouseSearchField("");
          break;
        case "invoice_id":
          const [, , , , , , , setInvoiceIdSearchField] = searchFields;
          setInvoiceIdSearchField("");
          break;
        case "invoice_code":
          const [, , , , , , , , , setInvoiceCodeSearchField] = searchFields;
          setInvoiceCodeSearchField("");
          break;
        default:
          break;
      }
    }
    setSearchText("");
    setSearchFilter("");
    setSearchedColumn("");
    setSortedInfo({});
    if (searchInput.current) {
      searchInput.current.input.value = "";
    }
  };

  useEffect(() => {
    if (tableData?.length !== 0) {
      const tableColumn = GenerateTableColumns(
        tableData,
        sortedInfo,
        searchInput,
        searchFilter,
        setSearchFilter,
        tableResetBtnRef,
        searchedColumn,
        handleSearchIconClick,
        handleSearch,
        searchText,
        handleReset
      );
      setColumns(tableColumn);
    }
  }, [tableData, searchFilter, sortedInfo]);

  // const columns = generateColumns(tableData);

  if (loading && !spinLoading) {
    return (
      <div className="d-flex w-100 justify-content-center">
        <Spin />
      </div>
    );
  }

  const handleResize =
    (index) =>
    (_, { size }) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setColumns(newColumns);
    };
  const mergedColumns = columns?.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  const handleRowKeys = (record) => {
    const keys = Object.keys(record);
    const id = keys.find((column) => column.includes("id"));
    if (keys.length >= 2) {
      return `@~&${record["invoice_id"]}$#.$$${record["invoice_detail_id"]}@~&${record["vendor_id"]}$#.@~&${record["product_id"]}$#.`;
    }
  };
  return (
    <div className={`${tablePointer}`}>
      <button
        ref={tableResetBtnRef}
        style={{ display: "none" }}
        onClick={() => {
          handleReset("vendor_name");
        }}
      ></button>
      <div className="" style={{ display: showTopProduct ? "block" : "none" }}>
        <h5>Top Selling Products</h5>
      </div>
      <div ref={tableRef} className="fixed-height-table-container">
        <Table
          onRow={onRow}
          virtual
          // rowKey={handleRowKeys}
          bordered
          components={{
            header: {
              cell: ResizableTitle,
            },
          }}
          pagination={tablePagination}
          size="small"
          columns={mergedColumns}
          dataSource={tableData}
          scroll={{
            x: 100,
            y: defaultHeight - baseHeight,
            scrollToFirstRowOnChange: true,
          }}
          onChange={handleChange}
          onScroll={handleScroll}
        />

        {spinLoading && (
          <div className="d-flex w-100 justify-content-center mb-2">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTable;
