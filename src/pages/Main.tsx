import styled from "styled-components";

const Main = () => {
  return (
    <Wrapper>
      <Title>Jocker</Title>
      <ClickAnyWhere>click anywhere</ClickAnyWhere>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 100px;
  padding-top: 60px;
`;

const ClickAnyWhere = styled.p`
  font-size: 20px;
  padding-bottom: 65px;
`;

export default Main;
