import "./assets/style/App.scss";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coin";
import { createContext } from "react";
import ReactSwitch from "react-switch";
import day from './assets/image/day.png';
import night from './assets/image/night.png';

export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] =useState("dark");
  const toggleTheme = () => {
    setTheme((currtheme) => (currtheme ==="light" ? "dark" : "light"));
  }
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
        console.log(response.data.coins)
      }
    );
  }, []);

  const filteredCoins = listOfCoins.filter((coins) => {
    return coins.name.toLowerCase().includes(searchWord.toLowerCase())
  })

  const handleSearch = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <div className="coinHeader">
          <h1>Welcome to CryptoChecker</h1>
        </div>
        <div className="coinInputWrapper">
          <input
            className="coinInput"
            placeholder="Search Coin..."
            type="text"
            onChange={handleSearch}
          />
            {/* <input
                placeholder="Search for a Coin"
                type="text"
                onChange={(event) => {setSearchWord(event.target.value)}}
            /> */}
            <div className="buttonContainer">
              {/* <label>{theme ==="light" ? "Light Mode" : "Dark Mode"}</label> */}
              {/* <ReactSwitch onChange = {toggleTheme} checked= {theme === "dark"} /> */}
              <label className="switch">
                {/* <input type="checkbox" onChange = {toggleTheme} checked= {theme === "dark"} />
                <span className="slider round"></span> */}
                <img onClick = {toggleTheme}  src={theme ==="light" ? night : day} alt="img"/>
              </label>
            </div>
        </div>

        <div className="coinDisplay">
            {filteredCoins.map((coins) => {
            return (
              <Coin className="coinComponent"
                name={coins.name}
                icon={coins.icon}
                symbol={coins.symbol}
                price={coins.price}
              />
            )
            })}

        </div>
      </div>
    </ThemeContext.Provider>
    
  );
}

export default App;
