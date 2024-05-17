import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale, 
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const BarGraph= ({data})=>{

    const options ={}

    

    return <Bar options={options}  data={data} />
}