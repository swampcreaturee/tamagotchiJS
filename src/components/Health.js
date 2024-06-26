import React from "react";
import useTamagotchi from "../app/StateContext";

export const Health = () => {
    const { name, hp, age } = useTamagotchi();
  
    return (
      <div id='logGroup'>
        <span>{name} Health: {hp}</span>
        <br></br>
        <span>Age: {age}</span>
      </div>
    )
}