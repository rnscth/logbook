import { useEffect } from "react"
import { Chart } from "chart.js";
import styles from './styles.module.css'

//@ts-ignore
export default function DoughnutChart({distribution}) {
    useEffect(() => {
        //@ts-ignore
        var ctx = document.getElementById(distribution.title).getContext('2d');
        var statusColor = {
            New : "rgb(255, 255, 255, 0.5)",  
            Reopen :  "rgb(128, 128, 128, 0.5)",
            Assigned : "rgb(230, 180, 0, 0.5)",
            Liberated : "rgb(2, 138, 15, 0.5)",
            Red : "rgb(239, 68, 68, 0.5)",
            Rejected : "rgb(100, 59, 159, 0.5)",
            Complete : "rgb(10, 17, 114, 0.5)",
        }
        var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(distribution.distr),
                datasets: [{
                    //@ts-ignore
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
    }, [])


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