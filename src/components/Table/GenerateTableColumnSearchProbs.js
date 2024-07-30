import { Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";


const GenerateTableColumnSearchProbs = (dataIndex, searchInput, searchFilter, setSearchFilter, tableResetBtnRef, searchedColumn, handleSearchIconClick, handleSearch, searchText, handleReset ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search record`}
          value={searchFilter}
          onChange={(e) => {
            setSearchFilter(e.target.value);
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={(e) => {
            handleSearch(
              e.target.value ? [e.target.value] : [],
              confirm,
              dataIndex
            );
            setSearchFilter(e.target.value);
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            ref={tableResetBtnRef}
            onClick={() => {
              clearFilters();
              confirm();
              handleReset(dataIndex);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        onClick={() => handleSearchIconClick(dataIndex)}
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  export default GenerateTableColumnSearchProbs;