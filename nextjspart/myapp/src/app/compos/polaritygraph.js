import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);




const PolarityGraph = ({ polarity }) => {
    const chartData = {
        labels: Array.from({ length: polarity.length }, (_, i) => i + 1),
        datasets: [
            {
                label: 'Polarity',
                data: polarity,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Polarity Over Sessions',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Sessions',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Polarity',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default PolarityGraph;