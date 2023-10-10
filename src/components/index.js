import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import styled, { css } from "styled-components";

import MonthYearSelector from "./MonthYearSelector";
import InputDate from "./InputDate";
import InputTime from "./InputTime";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ComponentWrapper = styled.div`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 35px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const ButtonStyled = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 27px;
  width: 27px;
  border: 1px solid #eff3f3;
  border-radius: 3px;
  background-color: #ffffff;
`;

const MonthYearWrapper = styled.button`
  all: unset;
  position: relative;
  display: flex;
  align-items: center;
`;

const MonthYearValue = styled.span`
  color: #485053;
  margin-right: 5px;
`;

const Icon = styled.span`
  color: ${(isexpanded) => (isexpanded ? "#FFFFFF" : "#0C8642")};
  transition: transform 0.2s ease-in-out;
`;

const Carets = styled.span`
  color: #0c8642;
`;

const YearSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -4px;
  width: 15px;
  height: 15px;
  ${({ isactive }) =>
    isactive &&
    css`
      ${Icon} {
        transform: rotate(180deg);
      }
    `};
  background-color: ${({ isactive }) => (isactive ? "#0CAA8B" : "#EFF3F3")};
  border-radius: 2px;
`;

const OptionContainer = styled.div`
  display: flex;
  width: auto;
  height: 29px;
  margin: 0 20px 10px 20px;
  justify-content: space-between;
  color: #0c8642;
`;

const OptionDelete = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionToday = styled.button`
  all: unset;
`;

const ContentWrapper = styled.div`
  position: absolute;
  width: 100%;
  background-color: #ffffff;
  border-radius: 6px;
