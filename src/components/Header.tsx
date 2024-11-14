import styled from "styled-components";
import LanSelect from "./LanSelect";
import setting from "../asset/imgs/setting.svg";
import { useEffect, useRef, useState } from "react";
import RadioCheckboxGroup, { EGroupType } from "./RadioCheckbox";

const Header = () => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [radioSelected, setRadioSelected] = useState<string>("Any");
  const settingRef = useRef<HTMLDivElement>(null);

  const category = [
    "Programming",
    "Misc",
    "Dark",
    "Pun",
    "Spooky",
    "Christmas",
  ];

  const handleClick = () => {
    setOpenSetting(!openSetting);
  };

  const handleRadioSelectedChange = (newSelectedValue: string) => {
    setRadioSelected(newSelectedValue);
    console.log(newSelectedValue);
  };

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        settingRef.current &&
        !settingRef.current.contains(e.target as Node)
      ) {
        setOpenSetting(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutSide);
    return () => window.removeEventListener("mousedown", handleClickOutSide);
  }, [settingRef]);

  return (
    <HeaderWrapper>
      <Logo>JOCKER</Logo>
      <RightContent>
        <LanSelect />
        <Setting onClick={handleClick}>
          <img src={setting} alt="setting" />
        </Setting>
      </RightContent>
      {openSetting && (
        <SettingWrap ref={settingRef}>
          <SettingContent>
            <SettingTitle>Categories</SettingTitle>
            <RadioCheckboxGroup
              type={EGroupType.RADIO}
              value={["Any", "Custom"]}
              name="radio1"
              onRadioSelected={handleRadioSelectedChange}
            />
            <RadioCheckboxGroup
              disabled={radioSelected === "Any"}
              type={EGroupType.CHECKBOX}
              value={category}
              name="checkbox1"
              onRadioSelected={() => {}}
            />
          </SettingContent>
          <SettingContent>
            <SettingTitle>BlackList</SettingTitle>
          </SettingContent>
        </SettingWrap>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 30px 0 20px;
  background-color: black;
`;

const Logo = styled.h1`
  font-size: 30px;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Setting = styled.button`
  padding: 0;
  height: fit-content;
`;

const SettingWrap = styled.div`
  position: absolute;
  width: 585px;
  border: 1px solid #fff;
  border-radius: 10px;
  right: 30px;
  top: 70px;
  padding: 20px;
`;

const SettingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  &:last-child {
    margin-top: 22px;
  }
`;
const SettingTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

export default Header;
