import styled from "styled-components";
import arrow from "../asset/imgs/select_icon.svg";
import { useEffect, useRef, useState } from "react";

const LanSelect = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("en - English");
  const selectRef = useRef<HTMLDivElement>(null);

  const language = [
    { value: "cs", country: "Czech" },
    { value: "de", country: "German" },
    { value: "en", country: "English" },
    { value: "es", country: "Spanish" },
    { value: "fr", country: "French" },
    { value: "pt", country: "Portuguese" },
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string, country: string) => {
    setSelected(`${value} - ${country}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutSide);
    return () => window.removeEventListener("mousedown", handleClickOutSide);
  }, [selectRef]);

  return (
    <SelectBox ref={selectRef} isOpen={isOpen}>
      <Selected onClick={handleClick}>
        <p>{selected}</p>
        <img src={arrow} alt="arrow" />
      </Selected>
      <ul>
        {language.map((v) => (
          <li key={v.value}>
            <Option onClick={() => handleSelect(v.value, v.country)}>
              {v.value} - {v.country}
            </Option>
          </li>
        ))}
      </ul>
    </SelectBox>
  );
};

const SelectBox = styled.div<{ isOpen: boolean }>`
  display: inline-block;
  width: 200px;
  ${({ isOpen }) =>
    isOpen
      ? "border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #fff; border-bottom: none"
      : "border: 1px solid #fff"};
  ${({ isOpen }) =>
    isOpen ? "border-radius: 5px 5px 0 0" : "border-radius: 5px;"};
  background-color: #434954;
  font-size: 15px;
  cursor: pointer;

  & > ul {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    ${({ isOpen }) =>
      isOpen
        ? "border-left: 1px solid #fff; border-right: 1px solid #fff; border-bottom: 1px solid #fff;"
        : ""};
    position: absolute;
    width: 200px;
    border-radius: 0 0 5px 5px;
    background: #282c34;
    margin: 0 0 0 -1px;
  }

  & img {
    width: 12px;
    height: 12px;
    ${({ isOpen }) => isOpen && "rotate: x 180deg;"};
  }
`;

const Selected = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 10px 0 15px;
`;

const Option = styled.button`
  width: 100%;
  text-align: left;
  padding: 8px 15px;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: rgba(217, 217, 217, 0.3);
  }
  &:active {
    background-color: #fff;
    color: #282c34;
  }
`;

export default LanSelect;
