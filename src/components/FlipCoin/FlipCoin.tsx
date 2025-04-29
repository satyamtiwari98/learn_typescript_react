import React, { useState } from "react";
import "./FlipCoin.css";

type CoinSide = "Heads" | "Tails";

const getRandomSide = (): CoinSide => {
  return Math.random() < 0.5 ? "Heads" : "Tails";
};

const FlipCoin: React.FC = () => {
  const [result, setResult] = useState<CoinSide | null>(null);
  const [flipping, setFlipping] = useState(false);

  const handleFlip = () => {
    setFlipping(true);
    setTimeout(() => {
      const newResult = getRandomSide();
      setResult(newResult);
      setFlipping(false);
    }, 1000); // Simulate flipping animation delay
  };

  return (
    <div className="container">
      <h1>Flip the Coin</h1>
      <div className="coin">
        {flipping ? "Flipping..." : result ?? "Click to flip"}
      </div>
      <button onClick={handleFlip} disabled={flipping} type="button">
        {flipping ? "Flipping..." : "Flip Coin"}
      </button>
    </div>
  );
};

export default FlipCoin;
