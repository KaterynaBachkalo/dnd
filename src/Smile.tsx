import React from "react";
import { ICard } from "./App";

export interface IData {
  data: ICard;
}

const Smile: React.FC<IData> = ({ data }) => {
  return <div className="smile">{data.content}</div>;
};

export default Smile;
