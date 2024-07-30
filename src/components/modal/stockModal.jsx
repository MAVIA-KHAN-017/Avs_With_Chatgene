import React, { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import { useFetchVendors } from "../../hooks/useFetchVendors";
import CustomTable from "../Table/CustomTable";

function StockModal({
  setModal2Open,
  searchFields,
  modal2Open,
  vendorId: vendor_id,
  requestKey,
  url,
  searchUrl,
  setSpinLoading,
  spinLoading
}) {

  const [vendorSummaryPageNo, setVendorSummaryPageNo] = useState(1);
  const [summaryData, setSummaryData] = useState([])
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    setSummaryData([])
  },[vendor_id])

  const { data, isLoading } = useFetchVendors(
    `detailed_${requestKey} ,${[vendor_id, vendorSummaryPageNo]}`,
    `/${url}page=${vendorSummaryPageNo}&page_size=50`
  );

  useEffect(() => {
    if(data && !summaryData.includes(data[0])){
      if(data.length === 0){
        setLoadMore(false)
        setSpinLoading(false)
      }
      else {
      setSummaryData(pre => [...pre, ...data]);
      setSpinLoading(false);
      setLoadMore(true)
      }
    }
  },[data])

  const { data: detailSearchData, isLoading: detailSearchLoading } =
    useFetchVendors(`${url}_search, ${[searchFields]}`, `${searchUrl}`);

  return (
    <Modal
      title={`${requestKey} : ${vendor_id}`}
      centered
      open={modal2Open}
      onOk={() => {
        const [
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
        ] = searchFields;
        // setProductSearchField("");
        // setwareHouseSearchField("");
        // setCustomerSearchField("");
        // setInvoiceCodeSearchField("")
        // setInvoiceIdSearchField("")
        setSummaryData([]);
        setVendorSummaryPageNo(1)
        setSpinLoading(false);
        setModal2Open(false);
      }}
      onCancel={() => {
        const [
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
        ] = searchFields;
        // setProductSearchField("");
        // setwareHouseSearchField("");
        // setCustomerSearchField("");
        // setInvoiceCodeSearchField("")
        // setInvoiceIdSearchField("")
        setSummaryData([]);
        setVendorSummaryPageNo(1)
        setSpinLoading(false);
        setModal2Open(false);
      }}
      width={"80%"}
      height={"80%"}
    >
      <CustomTable
        data={
          searchFields[0] !== "" ||
          searchFields[4] !== "" ||
          searchFields[6] !== "" ||
          searchFields[8] !== ""
            ? detailSearchData
            : summaryData.length === 0 ? data : summaryData
        }
        searchFields={searchFields}
        loading={
          searchFields[0] !== "" ||
          searchFields[4] !== "" ||
          searchFields[6] !== "" ||
          searchFields[8] !== ""
            ? detailSearchLoading
            : isLoading
        }
        title={requestKey}
        setPageNo={setVendorSummaryPageNo}
        spinLoading={spinLoading}
        setSpinLoading={setSpinLoading}
        loadMore={loadMore}
      />
    </Modal>
  );
}

export default StockModal;
