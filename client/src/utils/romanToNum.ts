export const changeNum = (roman: string) => {
  if (roman === "I") return 1;
  if (roman === "II") return 2;
  if (roman === "III") return 3;
  if (roman === "IIII") return 4;
};

export const getFormattedTime = (fourDigitTime: string) => {
  const hours24 = parseInt(fourDigitTime.substring(0, 2));
  const hours = ((hours24 + 11) % 12) + 1;
  const amPm = hours24 > 11 ? "pm" : "am";
  let minutes = fourDigitTime.substring(2);
  let newMinutes = Number(minutes)
  let newHours = Number(hours)
  if (newMinutes > 60) {
      newMinutes -= 60; 
      newHours += 1;
      return newHours.toString() + ':' + newMinutes + amPm
  } else {
  return hours + ":" + minutes + amPm
  };
};

export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds: any = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};