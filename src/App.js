import { useState } from "react";
import Select from "react-select";
import CourseStructure from "./utils/global.js";
import "./App.css";

function App() {
  const [feeType, selectFeeType] = useState("");
  const [nationalityType, selectNationalityType] = useState("");
  const [courseType, selectCourseType] = useState("");
  const [levelType, selectLevelType] = useState("");
  const [amount, setAmount] = useState(0);
  const courseTypes = [
    { value: "Medical", label: "Medical" },
    { value: "Dental", label: "Dental" },
    { value: "Ayurveda", label: "Ayurveda" },
  ];

  const feeTypes = () => {
    let feeTypeArray = [];
    {
      Object.keys(CourseStructure).map((keyName, i) =>
        feeTypeArray.push({ value: keyName, label: keyName })
      );
    }

    return feeTypeArray;
  };

  const nationalityTypes = () => {
    let nationalityTypeArray = [];
    {
      Object.keys(CourseStructure[feeType]).map((keyName, i) =>
        nationalityTypeArray.push({ value: keyName, label: keyName })
      );
    }
    return nationalityTypeArray;
  };

  const levelTypes = () => {
    let levelTypeArray = [];
    {
      Object.keys(
        CourseStructure[feeType][nationalityType]["ALL_COURSES​"]
      ).map((keyName, i) => {
        if (keyName === "ALL_LEVEL​") {
          levelTypeArray = [
            { value: "UG", label: "UG" },
            { value: "PG", label: "PG" },
            { value: "DIPLOMA", label: "DIPLOMA" },
            { value: "Ph.D", label: "Ph.D" },
          ];
        } else {
          levelTypeArray.push({ value: keyName, label: keyName });
        }
      });
    }
    return levelTypeArray;
  };

  const level = (levelType) => {
    if (levelType) {
      selectLevelType(levelType);
      if (
        CourseStructure[feeType][nationalityType]["ALL_COURSES​"][levelType]
      ) {
        setAmount(
          CourseStructure[feeType][nationalityType]["ALL_COURSES​"][levelType][
            "amount"
          ]
        );
      } else {
        setAmount(
          CourseStructure[feeType][nationalityType]["ALL_COURSES​"][
            "ALL_LEVEL​"
          ]["amount"]
        );
      }
    } else {
      selectLevelType("");
      setAmount(0);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center py-3"> Check The Fee Structure</h1>
      <Select
        value={
          feeType
            ? { value: feeType, label: feeType }
            : { value: "", label: "Select Fee Type" }
        }
        className="py-3"
        options={feeTypes()}
        onChange={(val) => {
          selectNationalityType("");
          selectCourseType("");
          setAmount(0);
          selectFeeType(val.value);
        }}
      />
      {feeType && (
        <Select
          value={
            nationalityType
              ? { value: nationalityType, label: nationalityType }
              : { value: "", label: "Select Nationality Type" }
          }
          className="py-3"
          options={nationalityTypes()}
          onChange={(val) => {
            selectNationalityType(val.value);
            selectCourseType("");
            setAmount(0);
          }}
        />
      )}
      {nationalityType && (
        <Select
          value={
            courseType
              ? { value: courseType, label: courseType }
              : { value: "", label: "Select Course Type" }
          }
          className="py-3"
          options={courseTypes}
          onChange={(val) => {
            selectCourseType(val.value);
            levelTypes();
            selectLevelType("");
            setAmount(0);
          }}
        />
      )}
      {courseType && (
        <Select
          value={
            levelType
              ? { value: levelType, label: levelType }
              : { value: "", label: "Select Level Type" }
          }
          className="py-3"
          placeholder="Select Level Type"
          options={levelTypes()}
          onChange={(val) => level(val.value)}
        />
      )}
      {amount > 0 && <h1 className="text-center py-3"> Total Fee: {amount}</h1>}
    </div>
  );
}

export default App;
