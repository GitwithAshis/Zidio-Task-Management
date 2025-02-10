import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const ProgressChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!data || !data.labels || !data.datasets) {
            console.error("Invalid data passed to ProgressChart:", data);
            return;
        }

        const ctx = chartRef.current.getContext("2d");

        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a new chart
        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.labels || [],
                datasets: data.datasets || [],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Task Progress",
                    },
                },
            },
        });

        return () => {
            // Cleanup on unmount
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default ProgressChart;
