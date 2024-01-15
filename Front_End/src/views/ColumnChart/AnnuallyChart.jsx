import React from 'react'
import ReactApexChart from 'react-apexcharts';

function AnnuallyChart({ dataColors, periodData }) {
    const options = {
        chart: {
          stacked: !0,
          toolbar: {
            show: 1
          },
          zoom: {
            enabled: !0
          }
        },
        plotOptions: {
          bar: {
            horizontal: !1,
            columnWidth: "15%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: !1
        },
        xaxis: {
          show: true,
          categories: [
            "2023",
            "2024",
            "2025",
            "2026",
            "2027",
            "2028",
            "2029",
            "2030",
            "2031",
            "2032",
            "2033",
            "2034"
          ],
          labels: {
            show: true
          }
        },
        colors: dataColors,
        legend: {
          position: "bottom"
        },
        fill: {
          opacity: 1
        }
      }
    
      return (
        <>
          <ReactApexChart
            options={options}
            series={[...periodData]}
            type="line"
            height="359"
            className="apex-charts"
          />
        </>
    
      )
}


export default AnnuallyChart