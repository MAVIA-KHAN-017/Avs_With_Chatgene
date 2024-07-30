import { columnsKey, searchFieldHelepers, skipColumns } from "../../utils/helper";
import GenerateTableColumnSearchProbs from "./GenerateTableColumnSearchProbs";

const GenerateTableColumns = (tableData, sortedInfo,
    searchInput,
    searchFilter,
    setSearchFilter,
    tableResetBtnRef,
    searchedColumn,
    handleSearchIconClick,
    handleSearch,
    searchText,
    handleReset) => {

    const getColumnSearchProps = (dataIndex) =>
        GenerateTableColumnSearchProbs(
          dataIndex,
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

  if (!tableData || tableData.length === 0) {
    return [];
  }

  const keys = Object.keys(tableData[0]);

  const columns = keys
    .map((key, i) => {
      if (skipColumns.includes(key)) return null;
      if (searchFieldHelepers.includes(key)) {
        return {
          title: columnsKey[key],
          dataIndex: key,
          key: key.toLowerCase().replace(/ /g, "_"),
          width: 200,
          ...getColumnSearchProps(key),
          sorter: (a, b) => {
            const cleanValue = (value) => {
              if (typeof value === "string") {
                if (value.startsWith("Rs. ") || value.startsWith("€ ")) {
                  const numericValue = parseFloat(
                    value.replace(/Rs\. |€ |-/g, "").replace(/,/g, "")
                  );
                  return isNaN(numericValue) ? value : numericValue;
                } else if (!isNaN(Date.parse(value))) {
                  return new Date(value).getTime();
                } else {
                  return value;
                }
              } else if (typeof value === "number") {
                return value;
              }
              return value;
            };

            const aValue = cleanValue(a[key]);
            const bValue = cleanValue(b[key]);

            if (typeof aValue === "string" && typeof bValue === "string") {
              return aValue.localeCompare(bValue);
            } else {
              return aValue - bValue;
            }
          },
          sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
          ellipsis: true,
        };
      } else {
        return {
          title: columnsKey[key],
          dataIndex: key,
          key: key.toLowerCase().replace(/ /g, "_"),
          width: 200,
          // ...getColumnSearchProps(key),
          sorter: (a, b) => {
            const cleanValue = (value) => {
              if (typeof value === "string") {
                // const dateValue = Date.parse(value);
                // if (!isNaN(dateValue)) {
                //   return dateValue;
                // }

                if (value.startsWith("Rs. ") || value.startsWith("€ ")) {
                  const numericValue = parseFloat(
                    value.replace(/Rs\. |€ |-/g, "").replace(/,/g, "")
                  );
                  return isNaN(numericValue) ? value : numericValue;
                } else {
                  return value;
                }
              } else if (typeof value === "number") {
                return value;
              }
              // else if (value instanceof Date) {
              //   return value.getTime();
              // }
              return value;
            };
            const aValue = cleanValue(a[key]);
            const bValue = cleanValue(b[key]);

            if (typeof aValue === "string" && typeof bValue === "string") {
              return aValue.localeCompare(bValue);
            } else {
              return aValue - bValue;
            }
          },
          sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
          ellipsis: true,
        };
      }
    })
    .filter((column) => column !== null);

  return columns;
};
export default GenerateTableColumns;