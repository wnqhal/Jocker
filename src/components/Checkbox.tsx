import styled from "styled-components";

interface CheckboxProps {
  value: string[];
  // name: string;
}

const Checkbox = ({ value }: CheckboxProps) => {
  return (
    <CheckboxWrap>
      {value.map((v, i) => (
        <CheckboxLabel key={i}>
          <input type="checkbox" id={v} name={v} />
          {v}
        </CheckboxLabel>
      ))}
    </CheckboxWrap>
  );
};

const CheckboxWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
`;

export default Checkbox;
