import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useFetchVendors } from "../../hooks/useFetchVendors";
import { Spin } from "antd";

const BarChart = ({  year, category, city }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const { data, isLoading, isError } = useFetchVendors(
    `sales-amount-graph ${[category, city, year]}`,
    `/sales_amount_by_month_graph?year=${year}&category_filter=${category}&city_filter=${city}`
  );

  const convertToMillionOrBillion = (amount) => {
    if (amount >= 1000000000) {
        return Math.floor(amount / 1000000000) + " billion";
    } else if (amount >= 1000000) {
        return Math.floor(amount / 1000000) + " million";
    } else if (amount >= 100000) {
        return Math.floor(amount / 100000) + " lakh";
    } else if (amount >= 1000) {
        return Math.floor(amount / 1000) + " thousand";
    } else {
        return amount;
    }
};




  useEffect(() => {
    if (!isLoading) {
    const ctx = chartContainer.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
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
            tension: 0.4,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: "rgba(255, 255, 255, .8)",
            data: data?.map((item) => {
              // const updatedValue = convertToMillion(item.total_sales);
              // console.log("updated Value", updatedValue);
              return Math.round(item.total_sales)
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
          tooltip: {
            callbacks: {
                label: function(context) {
                    let value = context.raw;
                    return Math.round(value).toLocaleString();
                    // return convertToMillionOrBillion(value);
                }
            }
        }

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
              borderDash: [6, 6],
              color: "#636161",
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 500,
              beginAtZero: true,
              padding: 5,
              font: {
                size: 13,
                weight: 300,
                family: "Roboto",
                style: "normal",
                lineHeight: 1,
              },
              color: "#f5f5f5",
              callback: function(value, index, values) {
                return Math.round(value).toLocaleString();
                // return convertToMillionOrBillion(value);
            }
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: "#ffffff",
            },
            ticks: {
              display: true,
              color: "#f8f9fa",
              padding: 10,
              font: {
                size: 14,
                weight: 400,
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
      <div className="spinner-container mt-5">
        <Spin />
      </div>
    );
  }

  return (
      <canvas
        ref={chartContainer}
        className="chart-canvas"
        height="170"
      ></canvas>
  );
};

export default BarChart;
