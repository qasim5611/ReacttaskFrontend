import React from "react";

const Step1 = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateAndNext = () => {
    if (formData.firstName && formData.lastName) {
      nextStep();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div style={{ marginBottom: "200px" }}>
      <h2>Step 1: Personal Information</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="Date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
          type="text"
          maxLength={13}
          name="cnic"
          placeholder="CNIC"
          value={formData.cnic}
          onChange={handleChange}
        />
        <input
          type="text"
          name="hobby"
          placeholder="Hobby"
          value={formData.hobby}
          onChange={handleChange}
        />
        <input
          type="text"
          name="profession"
          placeholder="Profession"
          value={formData.profession}
          onChange={handleChange}
        />
      </div>
      <button onClick={validateAndNext}>Next</button>
    </div>
  );
};

export default Step1;
