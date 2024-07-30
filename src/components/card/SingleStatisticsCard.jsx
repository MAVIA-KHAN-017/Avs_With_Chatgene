import { Spin } from "antd";
import React, { useEffect, useState } from "react";

const SingleStatisticsCard = ({
  data,
  loading,
  error,
  title,
  icon,
  queryField,
}) => {
  const [queryData, setQueryData] = useState([])
  const [query, setQuery] = useState(queryField);
  useEffect(() => {
    if (Array.isArray(data) && data.length === 1 && typeof data[0] === 'object') {
      setQueryData(data[0]);
    }
    else {
      setQueryData(data)
    }
  },[data])

  return (
    <div className="col-xl-6 col-sm-6 mb-xl-0 mb-4">
      <div className="card" style={{ minHeight: "80px"}}>
        <div className="card-header p-3 pt-2">
          <div className="icon icon-lg icon-shape card-gradient-background shadow-dark text-center border-radius-xl mt-n4 position-absolute">
            <i className="material-icons opacity-10">{icon}</i>
          </div>
          <div className="text-end pt-1 card-spinner-container">
            <span className="text-md mb-0 text-capitalize text-bold">{title}</span>
            {loading ? (
              <Spin />
            ) : (
              typeof queryField === "string" ? (
              <div className="d-flex justify-content-end align-items-center">
              <h5 className="mb-0">
                {typeof(queryData) === "object" && queryData ? Math.round(queryData?.[queryField]).toLocaleString() : "0"}
              </h5>
            </div> ) :
              <div className="">
                <div className="d-flex justify-content-end align-items-center">
                  <p className="text-sm mb-0 text-capitalize me-1">
                    Total Net Amounts:
                  </p>
                  <h5 className="mb-0">
                    {data ? Math.round(data[query[0]]).toLocaleString() : 0}
                  </h5>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <p className="text-sm mb-0 text-capitalize me-1">
                    Total Receivables:
                  </p>
                  <h5 className="mb-0">
                    {data ? Math.round(data[query[1]]).toLocaleString() : 0}
                  </h5>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <hr className="dark horizontal my-0" /> */}
      </div>
    </div>
  );
};

export default SingleStatisticsCard;
