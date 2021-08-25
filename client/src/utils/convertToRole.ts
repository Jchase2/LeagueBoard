export const convertToRole = (str) => {
    if (str === "UTILITY") return "Bot"
    if (str === "BOTTOM") return "Support";
    if (str === "JUNGLE") return "Jungle";
    if (str === "MIDDLE") return "Mid";
    if (str === "TOP") return "Top";
}