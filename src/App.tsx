

import './App.css';
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

function App() {

    const { data, error } = useSWR(
      `https://data.nasdaq.com/api/v3/datasets/ODA/PIORECR_USD.json?start_date=2016-01-01&api_key=VJivxkw2oj1AJMb8DPgq`,
      fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    // let results = {
  //     : data.location.country,
  //     cityName: data.location.name,
  //     temperature: data.current.temp_c,
  //     conditionText: data.current.condition.text,
  //     icon: data.current.condition.icon
    // }

  return (
    <div className="App">
      <h1>こんにちは{JSON.stringify(data)}</h1>

    </div>
  );
}
export default App;
