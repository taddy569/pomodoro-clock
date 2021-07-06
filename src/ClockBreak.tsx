import React, { ChangeEventHandler } from "react";

type ClockBreakType = {
  breakLength: number;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};

const ClockBreak = (props: ClockBreakType) => {
  return (
    <input
      id="break-length"
      value={props.breakLength}
      onChange={props.handleChange}
    />
  );
};

export default ClockBreak;
