import React, { ChangeEventHandler } from "react";

type ClockSessionType = {
  sessionLength: number;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};

function ClockSession(props: ClockSessionType) {
  return (
    <input
      id="session-length"
      value={props.sessionLength}
      onChange={props.handleChange}
    />
  );
}

export default ClockSession;
