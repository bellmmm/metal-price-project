

import './App.css';
import useSWR from 'swr'
import React, { useState } from "react"



const fetcher = (url: string) => fetch(url).then(res => res.json())

function App() {

  const [date_index, setDateIndex] = useState(0)
  const doChangedate = (event: any) => {
    setDateIndex(event.target.value)
  }

  const { data, error } = useSWR(
    `https://data.nasdaq.com/api/v3/datasets/ODA/PIORECR_USD.json?start_date=2016-01-01&api_key=VJivxkw2oj1AJMb8DPgq`,
    fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log(data.dataset.data[0][1])
  console.log(data)

  let date_options:any= data.dataset.data.map(
    (element_value:any, element_index:any) =>  <option value={element_index}>{element_value[0]}</option>
  )

  console.log(date_options)

  return (
    <div className="App">
      <h1>鉄鉱石の価格({JSON.stringify(data.dataset.data[date_index][0])})は{JSON.stringify(data.dataset.data[date_index][1])}USD/tonです。
      </h1>
      <label htmlFor="date-select">Choose a date:</label>
      <select name="dates" id="date-select" onChange={doChangedate}>
        <option value="0">--Please choose an option--</option>
        {date_options}
      </select>
    </div >

  );
}
export default App;

