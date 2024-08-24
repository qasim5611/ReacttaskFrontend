import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { ToastContainer } from "react-toastify";

import { Saveuser } from "../redux/slices/globalSlice";
export function Multipleform(props) {
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    dob: "",
    cnic: "",
    hobby: "",
    profession: "",
    image: null,
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    // Here you would typically send the form data to a server
    // alert("Form submitted successfully!");
    console.log("formData", formData);
    console.log("hitting..");

    let obj = {
      ...formData,
    };
    dispatch(Saveuser(obj));

    // await Saveuser(obj);
  };

  switch (currentStep) {
    case 1:
      return (
        <Step1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <Step2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <Step3
          formData={formData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      );
    default:
      return null;
  }

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
