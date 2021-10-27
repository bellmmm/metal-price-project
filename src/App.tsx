

import './App.css';
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

function App() {

  const { data, error } = useSWR(
    `https://data.nasdaq.com/api/v3/datasets/ODA/PIORECR_USD.json?start_date=2016-01-01&api_key=VJivxkw2oj1AJMb8DPgq`,
    fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log(data.dataset.data[0][1])
  console.log(data)




  // let results = {
  //     : data.location.country,
  //     cityName: data.location.name,
  //     temperature: data.current.temp_c,
  //     conditionText: data.current.condition.text,
  //     icon: data.current.condition.icon
  // }

  return (
    <div className="App">
      <h1>鉄鉱石の価格({JSON.stringify(data.dataset.data[0][0])})は{JSON.stringify(data.dataset.data[0][1])}USD/tonです。
      </h1>
      <form>
        <div className="form-group">
          <label htmlFor="id">日付</label>
          <input type="text" className="form" id="id">
          </input>
        </div>

      </form>

    </div >

  );
}
export default App;

