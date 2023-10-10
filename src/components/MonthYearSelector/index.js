import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Accordion, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

/* eslint-disable react/no-array-index-key */
// in this case using array index is save because the list is static and the order is not changed.

const AccordionStyled = styled(Accordion)`
  max-height: 220px;
  width: 260px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const CardStyled = styled(Card)`
  width: 100%;
  margin-bottom: 6px;
  border: 1px solid ${({ isselected }) => (isselected ? "#E3F0E8" : "#F3F3F3")} !important;
  background-color: ${({ isselected }) =>
    isselected ? "#E3F0E8" : "#F3F3F3"} !important;
  border-radius: 3px !important;
  cursor: pointer;
`;

const CardHeaderStyled = styled(Card.Header)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25px;
`;

// const AccordionToggleStyled = styled(Accordion.Toggle)`
//   color: #0a6833;
// `;

const AccordionCollapseStyled = styled(Accordion.Collapse)`
  background-color: #ffffff;
`;

const MonthList = styled.div`
  display: grid;
  margin: 5px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  max-width: 300px;
`;

export const MonthItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 25px;
  padding: 5px;
  border-radius: 3px;

  cursor: pointer;
  &:hover {
    background-color: #e3f0e8;
  }
  ${({ selected }) =>
    selected &&
    css`
      background-color: #0caa8b;
      color: #ffffff;
      &:hover {
        background-color: #0caa8b;
      }
    `}
`;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const scrollToSelection = (id, behavior, itemRefs, containerRef) => {
  const selectedElement = itemRefs[id]?.current;

  if (selectedElement) {
    const container = containerRef.current;

    const scrollPosition = selectedElement.offsetTop - container.offsetTop;

    container.scrollTo({
      top: scrollPosition,
      behavior,
    });
  }
};

const AccordionToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );
  return <span onClick={decoratedOnClick}>{children}</span>;
};

const MonthYearSelector = ({
  years,
  selectedMonth,
  selectedYear,
  setSelectedDate,
}) => {
  const [year, setYear] = useState(selectedYear);

  const [activeKey, setActiveKey] = useState(selectedYear.toString());

  const containerRef = useRef(null);

  const refs = years.reduce((acc, number) => {
    acc[number] = React.createRef();
    return acc;
  }, {});

  useEffect(() => {
    scrollToSelection(year, "instant", refs, containerRef);
  }, [year, refs]);

  const handleYearClick = (val) => {
    setActiveKey(val.toString());

    setYear(val);
    scrollToSelection(val, "smooth", refs, containerRef);
  };

  const handleMonthClick = (y, m) => {
    setSelectedDate({ year: y, month: m });
  };

  return (
    <AccordionStyled
      ref={containerRef}
      activeKey={activeKey}
      defaultActiveKey={activeKey}
    >
      {years.map((y) => (
        <CardStyled ref={refs[y]} key={y} isselected={y === year}>
          <CardHeaderStyled></CardHeaderStyled>
          <AccordionToggle
            eventKey={y.toString()}
            onClick={() => handleYearClick(y)}
          >
            <AccordionToggle>{y}</AccordionToggle>
          </AccordionToggle>

          <AccordionCollapseStyled eventKey={y.toString()}>
            <MonthList>
              {MONTHS.map((monthName, monthIndex) => (
                <MonthItem
                  key={monthIndex}
                  selected={y === selectedYear && selectedMonth === monthIndex}
                  onClick={() => handleMonthClick(y, monthIndex)}
                >
                  {monthName}
                </MonthItem>
              ))}
            </MonthList>
          </AccordionCollapseStyled>
        </CardStyled>
      ))}
    </AccordionStyled>
  );
};

MonthYearSelector.propTypes = {
  years: PropTypes.arrayOf(PropTypes.number),
  selectedMonth: PropTypes.number,
  selectedYear: PropTypes.number,
  setSelectedDate: PropTypes.func,
};

export default MonthYearSelector;
