import { Line } from "react-chartjs-2";

import React from "react";
import { useTheme } from "../contexts/ThemeContextProvider";
import { ILineChart } from "../interfaces/ILineChart";

export const LineChart: React.FC<ILineChart> = ({
  label,
  isMiniature = false,
  labels = [],
  title,
  data = [],
  color,
  showLabels = true,
  showPoints = true,
}) => {
  const { theme } = useTheme();

  const processedData = (canvas) => {
    const ctx = canvas.getContext("2d");

    const gradient = !isMiniature
      ? ctx.createLinearGradient(0, 0, 0, 500)
      : ctx.createLinearGradient(0, 0, 0, 90);
    gradient.addColorStop(0, color + "50");
    gradient.addColorStop(1, color + "00");

    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, color);
    gradientStroke.addColorStop(0.4, color);

    ctx.height = 300;

    return {
      labels: labels.length > 1 ? labels : ["-", "-"],

      datasets: [
        {
          label: label,
          data:
            data.length > 1
              ? data
              : data.length > 0 && data.length < 2
              ? [data[0], data[0]]
              : [0, 0],
          fill: true,
          backgroundColor: gradient,
          // borderColor: "#736BF3",
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          tension: 0.1,
          borderWidth:
            data.length > 1 || (data.length > 0 && data.length < 2) ? 1 : 5,
        },
      ],
    };
  };
  return (
    <Line
      data={processedData}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: theme.textPrimaryDark,
                beginAtZero: true,
              },
              gridLines: {
                // color: theme.textPrimaryDark + "20",
                display: false,
              },
              display: isMiniature ? false : true,
              position: "right",
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                fontColor: theme.textPrimaryDark,
              },
              display: showLabels ? true : false,
            },
          ],
        },
        maintainAspectRatio: false,
        title: {
          display: showLabels ? true : false,
          text: title,
          fontColor: theme.textPrimary,
          align: "start",
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: theme.textPrimary,
          },
          display: false,
        },
        elements: {
          point: {
            hoverRadius: 6,
            radius: 0,
          },
        },
      }}
      width={305}
      height={220}
    />
  );
};
