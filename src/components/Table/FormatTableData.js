import { amountField, dateField, infinitTable } from "../../utils/helper";

const FormatTableData = (
  data,
  title,
  setTableData,
  setShowTopProduct,
  setTablePagination,
  setTablePointer
) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  if (data !== undefined && data !== null && data.length > 0) {
    if (title === "top-selling") {
      setShowTopProduct(true);
    } else {
      setShowTopProduct(false);
    }
    if (infinitTable.includes(title)) {
      setTablePagination(false);
    } else {
      setTablePagination({
        hideOnSinglePage: true,
        showSizeChanger: true,
        position: ["bottomright"],
        defaultPageSize: 50,
      });
    }
    if (title === "customer" || title === "stock-aging") {
      setTablePointer("custom-table-container");
    } else {
      setTablePointer("");
    }
    const updatedTableData = data.map((item, i) => {
      const updatedItem = { ...item };
      if (updatedItem["unit_rate"]) {
        updatedItem["unit_rate"] = Math.round(
          item["unit_rate"]
        ).toLocaleString();
      }
      if (updatedItem["total_quantity"]) {
        updatedItem["total_quantity"] = Math.round(
          item["total_quantity"]
        ).toLocaleString();
      }
      amountField.forEach((field) => {
        if (Object.keys(item).includes(field)) {
          // updatedItem[field] = Math.round(item[field]).toLocaleString();
          let fixedValue = item[field]?.toFixed(2);
          if (item?.currency === "-" || item?.currency === "PKR") {
            if (item[field] === null) {
              updatedItem[field] = "None";
            } else {
              updatedItem[field] =
                "Rs. " +
                Number(fixedValue).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
            }
          } else if (item?.currency === "EUR") {
            if (item[field] === null) {
              updatedItem[field] = "None";
            } else {
              updatedItem[field] =
                "€ " +
                Number(fixedValue).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
            }
          }
          // updatedItem[field] = convertToMillion(item[field]);
        }
      });
      dateField.map((field) => {
        if (Object.keys(item).includes(field)) {
          updatedItem[field] = formatDate(item[field]);
        }
      });
      return updatedItem;
    });
    setTableData(updatedTableData);
  } else {
    setTableData(data);
  }
};

export default FormatTableData;
