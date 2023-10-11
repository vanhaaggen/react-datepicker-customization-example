import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { MonthItem, scrollToSelection } from "../MonthYearSelector";

/* eslint-disable no-param-reassign,  react/no-array-index-key */
// in this case 'scrollRef' is the ref of the scrollable container and needs to be reassigned.
// in this case using array index is save because the list is static and the order is not changed.

const InfiniteScrollWrapper = styled.div`
  position: relative;
  text-align: center;
  height: 100%;
  ${({ outerStyle }) => outerStyle};
  overflow: hidden;
  padding: 11px 0;
`;

const InfiniteScrollInner = styled.div`
  max-height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  margin: 2px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ItemStyled = styled(MonthItem)`
  font-size: 14px;
  width: 55px;
  height: 32px;
  padding: 5px;
  border-radius: 3px;
  &:hover {
    background-color: #e3e9ef;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: #3388ff;
      color: #ffffff;
      &:hover {
        background-color: #3388ff;
      }
    `}
  cursor: pointer;
`;

const handleScroll = ({
  height,
  backupHeight,
  selected,
  triggerScrollTo,
  itemRefs,
  scrollRef,
}) => {
  if (scrollRef && scrollRef.current) {
    if (triggerScrollTo) {
      scrollToSelection(selected, "instant", itemRefs?.current, scrollRef);
    } else {
      const scroll = scrollRef.current.scrollTop;
      if (scroll < backupHeight || scroll >= backupHeight + height) {
        scrollRef.current.scrollTop = backupHeight + (scroll % height);
      }
    }
  }
};

const InfiniteScrollLoop = ({ outerStyle, children, scrollRef, itemRefs }) => {
  const [height, setHeight] = useState(0);

  const contentRef = useRef(null);

  const surroundingBackup = 2;

  const backupHeight = height * surroundingBackup;

  const handleOnScroll = useCallback(() => {
    handleScroll({
      height,
      backupHeight,
      scrollRef,
      triggerScrollTo: false,
    });
  }, [height, backupHeight, scrollRef]);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight);
      scrollRef.current.scrollTop = backupHeight;
    }
  }, [scrollRef, backupHeight]);

  return (
    <InfiniteScrollWrapper outerStyle={outerStyle}>
      <InfiniteScrollInner ref={scrollRef} onScroll={handleOnScroll}>
        {Array(surroundingBackup)
          .fill()
          .map((_, index) => (
            <div key={`backup-${index}`}>{children}</div>
          ))}
        <div ref={contentRef}>
          {React.Children.toArray(children).map((child, index) => (
            <div key={`content-${index}`} ref={itemRefs?.current?.[index]}>
              {child}
            </div>
          ))}
        </div>
        {Array(surroundingBackup)
          .fill()
          .map((_, index) => (
            <div key={`backup-${index + surroundingBackup}`}>{children}</div>
          ))}
      </InfiniteScrollInner>
    </InfiniteScrollWrapper>
  );
};

const InfiniteScrollPicker = ({ list, value, onClick, style }) => {
  const scrollRef = useRef(null);

  const itemRefs = useRef(
    Array(list.length)
      .fill(null)
      .map(() => React.createRef())
  );

  useEffect(() => {
    if (value && itemRefs?.current[value]) {
      handleScroll({
        itemRefs,
        scrollRef,
        selected: value,
        triggerScrollTo: true,
      });
    }
  }, [value]);

  return (
    <InfiniteScrollLoop
      outerStyle={style}
      scrollRef={scrollRef}
      itemRefs={itemRefs}
    >
      {list.map((item, index) => (
        <ItemStyled
          key={item}
          selected={value === index}
          onClick={() => onClick(index)}
        >
          {item}
        </ItemStyled>
      ))}
    </InfiniteScrollLoop>
  );
};

InfiniteScrollPicker.defaultProps = {
  list: [],
  onClick: () => {},
};

InfiniteScrollPicker.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default InfiniteScrollPicker;
