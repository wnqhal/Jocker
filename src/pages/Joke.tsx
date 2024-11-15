import styled from "styled-components";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Joke = () => {
  const [joke, setJoke] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [language, setLanguage] = useState<string>("en");

  const fetchJoke = async () => {
    setLoading(true); // 로딩 상태 설정
    setError(null); // 에러 초기화

    try {
      const response = await axios.get(
        "https://v2.jokeapi.dev/joke/Any?type=single"
      );
      if (response.data.error) {
        throw new Error("No joke found.");
      }
      // 농담을 상태에 저장
      setJoke(response.data.joke);
    } catch (error: any) {
      setError("Failed to fetch joke: " + error.message); // 에러 처리
    } finally {
      setLoading(false); // 로딩 끝
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <Wrapper>
      <Header />
      <Content>
        <JokeText>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <ErrorMsg>{error}</ErrorMsg>
          ) : (
            <>{joke}</>
          )}
        </JokeText>
      </Content>
      <BtnWrap>
        <NewJoke onClick={fetchJoke}>Get New Joke✨</NewJoke>
      </BtnWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  height: calc(100% - 100px);
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const JokeText = styled.p`
  width: 700px;
  font-size: 30px;
  text-align: center;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const NewJoke = styled.button`
  color: inherit;
  background-color: #7825c5;
  border: 1px solid white;
  border-radius: 5px;
  padding: 3px 15px 7px 15px;
  width: 200px;
  cursor: pointer;

  &:hover {
    background-color: #44156f;
  }

  &:active {
    background-color: #af7ddd;
  }
`;

const ErrorMsg = styled.p`
  color: red;
`;

export default Joke;
