import React from "react";

const Step3 = ({ formData, prevStep, handleSubmit }) => {
  if (formData) {
    console.log("formData all", formData);
  }
  return (
    <div style={{ marginBottom: "200px" }}>
      <h2>Step 3: Review and Submit</h2>
      <p>First Name: {formData.firstName}</p>
      <p>Last Name: {formData.lastName}</p>
      <p>Email: {formData.email}</p>
      <p>Phone: {formData.phone}</p>
      <button onClick={prevStep}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Step3;
