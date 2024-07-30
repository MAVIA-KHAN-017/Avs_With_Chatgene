import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useFetchVendors } from "../../hooks/useFetchVendors";
import { Spin } from "antd";

const LineChart = ({ year, category, city }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const { data, isLoading, isError } = useFetchVendors(
    `invoice-statistics-graph ${[category, city, year]}`,
    `/invoice_statistics?year=${year}&category_filter=${category}&city_filter=${city}`
  );

  useEffect(() => {
    if (!isLoading) {
      const ctx = chartContainer.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: category,
              tension: 0,
              borderWidth: 0,
              pointRadius: 6,
              pointBackgroundColor: "#232161",
              pointBorderColor: "transparent",
              borderColor: "#232161",
              borderWidth: 4,
              backgroundColor: "transparent",
              fill: true,
              data: data?.map((item) => {
                let propertyName = ""
                if(category === " " && city === " "){
                  propertyName = "Total_Invoices"
                }
                else if(category === " " && city !== " "){
                  propertyName = `${city}_Invoices`;
                }
                else {
                  propertyName = `${category}_Invoices`;
                }
                return item[propertyName];
              }),
              maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [7, 7],
                color: "#ebeaea",
              },
              ticks: {
                display: true,
                color: "#232161",
                padding: 10,
                font: {
                  size: 14,
                  weight: 600,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: "#232161",
                padding: 10,
                font: {
                  size: 14,
                  weight: 500,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spin />
      </div>
    );
  }

  return (
    <div className="chart">
      <canvas
        ref={chartContainer}
        id="chart-line"
        className="chart-canvas"
        height="170"
      ></canvas>
    </div>
  );
};

export default LineChart;
