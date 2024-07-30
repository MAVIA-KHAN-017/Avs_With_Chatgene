import React, { useEffect, useState } from "react";
import { useFetchVendors } from "../../hooks/useFetchVendors";
import { Spin } from "antd";
import { useFetchReceivables } from "../../hooks/useFetchReceivables";

const StatisticsCard = ({ filter }) => {
  const [totalRecord, setTotalRecord] = useState("Total_number_of");

  useEffect(() => {
    if (filter[0] === " " && filter[1] === " ") {
      setTotalRecord("Total_number_of");
    } else if (filter[0] === " " && filter[1] !== " ") {
      setTotalRecord(filter[1]);
    } else if (filter[0] !== " " && filter[1] !== " ") {
      setTotalRecord("Total_number_of");
    } else {
      setTotalRecord(filter[0]);
    }
  }, [filter[0], filter[1]]);
  const {
    data: todayTotalInvoicesData,
    isLoading: todayTotalInvoicesLoading,
    isError: todayTotalInvoicesError,
  } = useFetchVendors(
    `today-total-invoices`,
    `/today_total_invoices`
  );

  const {
    data: receivableTodayStatisticsData,
    isLoading: receivableTodayLoading,
    isError: receivableToday,
  } = useFetchReceivables(
    `receivabletoday-statistics`,
    `/receivables_today_total
  `
  );

  const {
    data: todayTotalproductStatisticsData,
    isLoading: productLoading,
    isError: productError,
  } = useFetchVendors(
    `product-statistics`,
    `/today_total_product_sales`
  );

  const {
    data: saleStatisticsData,
    isLoading: saleLoading,
    isError: saleError,
  } = useFetchVendors(
    `sale-statistics ${[filter[2], filter[3]]}`,
    `/sales_growth?current_year=${filter[3].slice(
      0,
      4
    )}&previous_year=${filter[2].slice(0, 4)}`
  );

  return (
    <div className="row">
      <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div className="card" style={{ minHeight: "80px"}}>
          <div className="card-header p-3 pt-2">
            <div className="icon icon-lg icon-shape card-gradient-background shadow-dark text-center border-radius-xl mt-n4 position-absolute">
              <i className="material-icons opacity-10">weekend</i>
            </div>
            <div className="text-end pt-1">
              <p className="text-sm mb-0 text-capitalize text-bold">Today Total Invoices</p>
              <h4 className="mb-0">
                {todayTotalInvoicesLoading ? (
                  <Spin />
                ) : (
                  todayTotalInvoicesData ?
                  (todayTotalInvoicesData?.["total_invoices"]).toLocaleString() : 0
                )}
              </h4>
            </div>
          </div>
          {/* <hr className="dark horizontal my-0" /> */}
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div className="card" style={{ minHeight: "80px"}}>
          <div className="card-header p-3 pt-2">
            <div className="icon icon-lg icon-shape card-gradient-background shadow-primary text-center border-radius-xl mt-n4 position-absolute">
              <i className="material-icons opacity-10">layers</i>
            </div>
            <div className="text-end pt-1"> 
              <p className="text-sm mb-0 text-capitalize text-bold">Today Total Receivables</p>
              <h4 className="mb-0">
                {receivableTodayLoading ? (
                  <Spin />
                ) : (
                  receivableTodayStatisticsData ?
                  Math.round(receivableTodayStatisticsData?.total_net_amount).toLocaleString() : 0
                )}
              </h4>
            </div>
          </div>
          {/* <hr className="dark horizontal my-0" /> */}
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div className="card" style={{ minHeight: "80px"}}>
          <div className="card-header p-3 pt-2">
            <div className="icon icon-lg icon-shape card-gradient-background shadow-success text-center border-radius-xl mt-n4 position-absolute">
              <i className="material-icons opacity-10 ">sell</i>
            </div>
            <div className="text-end pt-1">
              <p className="text-sm mb-0 text-capitalize text-bold">Today Total Products</p>
              <h4 className="mb-0">
                {productLoading ? (
                  <Spin />
                ) : (
                  todayTotalproductStatisticsData ?
                  (todayTotalproductStatisticsData?.total_products.toLocaleString()
                ): 0)}
              </h4>
            </div>
          </div>
          {/* <hr className="dark horizontal my-0" /> */}
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="card" style={{ minHeight: "80px"}}>
          <div className="card-header p-3 pt-2">
            <div className="icon icon-lg icon-shape card-gradient-background shadow-info text-center border-radius-xl mt-n4 position-absolute">
              <i className="material-icons opacity-10">inventory</i>
            </div>
            <div className="text-end pt-1">
              <p className="text-sm mb-0 text-capitalize text-bold">Sales growth</p>
              <h4 className="mb-0">
                {saleLoading ? (
                  <Spin />
                ) : saleStatisticsData ?
                  saleStatisticsData?.sales_growth_percentage === 100 ? (
                  "100%"
                ) : (
                  saleStatisticsData && (saleStatisticsData.sales_growth_percentage).toFixed(2) + "%"
                ): 0}
              </h4>
            </div>
          </div>
          {/* <hr className="dark horizontal my-0" /> */}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
