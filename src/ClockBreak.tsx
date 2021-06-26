import React from "react";

type ClockBreakType = {
  breakLength: number;
};

const ClockBreak = (props: ClockBreakType) => {
  return <div id="break-length">{props.breakLength}</div>;
};

export default ClockBreak;
