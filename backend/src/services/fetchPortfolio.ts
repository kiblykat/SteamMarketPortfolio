import { Transaction } from "../models/Transaction";
import { fetchCurrentSteamPrices } from "./fetchCurrentSteamPrices";

interface Portfolio {
  itemName: string;
  position: number;
  avgPrice: number;
  realizedPL: number;
  PL: number;
}

const fetchPortfolio = async (
  uid: string
): Promise<[boolean, string | Portfolio[]]> => {
  const portfolioWithoutPL = await Transaction.aggregate([
    {
      $match: {
        uid: String(uid),
      },
    },
    {
      $group: {
        _id: "$itemName",
        totalBuyPrice: {
          $sum: {
            $cond: {
              if: { $eq: ["$type", "BUY"] },
              then: { $multiply: ["$price", "$quantity"] },
              else: 0,
            },
          },
        },
        totalBuyQuantity: {
          $sum: {
            $cond: {
              if: { $eq: ["$type", "BUY"] },
              then: "$quantity",
              else: 0,
            },
          },
        },
        totalSellPrice: {
          $sum: {
            $cond: {
              if: { $eq: ["$type", "SELL"] },
              then: { $multiply: ["$price", "$quantity"] },
              else: 0,
            },
          },
        },
        totalSellQuantity: {
          $sum: {
            $cond: {
              if: { $eq: ["$type", "SELL"] },
              then: "$quantity",
              else: 0,
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        itemName: "$_id",
        position: {
          $subtract: ["$totalBuyQuantity", "$totalSellQuantity"],
        },
        totalBuyPrice: 1,
        totalBuyQuantity: 1,
        totalSellPrice: 1,
      },
    },
    {
      $match: {
        position: { $gt: 0 }, // Only keep items with a positive position
      },
    },
    {
      $project: {
        itemName: 1,
        position: 1,
        avgPrice: { $divide: ["$totalBuyPrice", "$totalBuyQuantity"] },
        realizedPL: "$totalSellPrice",
      },
    },
  ]);

  if (portfolioWithoutPL.length === 0) {
    return [false, "No transactions found for this user"];
  }
  const distinctNames: string[] = portfolioWithoutPL.map(
    (item) => item.itemName
  );
  console.log("Distinct names:", distinctNames);

  const currentPrices = await fetchCurrentSteamPrices(distinctNames);
  const portfolioWithPL = portfolioWithoutPL.map((item) => {
    const currentPrice = currentPrices[item.itemName] || 0;
    const PL =
      item.position * Number(currentPrice) -
      item.position * item.avgPrice +
      item.realizedPL;

    return {
      itemName: item.itemName,
      position: item.position,
      avgPrice: item.avgPrice,
      realizedPL: item.realizedPL,
      PL: parseFloat(PL.toFixed(2)),
    };
  });
  console.log("Portfolio with PL:", portfolioWithPL);

  return [true, portfolioWithPL];
};

export default fetchPortfolio;
