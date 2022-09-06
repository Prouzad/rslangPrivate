import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react"
import { IProps, IUserWord } from '../../interfaces';
import { getUserWords } from '../../api';
import s from './Statistics.module.css'

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);


function Statistics({ userData }: IProps) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (userData) {
      getUserWords(userData?.userId, userData?.token)
        .then((res) => {
          setChartData(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [userData])

  const learnedFromSprint = (chartData as IUserWord[]).filter((item) => item.optional?.game?.sprint).length;
  const learnedFromAudioCall = (chartData as IUserWord[]).filter((item) => item.optional?.game?.audioCall).length;
  const percentAudioCall = (chartData as IUserWord[]).filter((item) => String(item.optional?.game?.sprint) === 'true').length * 100 / learnedFromSprint;
  const percentSprint = (chartData as IUserWord[]).filter((item) => String(item.optional?.game?.audioCall) === 'true').length * 100 / learnedFromAudioCall;
  const seriesAnswSprint = (chartData as IUserWord[]).filter((item) => item.optional?.largestSeriesCorAnswS).map((item) => {
    return Number(item.optional?.largestSeriesCorAnswS);
  });
  const largestSeriesCorAnswSprint = Math.max.apply(null, seriesAnswSprint);

  const arrAnswersAC = (chartData as IUserWord[]).reduce((newArr: number[], item) => {
    if (String(item.optional?.game?.sprint) === 'true' && item.optional?.largestSeriesCorAnswAC === 'label') {
      newArr.push(1)
    } else newArr.push(0)
    return newArr;
  }, [])

  let count = 0;
  let largestSeriesAudioCall = 0;
  for (let i = arrAnswersAC.length - 1; i > 0; i--) {
    if (arrAnswersAC[i] === 1 && arrAnswersAC[i - 1] === 1) count++;
    else if (largestSeriesAudioCall < count) largestSeriesAudioCall = count;
  }

  return (
    <div className={s.statisticsContainer}>
      <h2>Statistics at {new Date().toDateString()}</h2>
      <h3>Sprint</h3>
      <Bar
        className={s.statistic}
        data={{
          labels: ['Sprint'],
          datasets: [{
            label: 'number of learned words',
            data: [learnedFromSprint],
            backgroundColor: 'rgb(70, 111, 144)',
            borderRadius: 20,
          },
          {
            label: 'percent of right answers',
            data: [percentAudioCall],
            backgroundColor: 'rgb(115, 160, 195)',
            borderRadius: 20,
          },
          {
            label: 'the largest series of correct answers',
            data: [largestSeriesCorAnswSprint],
            backgroundColor: 'rgb(164, 215, 254)',
            borderRadius: 20,
          }]
        }}
      >
      </Bar>
      <h3>AudioCall</h3>
      <Bar
        className={s.statistic}
        data={{
          labels: ['AudioCall'],
          datasets: [{
            label: 'number of learned words',
            data: [learnedFromAudioCall],
            backgroundColor: 'rgb(70, 111, 144)',
            borderRadius: 20,
          },
          {
            label: 'percent of right answers',
            data: [percentSprint],
            backgroundColor: 'rgb(115, 160, 195)',
            borderRadius: 20,
          },
          {
            label: 'the largest series of correct answers',
            data: [largestSeriesAudioCall],
            backgroundColor: 'rgb(164, 215, 254)',
            borderRadius: 20,
          }]
        }}
      >
      </Bar>
    </div>
  )
}

export default Statistics