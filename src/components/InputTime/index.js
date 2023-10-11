import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import InfiniteScrollPicker from "../InfiniteScrollPicker";

const TimePickerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 290px;
  left: 100%;
`;

const InputTime = ({ values, className, children, onClick }) => {
  const HOURS = Array.from({ length: 24 }, (_, index) =>
    index.toString().padStart(2, "0")
  );
  const MINUTES = Array.from({ length: 60 }, (_, index) =>
    index.toString().padStart(2, "0")
  );

  return (
    <div className={`${className} time-picker-set`}>
      <div className="children-container">{children}</div>
      <TimePickerContainer>
        <InfiniteScrollPicker
          list={HOURS}
          value={values.hours}
          onClick={(val) => onClick("hours", val)}
        />
        <InfiniteScrollPicker
          list={MINUTES}
          value={values.minutes}
          onClick={(val) => onClick("minutes", val)}
        />
      </TimePickerContainer>
    </div>
  );
};

InputTime.propTypes = {
  values: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default InputTime;
