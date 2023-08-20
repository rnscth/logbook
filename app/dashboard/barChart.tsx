import { useEffect } from "react"
import { Chart } from "chart.js";
import styles from './styles.module.css'

//@ts-ignore
export default function BarChart({distribution}) {
    useEffect(() => {
        //@ts-ignore
        const sortedArray = Object.entries(distribution.distr).sort((a, b) => b[1] - a[1]).map(([key, value]) => [key.toUpperCase(), value]);
        const sortedDistr = Object.fromEntries(sortedArray);
        var statusColor = {
            New : "rgb(255, 255, 255, 0.8)",  
            Reopen :  "rgb(128, 128, 128, 0.8)",
            Assigned : "rgb(230, 180, 0, 0.8)",
            Liberated : "rgb(2, 138, 15, 0.8)",
            Red : "rgb(239, 68, 68, 0.8)",
            Rejected : "rgb(100, 59, 159, 0.8)",
            Complete : "rgb(10, 17, 114, 0.8)",
        }
        //@ts-ignore
        var ctx = document.getElementById(distribution.title).getContext('2d');
        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(sortedDistr),
                datasets: [{
                    //@ts-ignore
                    data: Object.values(sortedDistr),
                    label:   "Orders",
                    borderColor: "rgb(140, 169, 184)",
                    backgroundColor: "rgb(140, 169, 184,0.8)",
                    borderWidth: 2,
                    options: {
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      },
                }, 
                ]
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
