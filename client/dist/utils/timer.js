function msTimer(duration) {
    let milliseconds = Math.floor((duration % 1000) / 100), seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return {
        hours,
        minutes,
        seconds,
    };
}
export function msToHour(duration) {
    const { hours, minutes } = msTimer(duration);
    return hours + ":" + minutes;
}
export function msToMin(duration) {
    const { minutes, seconds } = msTimer(duration);
    return minutes + ":" + seconds;
}
//# sourceMappingURL=timer.js.map