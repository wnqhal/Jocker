import LanSelect from "../components/LanSelect";
import RadioGroup, { EGroupType } from "../components/RadioCheckbox";

const SamplePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 100,
        gap: 50,
      }}
    >
      <LanSelect />
      <RadioGroup
        type={EGroupType.RADIO}
        value={["Any", "Custom"]}
        name="group1"
        onRadioSelected={() => {}}
      />
      <RadioGroup
        type={EGroupType.CHECKBOX}
        value={["Hello", "HIII"]}
        name="group1"
        onRadioSelected={() => {}}
      />
      <RadioGroup
        type={EGroupType.RADIO}
        value={["Any", "Custom"]}
        name="group1"
        onRadioSelected={() => {}}
        disabled
      />
      <RadioGroup
        type={EGroupType.CHECKBOX}
        value={["Hello", "HIII"]}
        name="group1"
        onRadioSelected={() => {}}
        disabled
      />
    </div>
  );
};

export default SamplePage;
