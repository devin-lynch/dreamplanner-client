import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Numeral from 'react-numeral'




ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
ChartJS.register(ChartDataLabels);

export default function MyDashboard({ expenses, budget, destinationId }) {
    const [data, setData] = useState({
        labels: ['Transportation', 'Lodging', 'Food', 'Activities', 'Miscellaneous'],
        datasets: [],
    })

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const optionsBar = {
        // maintainAspectRatio : false,
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },

        responsive: true,
        plugins: {
            datalabels: {
                display: true,
                formatter: function (value) {
                    return '$' + value.toLocaleString('en-US');
                }
            },
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Total Expenses VS Budget',
            },
        },
    };
    const options = {
        // maintainAspectRatio : false,
        responsive: true,
        plugins: {
            datalabels: {
                formatter: function (value, ctx) {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value * 100 / sum).toFixed(2)
                    if (percentage >= 1) {
                        return percentage + "%";
                    } else {
                        return ''
                    }
                },
                display: true,
            },
            legend: {
                position: 'left',
            },
            title: {
                display: false,
                text: 'Total Expenses by Category',
            },
        },
    };

    const labels = [''];

    const [totalData, setTotalData] = useState({
        labels,
        datasets: [],
    })

    useEffect(() => {

        const transportation = expenses.filter(expense => expense.category == 'transportation')
        const lodging = expenses.filter(expense => expense.category == 'lodging')
        const food = expenses.filter(expense => expense.category == 'food')
        const activities = expenses.filter(expense => expense.category == 'activities')
        const misc = expenses.filter(expense => expense.category == 'misc')

        const sumTrans = transportation.reduce((amount, expense) => amount + expense.amount, 0)

        const sumFood = food.reduce((amount, expense) => amount + expense.amount, 0)

        const sumLodging = lodging.reduce((amount, expense) => amount + expense.amount, 0)

        const sumActivities = activities.reduce((amount, expense) => amount + expense.amount, 0)

        const sumMisc = misc.reduce((amount, expense) => amount + expense.amount, 0)

        const totalExp = sumTrans + sumFood + sumLodging + sumActivities + sumMisc


        const datasetChange = [
            {
                label: 'Total Expenses by Category',
                data: [sumTrans, sumLodging, sumFood, sumActivities, sumMisc],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ]

        

        const totalDataChange = [{
            label: 'Total Expenses',
            data: labels.map(() => totalExp),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Budget',
            data: labels.map(() => budget),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        ]

        setData({ ...data, datasets: datasetChange })
        setTotalData({ ...totalData, datasets: totalDataChange })


    }, [expenses, destinationId])


    useEffect(() => {
        const handleResize = () => setWindowSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return _ => window.removeEventListener('resize', handleResize)
      }, [windowSize])
  
    const isWide = windowSize > 480


    return (
        <div className={`${isWide ? "flex justify-center" : "justify-center p-2"}`}>
            <div className="rounded-lg shadow-lg bg-stone-100 max-w-lg" style={{ margin: "1vw" }} >
                <div className="p-4">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">Expenses by Type</h5>
                    <div style={{ width: "w-5/6" }}>
                        <Doughnut options={options} data={data} />
                    </div>
                </div>
            </div>
            <div className="rounded-lg shadow-lg bg-stone-100 max-w-lg" style={{ margin: "1vw" }}>
                <div className="p-4">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">Total Expenses vs Budget</h5>
                    <div style={{ marginTop: "5rem", width: "w-5/6" }}>
                        <Bar options={optionsBar} data={totalData} />
                    </div>
                </div>
            </div>
        </div>
    )
}