export const AUDIO = "nothing";
export const AUTHOR = "https://github.com/taddy569";
export const BREAK_TIME_LEFT_DEFAULT = 5 * 60 * 1000;
export const POMODORO_DEFINE =
  "https://en.wikipedia.org/wiki/Pomodoro_Technique";
export const SOUND_SRC =
  "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg";
export const TIME_LEFT_DEFAULT = 25 * 60 * 1000;

export const timeFormat = (time: number) => (time < 10 ? `0${time}` : time);

export const converTime = (time: number) => {
  let result: string;
  if (time % 60000 === 0) {
    result = `${timeFormat(time / 60000)}:00`;
  } else {
    result = `${timeFormat((time = time % 60000) / 60000)}:${timeFormat(
      (time % 60000) / 1000
    )}`;
  }
  return result;
};
