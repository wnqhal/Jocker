import styled from "styled-components";

interface RadioProps {
  value: string;
  name: string;
}

interface RadioGroupProps {
  value: string[];
  name: string;
}

export const Radio = ({ value, name }: RadioProps) => {
  return (
    <Label>
      <RadioBtn type="radio" name={name} value={value} />
      {value}
    </Label>
  );
};

export const RadioGroup = ({ value, name }: RadioGroupProps) => {
  return (
    <RadioButtonGroup>
      {value.map((v, i) => (
        <Radio key={i} value={v} name={name} />
      ))}
    </RadioButtonGroup>
  );
};

const RadioBtn = styled.input`
  &[type="radio"] {
    appearance: none;
    width: 12px;
    height: 12px;
    border: 1px solid #fff;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
  }
  &[type="radio"]:checked {
    background-color: #7825c5; // 체크 시 내부 원 색상
    border: 3px solid #282c34; // 라인이 아닌, 라인과 원 사이 색상
    box-shadow: 0 0 0 1px #7825c5; // 라인
  }
`;

const Label = styled.label`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  cursor: pointer;
`;

const RadioButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export default RadioGroup;
