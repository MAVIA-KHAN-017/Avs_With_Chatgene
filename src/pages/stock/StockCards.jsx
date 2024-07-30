import React, { useEffect, useState } from "react";
import SingleStatisticsCard from "../../components/card/SingleStatisticsCard";
import { useFetchStock} from "../../hooks/useFetchStock";


const StockCards = ({filter}) => {
    const [totalRecord, setTotalRecord] = useState("Total_number_of_Invoices");

    useEffect(() => {
        if (filter[0] === " " && filter[1] === " ") {
          setTotalRecord("Total_number_of_Invoices");
        } else if (filter[0] === " " && filter[1] !== " ") {
          setTotalRecord(filter[1]+"_Invoices");
        } else if (filter[0] !== " " && filter[1] !== " ") {
          setTotalRecord("Total_number_of_Invoices");
        } else {
          setTotalRecord(filter[0]+"_Invoices");
        }
      }, [filter[0], filter[1]]);
    const {
        data: totalInvoicesData,
        isLoading: totalInvoicesLoading,
        isError: totalInvoicesError,
      } = useFetchStock(
        `total-invoices-statistics ${filter}`,
        `/invoice_KPI_statistics?category_filter=${filter[0]}&city_filter=${filter[1]}&start_date=${filter[2]}&end_date=${filter[3]}`
      );

      const {
        data: todayTotalInvoicesData,
        isLoading: todayTotalInvoicesLoading,
        isError: todayTotalInvoicesError,
      } = useFetchStock(
        `today-total-invoices`,
        `/today_total_invoices`
      );

  return (
    <div>
      <div className="row">
        {/* Total Invoices card*/}
        <SingleStatisticsCard
          data={totalInvoicesData}
          loading={totalInvoicesLoading}
          error={totalInvoicesError}
          title={"Total Invoices"}
          icon={"fence"}
          queryField={totalRecord}
        />
        {/* Today Total Invoices card */}
        <SingleStatisticsCard
          data={todayTotalInvoicesData}
          loading={todayTotalInvoicesLoading}
          error={todayTotalInvoicesError}
          title={"Today Total Invoices"}
          icon={"auto_awesome_motion"}
          queryField={"total_invoices"}
        />
      </div>
    </div>
  );
};

export default StockCards;
