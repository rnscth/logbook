import { useEffect } from "react"
import { Chart, ChartOptions } from "chart.js";
import styles from './styles.module.css'

interface UserDistribution {
    title: string;
    distr: Record<string, number>;
}

interface BarChartProps {
    distribution: UserDistribution;
}

const BarChart: React.FC<BarChartProps> = ({ distribution }) => {
    useEffect(() => {
        const sortedArray = Object.entries(distribution.distr).sort((a, b) => b[1] - a[1]).map(([key, value]) => [key.toUpperCase(), value]);
        const sortedDistr: UserDistribution = Object.fromEntries(sortedArray);
        const chartOptions: ChartOptions =  {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        var canvasElement = (document.getElementById(distribution.title) as HTMLCanvasElement);
        var myBarChart = new Chart(canvasElement, {
            type: 'bar',
            data: {
                labels: Object.keys(sortedDistr),
                datasets: [{
                    data: Object.values(sortedDistr),
                    label: "Orders",
                    borderColor: "rgb(140, 169, 184)",
                    backgroundColor: "rgb(140, 169, 184,0.8)",
                    borderWidth: 2,
                }],
            },
            options : chartOptions
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

export default BarChart;