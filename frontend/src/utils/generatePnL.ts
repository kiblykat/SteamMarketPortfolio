import transactionAPI from "../api/api";

export async function generatePnL(itemName: string) {
  try {
    const response = await transactionAPI.get(
      `/steamPrices/currentSteamPrices?itemName=${itemName}`
    );
    console.log(`Current Steam Prices: ${JSON.stringify(response.data)}`);
    return response.data.price;
  } catch (error) {
    console.error("Error fetching price:", error);
    return null;
  }
}
