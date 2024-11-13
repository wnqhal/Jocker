import LanSelect from "../components/LanSelect";
import RadioGroup, { Radio } from "../components/Radio";

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
      <Radio value="Any" name="name" />
      <RadioGroup value={["Any", "Custom"]} name="group1" />
    </div>
  );
};

export default SamplePage;
