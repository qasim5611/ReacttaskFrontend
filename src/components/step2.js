import React from "react";

const Step2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateAndNext = () => {
    if (formData.email && formData.phone) {
      nextStep();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div style={{ marginBottom: "200px" }}>
      <h2>Step 2: Contact Information</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="number"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />
      <input type="file" name="image" onChange={handleChange} />
      <button onClick={prevStep}>Back</button>
      <button onClick={validateAndNext}>Next</button>
    </div>
  );
};

export default Step2;
