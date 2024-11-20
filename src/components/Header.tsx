import styled from "styled-components";
import LanSelect from "./LanSelect";
import setting from "../asset/imgs/setting.svg";
import { useRef, useState } from "react";
import RadioCheckboxGroup, { EGroupType } from "./RadioCheckbox";
import useOutsideClick from "../hooks/useOutsideClick";

interface HeaderProps {
  onLanguageSelected: (selectedValue: string) => void;
  onRadioSelected: (selectedValue: string) => void;
  onCategorySelected: (selectedValue: string[]) => void;
  onBlackListSelected: (selectedValue: string[]) => void;
}

const Header = ({
  onLanguageSelected,
  onRadioSelected,
  onCategorySelected,
  onBlackListSelected,
}: HeaderProps) => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [languageSelected, setLanguageSelected] = useState<string>("en");
  const [radioSelected, setRadioSelected] = useState<string>("Any");
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const [blackListSelected, setBlackListSelected] = useState<string[]>([]);
  const settingRef = useRef<HTMLDivElement>(null);

  const category = [
    "Programming",
    "Misc",
    "Dark",
    "Pun",
    "Spooky",
    "Christmas",
  ];

  const blackList = [
    "nsfw",
    "religious",
    "political",
    "racist",
    "sexist",
    "explicit",
  ];

  const handleClick = () => {
    setOpenSetting(!openSetting);
  };

  const handleLanguageSelectedChange = (newSelectedValue: string) => {
    setLanguageSelected(newSelectedValue);
    onLanguageSelected(newSelectedValue);
  };

  const handleRadioSelectedChange = (newSelectedValue: string) => {
    setRadioSelected(newSelectedValue);
    onRadioSelected(newSelectedValue);
  };

  const handleCategorySelectedChange = (newSelectedValue: string[]) => {
    setCategorySelected(newSelectedValue);
    onCategorySelected(newSelectedValue);
  };

  const handleBlackListSelectedChange = (newSelectedValue: string[]) => {
    setBlackListSelected(newSelectedValue);
    onBlackListSelected(newSelectedValue);
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  useOutsideClick(settingRef, () => setOpenSetting(false));

  return (
    <HeaderWrapper>
      <Logo onClick={handleRefreshClick}>JOCKER</Logo>
      <RightContent>
        <LanSelect onLanguageSelected={handleLanguageSelectedChange} />
        <SettingContainer ref={settingRef}>
          <Setting onClick={handleClick}>
            <img src={setting} alt="setting" />
          </Setting>
          {openSetting && (
            <SettingWrap>
              <SettingContent>
                <SettingTitle>Categories</SettingTitle>
                <RadioCheckboxGroup
                  type={EGroupType.RADIO}
                  value={["Any", "Custom"]}
                  name="category1"
                  onRadioSelected={handleRadioSelectedChange}
                />
                <RadioCheckboxGroup
                  disabled={radioSelected === "Any"}
                  type={EGroupType.CHECKBOX}
                  value={category}
                  name="category2"
                  onCategorySelected={handleCategorySelectedChange}
                />
              </SettingContent>
              <SettingContent>
                <SettingTitle>BlackList</SettingTitle>
                <RadioCheckboxGroup
                  type={EGroupType.CHECKBOX}
                  value={blackList}
                  name="blackList1"
                  onBlackListSelected={handleBlackListSelectedChange}
                />
              </SettingContent>
            </SettingWrap>
          )}
        </SettingContainer>
      </RightContent>
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
  border-bottom: 1px solid white;
`;

const Logo = styled.button`
  color: inherit;
  padding: 0;
  font-size: 30px;
  cursor: pointer;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const SettingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Setting = styled.button`
  padding: 0;
  height: 35px;
`;

const SettingWrap = styled.div`
  position: absolute;
  width: 585px;
  border: 1px solid #fff;
  background-color: #282c34;
  border-radius: 10px;
  right: 30px;
  top: 70px;
  padding: 20px;
`;

const SettingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  &:first-child {
    margin-bottom: 22px;
  }
`;

const SettingTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

export default Header;
