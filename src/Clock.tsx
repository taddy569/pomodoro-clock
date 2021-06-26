import React, { MouseEventHandler } from "react";
import ClockBreak from "./ClockBreak";
import ClockSession from "./ClockSession";

type ClockType = {
  timeType: string;
  timeLeft: string;
  breakTimeLeft: string;
  breakLength: number;
  sessionLength: number;
  soundSrc: string;
  handleControl: MouseEventHandler<HTMLDivElement>;
  handlePlayPause: MouseEventHandler<HTMLDivElement> | undefined;
  handleReset: MouseEventHandler<HTMLDivElement> | undefined;
};

function Clock(props: ClockType) {
  return (
    <div id="clock">
      <div id="break-label">Break Length</div>
      <div id="session-label">Session Length</div>
      <div id="control-break">
        <div id="break-decrement" onClick={props.handleControl}>
          <i className="fa fa-arrow-left"></i>
        </div>
        <ClockBreak breakLength={props.breakLength} />
        <div id="break-increment" onClick={props.handleControl}>
          <i className="fa fa-arrow-right"></i>
        </div>
      </div>
      <div id="control-session">
        <div id="session-decrement" onClick={props.handleControl}>
          <i className="fa fa-arrow-left"></i>
        </div>
        <ClockSession sessionLength={props.sessionLength} />
        <div id="session-increment" onClick={props.handleControl}>
          <i className="fa fa-arrow-right"></i>
        </div>
      </div>
      <div id="display-block">
        <div id="timer-label">{props.timeType}</div>
        <div id="time-left">
          {props.timeType === "Session" ? props.timeLeft : props.breakTimeLeft}
        </div>
      </div>

      <div id="start_stop" onClick={props.handlePlayPause}>
        <i className="fa fa-play"></i>
        <i className="fa fa-pause"></i>
      </div>
      <div id="reset" onClick={props.handleReset}>
        <i className="fa fa-refresh"></i>
      </div>
      <audio id="beep" src={props.soundSrc} />
    </div>
  );
}

export default Clock;
