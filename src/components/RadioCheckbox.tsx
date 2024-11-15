import { useEffect, useState } from "react";
import styled from "styled-components";
import checkicon from "../asset/imgs/checkmark.png";
interface RadioCheckboxGroupProps {
  value: string[];
  name: string;
  type: EGroupType;
  disabled?: boolean;
  onRadioSelected?: (selectedValue: string) => void;
  onCategorySelected?: (selectedValue: string[]) => void;
  onBlackListSelected?: (selectedValue: string[]) => void;
}

export enum EGroupType {
  CHECKBOX,
  RADIO,
}

export const RadioCheckboxGroup = ({
  value,
  name,
  type,
  disabled = false,
  onRadioSelected,
  onCategorySelected,
  onBlackListSelected,
}: RadioCheckboxGroupProps) => {
  const [radioSelected, setRadioSelected] = useState<string>(value[0]);
  const [checkboxSelected, setCheckboxSelected] = useState<string[]>([]);

  const handleRadioSelect = (v: string) => {
    setRadioSelected(v);
    onRadioSelected?.(v);
  };

  const handleCheckboxSelect = (v: string) => {
    setCheckboxSelected((prev) =>
      prev.includes(v) ? prev.filter((item) => item !== v) : [...prev, v]
    );
  };

  useEffect(() => {
    if (onCategorySelected) {
      onCategorySelected(checkboxSelected);
    }
    if (onBlackListSelected) {
      onBlackListSelected(checkboxSelected);
    }
  }, [checkboxSelected, onCategorySelected, onBlackListSelected]);

  return (
    <GroupWrapper>
      {value.map((v, i) => (
        <Label key={i} disabled={disabled}>
          {type === EGroupType.RADIO ? (
            <RadioBtn
              disabled={disabled}
              type="radio"
              checked={radioSelected === v}
              name={name}
              value={v}
              onChange={() => handleRadioSelect(v)}
            />
          ) : (
            <Checkbox
              disabled={disabled}
              type="checkbox"
              name={name}
              value={v}
              checked={checkboxSelected.includes(v)}
              onChange={() => handleCheckboxSelect(v)}
            />
          )}
          {v}
        </Label>
      ))}
    </GroupWrapper>
  );
};

const RadioBtn = styled.input<{ disabled: boolean }>`
  &[type="radio"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid
      ${({ disabled }) => (disabled ? "rgba(148, 141, 154, 0.5)" : "#fff")};
    border-radius: 50%;
    outline: none;
    ${({ disabled }) => disabled && "pointer-events: none"};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  }
  &[type="radio"]:checked {
    background-color: ${({ disabled }) =>
      disabled ? "rgba(148, 141, 154, 0.5)" : "#7825c5"};
    border: 3px solid #282c34;
    box-shadow: 0 0 0 1px
      ${({ disabled }) => (disabled ? "rgba(148, 141, 154, 0.5)" : "#7825c5")};
  }
`;

const Checkbox = styled.input<{ disabled: boolean }>`
  &[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid
      ${({ disabled }) => (disabled ? "rgba(148, 141, 154, 0.5)" : "#fff")};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  }

  &[type="checkbox"]:checked {
    background-color: ${({ disabled }) =>
      disabled ? "rgba(148, 141, 154, 0.5)" : "#7825c5"};
    border-color: ${({ disabled }) =>
      disabled ? "rgba(148, 141, 154, 0.5)" : "#7825c5"};
  }

  &[type="checkbox"]:checked::after {
    content: "";
    display: inline-block;
    background: url(${checkicon}) center center no-repeat;
    background-size: contain;
    width: 11px;
    height: 11px;
    margin-top: 3px;
    margin-left: 3px;
  }
`;

const Label = styled.label<{ disabled: boolean }>`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  ${({ disabled }) =>
    disabled ? "color: rgba(148, 141, 154, 0.5)" : "color: inherit"}
`;

const GroupWrapper = styled.div`
  display: flex;
  gap: 13px;
`;

export default RadioCheckboxGroup;
