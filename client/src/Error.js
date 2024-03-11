import styled from "styled-components";
import { GiUnlitBomb } from "react-icons/gi";

const Error = () => {
  return (
    <Wrapper>
      <Bomb />
      <H2> An unknown error has occurred.</H2>
      <Par>
        Please try refreashing the page, or <a href="#">contact support</a> if
        the problem persists
      </Par>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 2000px;
  height: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 100px;
  border-left: 1px lightgray solid;
`;

const Bomb = styled(GiUnlitBomb)`
  height: 100px;
  width: 100px;
  margin-bottom: 50px;
`;

const H2 = styled.div`
  font-size: 25px;
  font-weight: bold;
  font-family: sans-serif;
  margin-bottom: 50px;
`;

const Par = styled.div`
  font-size: 20px;
  font-family: sans-serif;
  text-align: left;
  width: 500px;
`;

export default Error;
