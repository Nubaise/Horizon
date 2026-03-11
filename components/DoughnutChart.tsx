"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
        {
            label: "Banks",
            data: [1250.00, 500.00, 300.00], // Example data for each bank
            backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"]
        }
    ],
    labels: ["Bank A", "Bank B", "Bank C"] // Example labels for each bank
  }

  return (
    <Doughnut 
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
  )
}

export default DoughnutChart
