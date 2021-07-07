import React, {
  MouseEvent,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
} from "react";

import * as helper from "./helper";
import Clock from "./Clock";

const {
  BREAK_TIME_LEFT_DEFAULT,
  POMODORO_DEFINE,
  SOUND_SRC,
  TIME_LEFT_DEFAULT,
  convertTime,
  convertTimeToMilliseconds,
} = helper;

let countdown = 0;

const defaultValue = {
  sessionLength: 25,
  timeLeft: TIME_LEFT_DEFAULT,
  breakLength: 5,
  breakTimeLeft: BREAK_TIME_LEFT_DEFAULT,
  timeType: "Session",
  isCountDown: false,
};

function App() {
  const [info, setInfo] = useState(defaultValue);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!info.isCountDown) {
      return;
    }

    countdown = window.setInterval(() => {
      switch (info.timeType) {
        case "Session":
          if (info.timeLeft === 0) {
            window.clearInterval(countdown);
            if (audioRef.current) {
              audioRef.current.play();
              audioRef.current.currentTime = 0;
            }
            setInfo({
              ...info,
              timeLeft: convertTimeToMilliseconds(info.sessionLength),
              timeType: "Break",
            });
          } else {
            setInfo({
              ...info,
              timeLeft: info.timeLeft - 1000,
            });
          }
          break;
        case "Break":
          if (info.breakTimeLeft === 0) {
            window.clearInterval(countdown);
            if (audioRef.current) {
              audioRef.current.play();
              audioRef.current.currentTime = 0;
            }
            setInfo({
              ...info,
              breakTimeLeft: convertTimeToMilliseconds(info.breakLength),
              timeType: "Session",
            });
          } else {
            setInfo({
              ...info,
              breakTimeLeft: info.breakTimeLeft - 1000,
            });
          }
          break;
        default:
          break;
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [info]);

  const checkValue = (value: string): boolean => {
    let result = false;

    switch (value) {
      case "break-decrement":
        result = info.breakLength > 1 && info.breakLength <= 60;
        break;
      case "break-increment":
        result = info.breakLength >= 1 && info.breakLength < 60;
        break;
      case "session-decrement":
        result = info.sessionLength > 1 && info.sessionLength <= 60;
        break;
      case "session-increment":
        result = info.sessionLength >= 1 && info.sessionLength < 60;
        break;
      default:
        break;
    }
    return result;
  };

  const changeLength = (type: string): void => {
    let result = {};

    switch (type) {
      case "break-decrement":
        result = {
          breakLength: info.breakLength - 1,
          breakTimeLeft: info.breakTimeLeft - 60000,
        };
        break;
      case "session-decrement":
        result = {
          sessionLength: info.sessionLength - 1,
          timeLeft: info.timeLeft - 60000,
        };
        break;
      case "break-increment":
        result = {
          breakLength: info.breakLength + 1,
          breakTimeLeft: info.breakTimeLeft + 60000,
        };
        break;
      case "session-increment":
        result = {
          sessionLength: info.sessionLength + 1,
          timeLeft: info.timeLeft + 60000,
        };
        break;
      default:
        break;
    }

    setInfo({
      ...info,
      ...result,
    });
  };

  const handleControl = (e: MouseEvent<HTMLElement>): void => {
    if (!info.isCountDown) {
      let currentElementID = e.currentTarget.id;
      if (checkValue(currentElementID)) {
        changeLength(currentElementID);
      }
    }
  };

  const handlePlayPause = (): void => {
    let isCD;

    if (!info.isCountDown) {
      isCD = true;
    } else {
      isCD = false;
    }
    setInfo({
      ...info,
      isCountDown: isCD,
    });
  };

  const handleReset = (): void => {
    window.clearInterval(countdown);
    setInfo(defaultValue);

    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>): void => {
    if (info.isCountDown) return;

    const { id, value } = e.target;
    const valueInNumber = Number(value);

    if (valueInNumber < 1 || valueInNumber > 60 || !valueInNumber) return;

    let customLengthKey = "";
    let customTimeLeftKey = "";

    if (id === "session-length") {
      customLengthKey = "sessionLength";
      customTimeLeftKey = "timeLeft";
    } else if (id === "break-length") {
      customLengthKey = "breakLength";
      customTimeLeftKey = "breakTimeLeft";
    }

    setInfo({
      ...info,
      [customLengthKey]: value,
      [customTimeLeftKey]: convertTimeToMilliseconds(valueInNumber),
    });
  };

  return (
    <div id="container">
      <a id="wikipedia" href={POMODORO_DEFINE} target="_blank" rel="noreferrer">
        Pomodoro Clock
      </a>
      <Clock
        breakLength={info.breakLength}
        sessionLength={info.sessionLength}
        handleControl={handleControl}
        timeLeft={convertTime(info.timeLeft)}
        breakTimeLeft={convertTime(info.breakTimeLeft)}
        timeType={info.timeType}
        handlePlayPause={handlePlayPause}
        handleReset={handleReset}
        handleChangeTime={handleChangeTime}
      />
      <audio ref={audioRef} src={SOUND_SRC} />
    </div>
  );
}

export default App;
