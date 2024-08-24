import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Step1 from "./../step1";
import Step2 from "./../step2";
import Step3 from "./../step3";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Saveuser } from "./../../redux/slices/globalSlice";
export default function UserCreate(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(Saveuser(formData))
      .unwrap()
      .then((result) => {
        console.log("User added successfully", result);
        if (result.msg === "User Added Successfully") {
          toast.success("User Added Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate("/");
        } else if (result.msg === "Email already exists") {
          toast.warn("Email already exists", {
            position: "top-right",
            autoClose: 5000,
          });
        }
        // Navigate to a new route on success
      })
      .catch((error) => {
        console.error("Failed to add user:", error);
        toast.error("Check Your Form Correctly! Email already exists", {
          position: "top-right",
          autoClose: 5000,
        });
      });

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
