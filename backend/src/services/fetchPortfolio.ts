import { Transaction } from "../models/Transaction";

const fetchPortfolio = async (uid: string) => {
  return await Transaction.aggregate([
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
};

export default fetchPortfolio;
