export const convertToRole = (str) => {
    if (str === "BOTTOM") return "Bot"
    if (str === "UTILITY") return "Support";
    if (str === "JUNGLE") return "Jungle";
    if (str === "MIDDLE") return "Mid";
    if (str === "TOP") return "Top";
}