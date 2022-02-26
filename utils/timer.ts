import {Time} from "../ts/interfaces/Time.js";

function msTimer(duration: number): Time {
    let milliseconds: number = Math.floor((duration % 1000) / 100),
        seconds: number | string = Math.floor((duration / 1000) % 60),
        minutes: number | string = Math.floor((duration / (1000 * 60)) % 60),
        hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return {
        hours,
        minutes,
        seconds,
    };
}

export function msToHour(duration: number): string {
    const {hours, minutes} = msTimer(duration);
    return hours + ":" + minutes;
}

export function msToMin(duration: number): string {
    const {minutes, seconds} = msTimer(duration);
    return minutes + ":" + seconds;
}
