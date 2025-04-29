import { useEffect, useState } from "react";
import GeneratePassword from "../GeneratePassword/GeneratePassword";
import "./Utils.css";
import FlipCoin from "../FlipCoin/FlipCoin";

const Utils = () => {
  const [selectedAccordian, setSelectedAccordian] = useState<string | null>(
    null
  );
  const btns = [
    {
      name: "Generate Password",
      id: "GP",
    },
    {
      name: "Flip Coin",
      id: "FC",
    },
    {
      name: "Anything Password",
      id: "AP",
    },
  ];

  useEffect(() => {
    setSelectedAccordian(btns[0]?.id);
  }, []);

  const handleChangeAccordian = (acc: string) => {
    setSelectedAccordian(acc);
  };
  return (
    <>
      <div className="utils-container">
        <div className="utils-btns">
          {btns.map((btn) => (
            <button
              className={selectedAccordian === btn.id ? "btn active" : "btn"}
              key={btn.id}
              type="button"
              onClick={() => handleChangeAccordian(btn.id)}
            >
              {btn.name}
            </button>
          ))}
        </div>
      </div>
      <div className="utils-accordian">
        {selectedAccordian === "GP" && <GeneratePassword />}
        {selectedAccordian === "FC" && <FlipCoin />}
      </div>
    </>
  );
};

export default Utils;
