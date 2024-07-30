import React, { useEffect, useState } from "react";
import { useFetchReceivables } from "../../hooks/useFetchReceivables";
import SingleStatisticsCard from "../../components/card/SingleStatisticsCard";

const RecievableCards = ({
  startDate,
  endDate,
  filteredCity,
  filteredCategory,
  filteredSegment,
}) => {
  const [cardTitle, setCardTitle] = useState("Receivables");

  useEffect(() => {
    if (filteredCategory !== " " && filteredCity !== " " ) {
      switch (filteredCity) {
        case "KHI":
          setCardTitle(`Receivables of Karachi and ${filteredCategory}`);
          break;
        case "ISL":
          setCardTitle(`Receivables of Islamabad and ${filteredCategory}`);
          break;
        case "LHR":
          setCardTitle(`Receivables of Lahore and ${filteredCategory}`);
          break;
        default:
          break;
      }
    }
    else if (filteredCategory !== " " ) {
      setCardTitle(`Receivables of ${filteredCategory}`);
    } else if (filteredCity !== " ") {
      switch (filteredCity) {
        case "KHI":
          setCardTitle(`Receivables of Karachi`);
          break;
        case "ISL":
          setCardTitle(`Receivables of Islamabad`);
          break;
        case "LHR":
          setCardTitle(`Receivables of Lahore`);
          break;
        default:
          break;
      }
    } else if (filteredSegment !== " ") {
      setCardTitle(`Receivables of ${filteredSegment}`);
    } else if (startDate === "" || startDate === " ") {
      setCardTitle("Today Receivables");
    } else {
      setCardTitle(`Receivables from ${startDate} to ${endDate}`);
    }
  }, [startDate, endDate, filteredCategory, filteredCity, filteredSegment]);
  const {
    data: receivableStartEndTodayData,
    isLoading: receivableStartEndTodayLoading,
    isError: receivableStartEndTodayError,
  } = useFetchReceivables(
    `receivableStartEndToday ${[startDate, endDate]}`,
    `/receivables_start_end_date_total?start_date=${
      startDate === "" ? "2024-05-22" : startDate
    }&end_date=${endDate === "" ? "2024-05-22" : endDate}`
  );

  const {
    data: totalReceivableWithFilterData,
    isLoading: totalReceivableWithFilterLoading,
    isError: totalReceivableWithFilterError,
  } = useFetchReceivables(
    `totalReceivableWithFilter ${[
      startDate,
      endDate,
      filteredCategory,
      filteredSegment,
      filteredCity,
    ]}`,
    `/total_receivables_with_filter?Category_Filter=${filteredCategory}&Segment=${filteredSegment}&City_Filter=${filteredCity}&start_date=${
      startDate === "" ? "" : startDate
    }&end_date=${endDate === "" ? "" : endDate}`
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
    data: receivableOverAllData,
    isLoading: receivableOverAllLoading,
    isError: receivableOverAllError,
  } = useFetchReceivables(
    `total-over-all-receivables`,
    `/receivables_overall_total`
  );
  // const {
  //   data: totalReceivableByCityData,
  //   isLoading: totalReceivableByCityLoading,
  //   isError: totalReceivableByCityError,
  // } = useFetchReceivables(
  //   `total-receivable-by-city, ${filteredCity}`,
  //   `/total_receivables_by_city?city_filter=${
  //     filteredCity === " " ? "KHI" : filteredCity
  //   }`
  // );
  // const {
  //   data: totalReceivableByCategoryData,
  //   isLoading: totalReceivableByCategoryLoading,
  //   isError: totalReceivableByCategoryError,
  // } = useFetchReceivables(
  //   `total-receivable-by-category, ${filteredCategory}`,
  //   `/total_receivables_by_category?category_filter=${
  //     filteredCategory === " " ? "Rice" : filteredCategory
  //   }`
  // );
  // const {
  //   data: totalReceivableBySegmentData,
  //   isLoading: totalReceivableBySegmentLoading,
  //   isError: totalReceivableBySegmentError,
  // } = useFetchReceivables(
  //   `total-receivable-by-segment, ${filteredSegment}`,
  //   `/total_receivables_by_segment?segment_filter=${
  //     filteredSegment === " " ? "AT-KHI" : filteredSegment
  //   }`
  // );

  return (
    <div>
      <div className="row">
        {/* Receiable Start and End date Total today Card */}
        <SingleStatisticsCard
          data={
            filteredCity !== " " ||
            filteredCategory !== " " ||
            filteredSegment !== " "
              ? totalReceivableWithFilterData &&
                totalReceivableWithFilterData[0]
              : startDate === " " || startDate === ""
              ? receivableTodayStatisticsData
              : receivableStartEndTodayData
          }
          loading={
            filteredCity !== " " ||
            filteredCategory !== " " ||
            filteredSegment !== " "
              ? totalReceivableWithFilterLoading
              : startDate === " " || startDate === ""
              ? receivableTodayLoading
              : receivableStartEndTodayLoading
          }
          error={receivableStartEndTodayError}
          title={cardTitle}
          icon={"fence"}
          queryField={["total_net_amount", "total_receivables_amount"]}
        />
        {/* Receiable Start and End date Total today Card */}
        {/* <SingleStatisticsCard
          data={
            filteredCity !== " "
              ? totalReceivableByCityData
              : filteredCategory !== " "
              ? totalReceivableByCategoryData
              : filteredSegment !== " "
              ? totalReceivableBySegmentData
              : receivableOverAllData
          }
          loading={
            filteredCity !== " "
              ? totalReceivableByCityLoading
              : filteredCategory !== " "
              ? totalReceivableByCategoryLoading
              : filteredSegment !== " "
              ? totalReceivableBySegmentLoading
              : receivableOverAllLoading
          }
          error={receivableOverAllError}
          title={`Overall Total Receivables`}
          icon={"auto_awesome_motion"}
          queryField={["total_net_amount", "total_receivables_amount"]}
        /> */}
        <SingleStatisticsCard
          data={receivableOverAllData}
          loading={receivableOverAllLoading}
          error={receivableOverAllError}
          title={`Total Receivables`}
          icon={"auto_awesome_motion"}
          queryField={["total_net_amount", "total_receivables_amount"]}
        />
      </div>
    </div>
  );
};

export default RecievableCards;
