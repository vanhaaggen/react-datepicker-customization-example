import { useState } from "react";
import styled from "styled-components";
import GenericCalendar from "./components";
import { RxCopy } from "react-icons/rx";
import "./styles.scss";

const Container = styled.div`
  font-family: "Mona Sans";
  display: flex;
  padding: 10px 20px;
  height: 100%;
`;

const InfoSection = styled.section`
  width: 30%;
  height: 50vh;
  margin: 20px;
  font-size: 16px;
  // I want a light grey border right;
  border-right: 1px solid #e3f0e8;
`;
const CalendarSection = styled.section`
  width: 500px;
  margin-left: 20px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const MainTitle = styled.h1`
  font-weight: 600;
  margin: 0;
  color: #3388ff;
`;

const SubTitle = styled.h3`
  font-weight: bold;
  margin: 0;
`;
const UlStyled = styled.ul`
  width: 100%;
  list-style-type: none;
  padding: 0;
`;

const LiStyled = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const CodeStyled = styled.code`
  display: flex;
  justify-content: space-between;
  width: 50%;
  font-family: monospace;
  padding: 7px 12px;
  font-size: 14px;
  font-weight: lighter;
  margin-right: 10px;
  color: #323639;
  border-radius: 3px;
  border: 1px solid #dfe3e8;
  cursor: pointer;
`;

const CopiedStyled = styled.span`
  font-size: 12px;
  color: #50575b;
`;
const OptionSection = styled.div``;
const ButtonStyled = styled.button`
  all: unset;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  border: 1px solid #dfe3e8;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #dfe3e8;
  }
`;

const Link = styled.a`
  font-family: "Mona Sans";
  font-size: 12px;
  text-decoration: none;
  color: inherit;
  margin-left: 20px;
`;
const Wrapper = styled.div`
  height: 93vh;
`;

const App = () => {
  const [copied, setCopied] = useState(false);
  const [isTimePicker, setIsTimePicker] = useState(false);

  const copyToClipboard = (text, library) => {
    navigator.clipboard.writeText(text);
    setCopied(library);
    setTimeout(() => {
      setCopied(false);
    }, 400);
  };

  const libraries = [
    "react-datepicker",
    "styled-components",
    "react-bootstrap",
    "react-icons",
    "dayjs",
  ];
  const mapLibraries = (libraries) => {
    return libraries.map((library) => {
      return (
        <LiStyled>
          <CodeStyled>
            {`npm i ${library}`}{" "}
            <RxCopy
              onClick={() => copyToClipboard(`npm i ${library}`, library)}
            />
          </CodeStyled>
          {copied && library === copied && <CopiedStyled>Copied</CopiedStyled>}
        </LiStyled>
      );
    });
  };
  return (
    <Wrapper>
      <Container className="App">
        <InfoSection>
          <SubTitle>Motivation:</SubTitle>
          <p>
            I had to create a custom calendar for a project as it is impossible
            for now to customize native browser calendars.
          </p>
          <p>
            I used react-datepicker library and customized it to fit my needs. I
            also added a time picker to it.
          </p>
          <p>Feel free to use it.</p>
          <b>Libraries used:</b>
          <UlStyled>{mapLibraries(libraries)}</UlStyled>
        </InfoSection>
        <CalendarSection>
          <Title>
            <MainTitle>React Datepicker</MainTitle>
            <span>customized calendar</span>
          </Title>
          <OptionSection>
            <ButtonStyled onClick={() => setIsTimePicker(false)}>
              <html>type="date"</html>
            </ButtonStyled>
            <ButtonStyled onClick={() => setIsTimePicker(true)}>
              <html>type="datetime-local"</html>
            </ButtonStyled>
          </OptionSection>
          <GenericCalendar isTimePicker={isTimePicker} />
        </CalendarSection>
      </Container>
      <Link href="https://github.com/vanhaaggen">
        made with 💙 by Christian Haag
      </Link>
    </Wrapper>
  );
};

export default App;
