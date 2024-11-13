import { useState } from "react";
import styled from "styled-components";
import cat from "../asset/imgs/laughing_cat.svg";
import human from "../asset/imgs/laughing_man.svg";
import { Link } from "react-router-dom";

const Main = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => {
    setShow(true);
  };

  return (
    <Wrapper onClick={handleClick} cursor={show}>
      <TitleWrap>
        <Title>Jocker</Title>
      </TitleWrap>
      <ImgWrap>
        <img
          className={`fade-box ${show && "shake"}`}
          src={cat}
          alt="laughing cat"
        />
        <img
          className={`fade-box ${show && "shake"}`}
          src={human}
          alt="laughing man"
        />
      </ImgWrap>
      {show ? (
        <Link to={"/joke"}>
          <Start>START</Start>
        </Link>
      ) : (
        <HelperText>click anywhere</HelperText>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ cursor: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  cursor: ${({ cursor }) => (cursor ? "default" : "pointer")};
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 12px;
`;

const ImgWrap = styled.div`
  position: absolute;
  & > img {
    position: absolute;
  }
  & > img:first-child {
    top: 80px;
    left: -330px;
  }
  & > img:last-child {
    top: 100px;
    left: 160px;
  }
`;

const Title = styled.h1`
  font-size: 100px;
  padding-top: 60px;
`;

const HelperText = styled.p`
  font-size: 20px;
  padding-bottom: 65px;
`;

const Start = styled.p`
  font-size: 30px;
  text-decoration: underline;
  padding-bottom: 65px;
  cursor: pointer;
`;

export default Main;
