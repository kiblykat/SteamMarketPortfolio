export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    // hour12: true,
  });
};
