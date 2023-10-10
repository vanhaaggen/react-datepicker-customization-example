/* eslint-disable no-nested-ternary */
import React, { forwardRef } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputStyled = styled.input`
  height: 35px;
  width: 100%;
  padding: 0 10px;

  font-size: 0.75rem;
  line-height: 0.875rem;
  color: #2a3236;
  background-color: #ffffff;
  border: 1px solid #cdd8e2;
  border-radius: 6px;
  transition: border-color 0.05s ease-in-out, box-shadow 0.05s ease-in-out;

  &::placeholder {
    font-size: 0.75rem;
    line-height: 0.875rem;
    color: #2a3236;
  }

  &::-webkit-calendar-picker-indicator {
    color: transparent;
    background: none;
    z-index: 1;
    pointer-events: none;
  }
`;
const IconCalendar = styled(IoCalendarOutline)`
  color: ${({ isopen }) => (isopen ? "#0CAA8B" : "#676D6F")};
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const DatePickerIconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 25px;
  border-left: 1px solid #c8d9d9;
  top: 9px;
  right: 12px;
  cursor: pointer;
`;

const InputDate = forwardRef((props, ref) => (
  <Wrapper>
    <InputStyled
      type={props.isTimePicker ? "datetime-local" : "date"}
      ref={ref}
      {...props}
    />
    <DatePickerIconWrapper>
      <IconCalendar
        isopen={props.datepickerRef?.current?.state?.open}
        onClick={props.onClick}
      />
    </DatePickerIconWrapper>
  </Wrapper>
));

InputDate.propTypes = {
  props: PropTypes.object,
  ref: PropTypes.object,
};

export default InputDate;
