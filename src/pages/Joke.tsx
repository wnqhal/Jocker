import styled from "styled-components";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Joke = () => {
  const [joke, setJoke] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [language, setLanguage] = useState<string>("en");
  const [radioSelected, setRadioSelected] = useState<string>("Any");
  const [category, setCategory] = useState<string[]>([]);
  const [blackList, setBlackList] = useState<string[]>([]);

  const handleLanguageSelectedChange = (newSelectedValue: string) => {
    setLanguage(newSelectedValue);
  };

  const handleRadioSelectedChange = (newSelectedValue: string) => {
    setRadioSelected(newSelectedValue);
  };

  const handleCategorySelectedChange = (newSelectedValue: string[]) => {
    setCategory(newSelectedValue);
  };

  const handleBlackListSelectedChange = (newSelectedValue: string[]) => {
    setBlackList(newSelectedValue);
  };

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);

    try {
      const blacklistFlags =
        blackList.length > 0 ? `blacklistFlags=${blackList.join(",")}&` : "";

      const response = await axios.get(
        `https://v2.jokeapi.dev/joke/${
          radioSelected === "Custom" ? category : "Any"
        }?${`lang=${language}&`}${blacklistFlags}type=single`
      );
      if (response.data.error) {
        throw new Error("No joke found.");
      }
      setJoke(response.data.joke);
    } catch (error: any) {
      setError("Failed to fetch joke: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, [language]);

  return (
    <Wrapper>
      <Header
        onLanguageSelected={handleLanguageSelectedChange}
        onRadioSelected={handleRadioSelectedChange}
        onCategorySelected={handleCategorySelectedChange}
        onBlackListSelected={handleBlackListSelectedChange}
      />
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
