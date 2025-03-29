import axios from "axios";
import { Request, Response } from "express";

export const getCasePrices = async (req: Request, res: Response) => {
  //why does this function get called twice?
  try {
    const fractureCaseResponse = await axios.get(
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Fracture%20Case"
    );
    const prismaCaseResponse = await axios.get(
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Prisma%202%20Case"
    );
    const clutchCaseResponse = await axios.get(
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Clutch%20Case"
    );
    res.status(200).json({
      fractureCase: parseFloat(fractureCaseResponse.data.median_price.replace("S$","")),
      prismaCase: parseFloat(prismaCaseResponse.data.median_price.replace("S$","")),
      clutchCase: parseFloat(clutchCaseResponse.data.median_price.replace("S$","")),
    });

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
