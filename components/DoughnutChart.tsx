"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts?.map((account) => account.name);
  const balances = accounts?.map((account) => account.currentBalance);

  const colors = [
    '#0747b6', // dark blue
    '#2265d8', // medium blue
    '#2f91fa', // light blue
    '#1a56c4', // blue 4
    '#3b7de8', // blue 5
    '#5a9ef5', // blue 6
    '#0a3d8f', // deep navy
    '#4aaaf7', // sky blue
  ];

  const backgroundColors = accounts?.map((_, index) => 
    colors[index % colors.length]
  );

  const data = {
    datasets: [
      {
        label: 'Banks',
        data: balances,
        backgroundColor: backgroundColors
      }
    ],
    labels: accountNames
  }

  return <Doughnut 
    data={data} 
    options={{
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        }
      }
    }}
  />
}

export default DoughnutChart