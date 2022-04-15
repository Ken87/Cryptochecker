import React from 'react'
import "./coin.css";

function Coin ({ 
  name, 
  icon, 
  price, 
  symbol, 
}) {
  return (
    <div className='coinDisplay'>
      <div className='coinComponent'>
        <img className="coinIcon" src={icon} alt="coinicon"/>
        <h1 className='coinTitle'>{name}</h1>
        <h3 className='coinSymbol'>{symbol}</h3>
        <h3 className='coinPrice'>{price}</h3>
    </div>
    </div>
  )
}

export default Coin