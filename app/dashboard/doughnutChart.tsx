import { useEffect } from "react"
import { Chart } from "chart.js";
import styles from './styles.module.css'

interface ChartDistribution {
    title: string;
    distr: Record<string, number>;
}

interface DoughnutChartProps {
    distribution: ChartDistribution;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ distribution }) => {
    useEffect(() => {
        var canvasElement = (document.getElementById(distribution.title) as HTMLCanvasElement);
        var statusColor = {
            New : "rgb(255, 255, 255)",  
            Reopen :  "rgb(128, 128, 128)",
            Assigned : "rgb(230, 180, 0)",
            Liberated : "rgb(2, 138, 15)",
            NC : "rgb(239, 68, 68)",
            NCR : "rgb(239, 68, 68)",
            PL : "rgb(239, 68, 68)",
            DN : "rgb(239, 68, 68)",
            Complete : "rgb(10, 17, 114)",
            Rejected : "rgb(100, 59, 159)",
            
        }

        const upperDistrt: Record<string, number> = {};
        for (const [key, value] of Object.entries(distribution.distr)) {
        upperDistrt[key.toUpperCase()] = value as number;
        }

        console.log(upperDistrt);
        var myDoughnutChart = new Chart(canvasElement, {
            type: 'doughnut',
            data: {
                labels: Object.keys(upperDistrt),
                datasets: [{
                    data: Object.values(distribution.distr),
                    borderColor: Object.values(statusColor),
                    backgroundColor: Object.values(statusColor),
                    borderWidth: 2,
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false,
                    }],
                }
            },

        });
    }, [distribution])


    return (
        <div className={styles.chartBox}>
            <div className={styles.chartTitleBox}>
                <p className={styles.charTitle}>{distribution.title}</p>
            </div>
            <div className={styles.canvasBox}>
                <canvas id={distribution.title}></canvas>
            </div>
        </div>
    )
}

export default DoughnutChart;