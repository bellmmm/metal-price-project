

import './App.css';
import useSWR from 'swr'
import React, { useState } from "react"



const fetcher = (url: string) => fetch(url).then(res => res.json())

function App() {

  const [date_index, setDateIndex] = useState(0)
  const doChangedate = (event: any) => {
    setDateIndex(event.target.value)
  }
  const [oreratio, setOreratio] = useState(0)
  const doChangeoreratio = (event:any)=> {
    setOreratio(event.target.value)
  }
  const [oreyield, setOreyield] = useState(0)
  const doChangeoreyield = (event:any)=> {
    setOreyield(event.target.value)
  }
  const [coalratio, setCoalratio] = useState(0)
  const doChangecoalratio = (event:any)=> {
    setCoalratio(event.target.value)
  }
  const [coalyield, setCoalyield] = useState(0)
  const doChangecoalyield = (event:any)=> {
    setCoalyield(event.target.value)
  }

  const { data:ore_data, error:ore_error } = useSWR(
    `https://data.nasdaq.com/api/v3/datasets/ODA/PIORECR_USD.json?start_date=2016-01-01&api_key=VJivxkw2oj1AJMb8DPgq`,
    fetcher)

  const { data:coal_data, error:coal_error } = useSWR(
    `https://data.nasdaq.com/api/v3/datasets/ODA/PCOALAU_USD.json?api_key=VJivxkw2oj1AJMb8DPgq`,
    fetcher)

  if (ore_error || coal_error) return <div>failed to load</div>
  if (!ore_data || !coal_data) return <div>loading...</div>


  console.log(ore_data.dataset.data[0][1])
  console.log(ore_data)

  let date_options:any= ore_data.dataset.data.map(
    (element_value:any, element_index:any) =>  <option value={element_index}>{element_value[0]}</option>
  )

  console.log(date_options)

　function tansokou (
    price1:number,
    ratio1:number,
    yield1:number,
    price2:number,
    ratio2:number,
    yield2:number){
    return price1*ratio1/100*100/yield1+price2*ratio2/100*100/yield2
  }



  function orgRound(price_value:number, base:number){
    return (Math.round(price_value*base)/base).toFixed(1)
  }



  return (
    <div className="App">
      <header>
        <h1>鋼材価格計算ツール</h1>
        <p>日付を選択すると、鋼材の想定単価を調べることができます。</p>
      </header>
      <main>
        <label htmlFor="date-select">Choose a date:</label>
        <select name="dates" id="date-select" onChange={doChangedate}>
         <option value="0">--Please choose an option--</option>
          {date_options}
        </select>
      
        <p>日付：{ore_data.dataset.data[date_index][0]}</p>
        <p>鉄鉱石の価格</p>
        <p>{orgRound(ore_data.dataset.data[date_index][1],10)}USD/ton</p>
        <p>＊鉄鉱石の価格ソースは<a href="https://data.nasdaq.com/data/ODA/PIORECR_USD-china-import-iron-ore-fines-62-fe-spot-cfr-tianjin-port-us-dollars-per-metric-ton">China Inport Iron Ore</a>を参照しています。</p>
        <p>石炭の価格</p>
        <p>{orgRound(coal_data.dataset.data[date_index][1],10)}USD/ton</p>
        <p>＊石炭の価格ソースは<a href="https://data.nasdaq.com/data/ODA/PCOALAU_USD-coal-australian-thermal-coal-12000-btupound-less-than-1-sulfur-14-ash-fob-newcastleport-kembla-us-per-metric-ton">Coal; Australian thermal coal</a>を参照しています。</p>
        <p>鋼材の価格</p>
        <form>
          <p><label htmlFor="鉄鉱石割合">鉄鉱石の割合(%)</label>
             <input type="number" name="割合" id="鉄鉱石割合" onChange={doChangeoreratio}/>％
          </p>
          <p><label htmlFor="鉄鉱石歩留まり">鉄鉱石の歩留まり(%)</label>
             <input type="number" name="割合" id="鉄鉱石歩留まり" onChange={doChangeoreyield}/>％
          </p>
          <p><label htmlFor="石炭割合">石炭の割合(%)</label>
             <input type="number" name="割合" id="石炭割合" onChange={doChangecoalratio}/>％
          </p>
          <p><label htmlFor="石炭歩留まり">石炭の歩留まり(%)</label>
             <input type="number" name="割合" id="石炭歩留まり" onChange={doChangecoalyield}/>％
          </p>
          <p>
            鋼材価格は：
            {
              orgRound(
                tansokou(
                  ore_data.dataset.data[date_index][1],
                  oreratio,
                  oreyield,
                  coal_data.dataset.data[date_index][1],
                  coalratio,
                  coalyield),
                10
              )
            }USD/ton
          </p>
          <p>計算式：[鉄鉱石の価格 ｘ {'{'}鉄鉱石の割合(％)÷100{'}'} ÷ {'{'}鉄鉱石の歩留まり(％)÷100{'}'}]　＋　[石炭の価格 ｘ {'{'}石炭の割合(％)÷100{'}'} ÷ {'{'}石炭の割合(％)÷100{'}'}]</p>
          
          {/* <p>鉄鉱石の歩留まり(%)：<input type="number"/>％</p>
          <p>石炭の割合(%)：<input type="number"/>％</p>
          <p>石炭の歩留まり(%)：<input type="number"/>％</p>
        </form>
        <p>{orgRound(tansokou(date_index),10)}</p> */}
        </form>
      </main>
    </div >

  );
}
export default App;

// 配列とオブジェクトの分割代入(Java Acript)
// useStateとuseSWRの時にどうするか(React)　名前を変えたいときどうするか
// Hookの呼び出す順番（React）
// コンポーネントの描写の仕組み(React)
// デザインを洗練させる