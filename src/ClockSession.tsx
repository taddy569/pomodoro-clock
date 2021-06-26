import React, { FC } from "react";

type ClockSessionType = {
  sessionLength: number;
};

function ClockSession(props: ClockSessionType) {
  return <div id="session-length">{props.sessionLength}</div>;
}

export default ClockSession;
