export function msToHour(duration: number): string {
    let milliseconds: number = Math.floor((duration % 1000) / 100),
        seconds: number | string = Math.floor((duration / 1000) % 60),
        minutes: number | string = Math.floor((duration / (1000 * 60)) % 60),
        hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes;
}

export function msToMin(duration: number): string {
    let milliseconds: number = Math.floor((duration % 1000) / 100),
        seconds: number | string = Math.floor((duration / 1000) % 60),
        minutes: number | string = Math.floor((duration / (1000 * 60)) % 60),
        hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}
