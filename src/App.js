import { useState, useEffect } from "react";
import PayMoneyForCoin from "./conponents/coinToUSD";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [index, setIndex] = useState("-1");
  const onSelect = (event) => {
    setIndex(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => setCoins(json));
    setLoading(false);
  }, [coins]);
  return (
    <div>
      <h1 className="h1 ">Coin Converter</h1>
      {loading ? (
        <h1>Now Loading...</h1>
      ) : (
        <select onChange={onSelect}>
          {index === "-1" ? (
            <option value="-1">Choose what to convert</option>
          ) : (
            ""
          )}
          <option value="0">Money you have to pay to buy coins</option>
        </select>
      )}
      <hr />
      {index === "0" ? <PayMoneyForCoin coinsArray={coins} /> : null}
    </div>
  );
}

export default App;
