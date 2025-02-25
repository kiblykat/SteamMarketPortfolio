import axios from "axios";
import { Request, Response } from "express";

export const getCasePrices = async (req: Request, res: Response) => {
  try {
    const fractureCaseResponse = await axios.get(
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=176185874"
    );
    const prismaCaseResponse = await axios.get(
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=176042493"
    );
    const clutchCaseResponse = await axios.get(
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=175966708"
    );
    res.status(200).json({
      fractureCase: fractureCaseResponse.data.highest_buy_order,
      prismaCase: prismaCaseResponse.data.highest_buy_order,
      clutchCase: clutchCaseResponse.data.highest_buy_order,
    }); // highest_buy_order is the price of the most expensive buy order
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
