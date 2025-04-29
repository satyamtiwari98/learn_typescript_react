import { useState } from "react";
import "./GeneratePassword.css";
import { API_URL } from "../../utils/Constant";
import ApiCall from "../../utils/ApiCall";

interface PasswordResponse {
  password: string;
}

const GeneratePassword = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [length, setLength] = useState<number>(12); // default length
  const [password, setPassword] = useState<string>("");

  const passwordOptions = [
    {
      name: "Length",
      type: "number",
    },
    {
      name: "Numbers",
      type: "boolean",
    },
    {
      name: "Symbols",
      type: "boolean",
    },
    {
      name: "Lowercase",
      type: "boolean",
    },
    {
      name: "Uppercase",
      type: "boolean",
    },
    {
      name: "Strict",
      type: "boolean",
    },
  ];

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions(
      (prevOptions) =>
        prevOptions.includes(option)
          ? prevOptions.filter((o) => o !== option) // remove
          : [...prevOptions, option] // add
    );
  };

  const handleGeneratePassword = async () => {
    const params = {
      length,
      numbers: selectedOptions.includes("Numbers"),
      symbols: selectedOptions.includes("Symbols"),
      uppercase: selectedOptions.includes("Uppercase"),
      lowercase: selectedOptions.includes("Lowercase"),
      strict: selectedOptions.includes("Strict"),
    };

    try {
      const res = await ApiCall<PasswordResponse>(
        API_URL + "/generate-password",
        "GET",
        params
      );
      setPassword(res.password);
    } catch (error) {
      console.error("Failed to fetch password:", error);
    }

    console.log(password);
  };

  return (
    <div className="generate-password-container">
      <div>
        <h4>Let's Generate Password</h4>
      </div>
      <div className="generate-password-options-container">
        <ul className="generate-password-list">
          {passwordOptions.map((option, index) => (
            <li key={index}>
              <span className="label-text">{option.name}</span>
              {option.type !== "boolean" ? (
                <input
                  className="list-input"
                  type="number"
                  value={length}
                  onChange={handleLengthChange}
                />
              ) : (
                <input
                  className="list-input"
                  type="checkbox"
                  onChange={() => handleOptionChange(option.name)}
                  checked={selectedOptions.includes(option.name)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button type="button" onClick={handleGeneratePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default GeneratePassword;
