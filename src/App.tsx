import React, { useState } from "react";

import * as helper from "./helper";

const {
  AUDIO,
  AUTHOR,
  BREAK_TIME_LEFT_DEFAULT,
  POMODORO_DEFINE,
  SOUND_SRC,
  TIME_LEFT_DEFAULT,
  timeFormat,
  converTime,
} = helper;

type ResultType = {
  breakLength: number;
  breakTimeLeft: number;
  sessionLength: number;
  timeLeft: number;
};

let sessionTime: number = 0;
let breakTime: number = 0;
let countdown: number | string | boolean = "";

const defaultValue = {
  breakLength: 5,
  sessionLength: 25,
  timeType: "Session",
  timeLeft: TIME_LEFT_DEFAULT,
  breakTimeLeft: BREAK_TIME_LEFT_DEFAULT,
  isCountDown: false,
};

function App() {
  const [info, setInfo] = useState(defaultValue);

  const checkValue = (value: string) => {
    let result: boolean = false;
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
        result = false;
        break;
    }
    return result;
  };

  const changeLength = (type: string) => {
    let result = {};

    if (type === "break-decrement") {
      breakTime = info.breakTimeLeft - 60000;
      result = {
        breakLength: info.breakLength - 1,
        breakTimeLeft: breakTime,
      };
    } else if (type === "session-decrement") {
      sessionTime = info.timeLeft - 60000;
      result = {
        sessionLength: info.sessionLength - 1,
        timeLeft: sessionTime,
      };
    } else if (type === "break-increment") {
      breakTime = info.breakTimeLeft + 60000;
      result = {
        breakLength: info.breakLength + 1,
        breakTimeLeft: breakTime,
      };
    } else if (type === "session-increment") {
      sessionTime = info.timeLeft + 60000;
      result = {
        sessionLength: info.sessionLength + 1,
        timeLeft: sessionTime,
      };
    }

    setInfo({
      ...info,
      ...result,
    });
  };

  const handleControl = (e) => {
    if (info.isCountDown) {
      let currentElementID = e.currentTarget.id;
      if (checkValue(currentElementID)) {
        changeLength(currentElementID);
      }
    }
  };

  const handleCountDown = (audio) => {
    countdown = window.setInterval(() => {
      switch (info.timeType) {
        case "Session":
          if (info.timeLeft === 0) {
            window.clearInterval(countdown);
            audio.play();
            audio.currentTime = 0;
            setInfo({
              ...info,
              timeLeft: sessionTime,
              timeType: "Break",
            });
            handleCountDown(audio);
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
            audio.play();
            audio.currentTime = 0;
            setInfo({
              ...info,
              breakTimeLeft: breakTime,
              timeType: "Session",
            });
            handleCountDown(audio);
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
  };

  const handlePlayPause = () => {
    let isCD;

    if (!info.isCountDown) {
      handleCountDown(AUDIO);
      isCD = true;
    } else {
      window.clearInterval(countdown);
      isCD = false;
    }
    setInfo({
      ...info,
      isCountDown: isCD,
    });
  };

  const handleReset = () => {
    window.clearInterval(countdown);
    setInfo(defaultValue);
    if (!AUDIO.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return <div>This is App</div>;
}

export default App;
