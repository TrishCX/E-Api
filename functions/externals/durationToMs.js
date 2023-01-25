export default function msToDuration(timeInString) {
    let milliseconds;
    if (timeInString.split(":").length === 2) {
        /* For MM:SS */
        return (milliseconds =
            Number(timeInString.split(":")[0]) * 60000 +
                Number(timeInString.split(":")[1]) * 1000);
    }
    else if (timeInString.split(":").length === 3) {
        /* For HH:MM:SS */
        return (milliseconds =
            Number(timeInString.split(":")[0]) * 3600000 +
                Number(timeInString.split(":")[1]) * 60000 +
                Number(timeInString.split(":")[2]) * 1000);
    }
    else if (timeInString.split(":").length === 4) {
        /* For DD:HH:MM:SS */
        return (milliseconds =
            Number(timeInString.split(":")[0]) * 86400000 +
                Number(timeInString.split(":")[1]) * 3600000 +
                Number(timeInString.split(":")[2]) * 60000 +
                Number(timeInString.split(":")[3]) * 1000);
    }
}
