import { useState, useEffect } from "react";

function PayMoneyForCoin(props) {
  const coins = props.coinsArray;
  const [selectCoin, setSelectCoin] = useState(true);
  const [selectedCoinPrice, setSelectedCoinPrice] = useState(0);
  const [amount, setAmount] = useState();
  useEffect(() => {
    setSelectedCoinPrice(coins[0].quotes.USD.price);
    console.log(coins);
  }, [setSelectedCoinPrice]);
  const onCoinChange = (e) => {
    setSelectedCoinPrice(e.target.value);
    reset();
  };
  const reset = () => setAmount("");
  const onAmountChange = (e) => {
    setAmount(e.target.value);
    setSelectCoin(false);
  };
  const [inverted, setInverted] = useState(false);
  const onFlip = () => {
    reset();
    setInverted((current) => !current);
  };
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      <select onChange={onCoinChange}>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.quotes.USD.price}>
            {coin.name}({coin.symbol}:{Math.round(coin.quotes.USD.price)} USD)
          </option>
        ))}
      </select>
      <div>
        <div>
          <label htmlFor="selectedCoinCount">
            {!inverted
              ? "Set the number of coins to buy"
              : `Set the number of ${
                  amount <= 1 ? "doller" : "dollers"
                } to buy coins`}
          </label>
        </div>
        <div>
          <input
            onChange={onAmountChange}
            id="selectedCoinCount"
            value={amount}
          />
        </div>
        <div>
          <label htmlFor="selectedCoinPrice">
            {selectCoin
              ? "You have to pay 0$ for 0 coin."
              : !inverted
              ? `You have to pay ${
                  Math.round(selectedCoinPrice * amount * 100) / 100
                }$ for ${amount} ${
                  amount === 0 && amount === 1 ? "coin." : "coins."
                }`
              : `You can buy ${
                  Math.round((amount / selectedCoinPrice) * 100) / 100
                } ${
                  Math.round((amount / selectedCoinPrice) * 100) / 100 <= 1
                    ? "coin."
                    : "coins."
                }`}
          </label>
        </div>
        <div>
          <input
            onChange={onAmountChange}
            id="selectedCoinPrice"
            value={
              selectCoin
                ? ""
                : !inverted
                ? `${Math.round(selectedCoinPrice * amount * 100) / 100}$`
                : `${Math.round((amount / selectedCoinPrice) * 100) / 100} ${
                    Math.round((amount / selectedCoinPrice) * 100) / 100 <= 1
                      ? "coin."
                      : "coins."
                  }`
            }
            disabled={true}
          />
        </div>
      </div>
      <button onClick={onFlip}>{inverted ? "turn back" : "invert"}</button>
    </div>
  );
}

export default PayMoneyForCoin;
