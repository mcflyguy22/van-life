import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function IncomeChart(props) {
  const [chartData, setChartData] = useState(null)
  const currentMonth = dayjs().month()
  const prevMonth = currentMonth - 1
  const prevPrevMonth = prevMonth - 1
  console.log(currentMonth, prevMonth, prevPrevMonth)
  const currentMonthStr = dayjs().format('MMM')
  const prevMonthStr = dayjs().month(prevMonth).format('MMM')
  const prevPrevMonthStr = dayjs().month(prevPrevMonth).format('MMM')
  console.log(currentMonthStr, prevMonthStr, prevPrevMonthStr)

  function chartDataMap() {
    const chartDataArr = []
    const currentDict = {}
    const prevDict = {}
    const prevPrevDict = {}
    const month1 = props.data.reduce((n, {createdOn, orderTotal}) => (dayjs(createdOn).month() === currentMonth) ? n + Number(orderTotal): 0, 0)
    const month2 = props.data.reduce((n, {createdOn, orderTotal}) => (dayjs(createdOn).month() === prevMonth) ? n + Number(orderTotal): 0, 0)
    const month3 = props.data.reduce((n, {createdOn, orderTotal}) => (dayjs(createdOn).month() === prevPrevMonth) ? n + Number(orderTotal) : 0, 0)
    currentDict["Total"] = month1
    currentDict["Name"] = currentMonthStr
    prevDict["Total"] = month2
    prevDict["Name"] = prevMonthStr
    prevPrevDict["Total"] = month3
    prevPrevDict["Name"] = prevPrevMonthStr
    chartDataArr.push(prevPrevDict, prevDict, currentDict)
    console.log("dict: ", chartDataArr)
    setChartData(chartDataArr)
  }

  !chartData ? chartDataMap() : console.log(chartData)

  console.log("charData: ", chartData)
  console.log("propsData: ", props.data)

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6} style={{fontSize: "12px"}}>{`$${value}`}</text>;
  }

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip" style={{width: "150px", backgroundColor: "rgba(255, 255, 255, 0.8", paddingInline: "12px", borderRadius: "6px", boxShadow: "0 2px 4px rgb(0,0,0,0.2)"}}>
          <p className="label" style={{margin: "0", fontWeight: "bold", fontSize: "13px", textDecoration: "underline"}}>{`${label}: $${payload[0].value}`}</p>
          <p className="desc" style={{fontSize: "12px"}}>{`There were total sales of $${payload[0].value} in ${label}.`}</p>
        </div>
      );
    }
  
    return null;
  }
  
  return (
      <>
          <BarChart
            width={350}
            height={200}
            data={chartData}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" stroke="#dfdfdf" />
            <XAxis dataKey="Name" style={{fontSize: "12px"}} />
            <YAxis style={{fontSize: "12px"}} />
            <Tooltip content={<CustomTooltip />}/>
            <Bar
              dataKey="Total"
              fill="rgb(255, 120, 56)"
              label={renderCustomBarLabel}
              radius={[8, 8, 0, 0]}
              activeBar={<Rectangle fill="rgb(235, 100, 36)" stroke="rgb(255, 120, 56)" />}
            />
          </BarChart>
      </>
  )
}