export const convertTimeToMilliseconds = (minute: number) => minute * 60 * 1000;

export const AUDIO = "nothing";
export const AUTHOR = "https://github.com/taddy569";
export const BREAK_TIME_LEFT_DEFAULT = convertTimeToMilliseconds(5);
export const TIME_LEFT_DEFAULT = convertTimeToMilliseconds(25);
export const POMODORO_DEFINE =
  "https://en.wikipedia.org/wiki/Pomodoro_Technique";
export const SOUND_SRC =
  "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg";

export const timeFormat = (time: number) => (time < 10 ? `0${time}` : time);

export const convertTime = (time: number) =>
  time % 60000 === 0
    ? `${timeFormat(time / 60000)}:00`
    : `${timeFormat((time - (time % 60000)) / 60000)}:${timeFormat(
        (time % 60000) / 1000
      )}`;