`;

const GenericCalendar = ({ value, isTimePicker }) => {
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );

  const [isMonthYearExpanded, setIsMonthYearExpanded] = useState(false);

  const globalDateInstance = new Date();

  const datepickerRef = useRef(null);

  const range = (start, end, step = 1) => {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  };

  const currentYear = globalDateInstance.getFullYear();

  const minDate = 1900;

  const maxDate = currentYear + 100;

  const years = range(minDate, maxDate, 1);

  const dateFormat = isTimePicker ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";

  const hideInitialInputDate = isTimePicker && !selectedDate;

  let selectedHours = null;
  let selectedMinutes = null;

  if (selectedDate) {
    selectedHours = new Date(selectedDate).getHours();
    selectedMinutes = new Date(selectedDate).getMinutes();
  } else if (!selectedDate && hideInitialInputDate) {
    selectedHours = new Date().getHours();
    selectedMinutes = new Date().getMinutes();
  }

  const inputDateProps = {
    iconPosition: "top: 13px; right: 50px",
    datepickerRef,
    isTimePicker,
  };

  const handleChangeRaw = (date) => {
    const newRaw = new Date(date.currentTarget.value);
    if (newRaw instanceof Date && !isNaN(newRaw)) {
      setSelectedDate(newRaw);
    }
  };

  const handleOnChangeDate = (date) => {
    setSelectedDate(date);
  };

  const handleOnSelectYear = ({ year, month }) => {
    const newDateInstance = new Date(selectedDate || new Date());

    if (year) newDateInstance.setFullYear(year);
    if (month) newDateInstance.setMonth(month);

    setSelectedDate(newDateInstance);
    setIsMonthYearExpanded(!isMonthYearExpanded);
  };

  const handleOnSelectToday = (event) => {
    event.preventDefault();
    setSelectedDate(globalDateInstance);
    datepickerRef?.current?.setOpen(false);
  };

  const handleOnDeleteDate = (event) => {
    event.preventDefault();
    setSelectedDate(null);
    datepickerRef?.current?.setOpen(false);
  };

  const handleOnSelectTime = (type, date) => {
    const newDateInstance = new Date(selectedDate || new Date());
    if (type === "hours") {
      newDateInstance.setHours(date);
    } else {
      newDateInstance.setMinutes(date);
    }
    setSelectedDate(newDateInstance);
  };

  const handleCloseOnScroll = (event) =>
    event.target?.className?.includes("new-modal-ui-styled");

  return (
    <ComponentWrapper>
      <DatePicker
        ref={datepickerRef}
        selected={hideInitialInputDate ? new Date() : selectedDate}
        isactive={isMonthYearExpanded}
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        calendarStartDay={1}
        dateFormat={dateFormat}
        minDate={new Date(minDate, 0, 1)}
        maxDate={new Date(maxDate, 11, 31)}
        closeOnScroll={handleCloseOnScroll}
        showTimeInput={isTimePicker}
        customInput={<InputDate {...inputDateProps} />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <>
            <HeaderContainer>
              <MonthYearWrapper
                type="button"
                isactive={isMonthYearExpanded}
                onClick={() => setIsMonthYearExpanded(!isMonthYearExpanded)}
              >
                <MonthYearValue>
                  {`${MONTH_NAMES[new Date(date).getMonth()]} ${new Date(
                    date
                  ).getFullYear()}`}
                </MonthYearValue>
                <YearSelector isactive={isMonthYearExpanded}>
                  <Icon isexpanded={isMonthYearExpanded}>
                    <PiCaretDownBold />
                  </Icon>
                </YearSelector>
              </MonthYearWrapper>
              {!isMonthYearExpanded && (
                <ButtonWrapper>
                  <ButtonStyled
                    type="button"
                    className="mr-1"
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    <Carets>
                      <PiCaretUpBold />
                    </Carets>
                  </ButtonStyled>

                  <ButtonStyled
                    type="button"
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    <Carets>
                      <PiCaretDownBold />
                    </Carets>
                  </ButtonStyled>
                </ButtonWrapper>
              )}
            </HeaderContainer>
            {isMonthYearExpanded && (
              <ContentWrapper>
                <MonthYearSelector
                  className="year-container"
                  isExpanded={isMonthYearExpanded}
                  years={years}
                  selectedYear={new Date(date).getFullYear()}
                  selectedMonth={new Date(date).getMonth()}
                  setSelectedDate={({ month, year }) => {
                    changeMonth(month);
                    changeYear(year);
                    handleOnSelectYear({ month, year });
                  }}
                />
              </ContentWrapper>
            )}
          </>
        )}
        onChange={(date) => handleOnChangeDate(date)}
        onCalendarClose={() => setIsMonthYearExpanded(false)}
        onCalendarOpen={() => datepickerRef?.current?.setFocus()}
        {...(isTimePicker && {
          shouldCloseOnSelect: false,
          onChangeRaw: (event) => handleChangeRaw(event),
          calendarContainer: (props) => (
            <InputTime
              values={{
                hours: selectedHours,
                minutes: selectedMinutes,
              }}
              onClick={handleOnSelectTime}
              {...props}
            />
          ),
        })}
        fixedHeight
        popperProps={{
          strategy: "fixed",
        }}
        popperClassName="calendar-popper"
        popperPlacement="bottom-start"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4],
            },
          },
        ]}
        showPopperArrow={false}
      >
        <OptionContainer>
          {!isMonthYearExpanded && (
            <>
              <OptionDelete onClick={handleOnDeleteDate}>
                <Icon icon="erase" size="small" color="#0C8642" />
                <span className="ml-2">Delete date</span>
              </OptionDelete>
              <OptionToday onClick={handleOnSelectToday}>
                <span>Today</span>
              </OptionToday>
            </>
          )}
        </OptionContainer>
      </DatePicker>
    </ComponentWrapper>
  );
};

GenericCalendar.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  fieldName: PropTypes.string,
  isRequired: PropTypes.bool,
  isImportant: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  isTimePicker: PropTypes.bool,
  genericDateProps: PropTypes.object,
  onChange: PropTypes.func,
};

export default GenericCalendar;
