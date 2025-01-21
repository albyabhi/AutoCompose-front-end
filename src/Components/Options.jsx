import React, { useState } from "react";
import styled from "styled-components";
import generateIcon from "../assets/stars.png";
import LeaveForm from "../forms/LeaveForm";


const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  border: 1px solid white; /* Corrected border syntax */
  padding: 30px 170px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b1c32;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b1c32;
  }
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: linear-gradient(to right, #3b1c32, #5e4b8a);
  outline: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 5px;
    background: transparent;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #3b1c32;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #3b1c32;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  &:focus {
    background: linear-gradient(to right, #3b1c32 , #5e4b8a);
  }

  &:hover::-webkit-slider-thumb {
    transform: scale(1.2);
  }

  &:hover::-moz-range-thumb {
    transform: scale(1.2);
  }
`;



const SubmitButton = styled.button`
  background-color: rgb(67, 60, 213);
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a1f2a;
  }
  img {
    width: 20px; /* Set the desired width */
    height: 20px; /* Set the desired height */
    margin-left: 10px; /* Add spacing between text and icon */
  }
`;

const Options = () => {
  const [name, setName] = useState("");
  const [emailType, setEmailType] = useState("");
  const [standardness, setStandardness] = useState(1);
  const [leaveReason, setLeaveReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState("");
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  
  const emailTypes = [
    "Interview Application",
  "Leave Email",
  "Meeting Invitation",
  "Complaint",
  "Appreciation",
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = { name, emailType, standardness, leaveReason, startDate, endDate, details };
try {
  const response = await fetch(`${apiUrl}/gen/Generate`, {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),  // Send JSON instead of FormData
  });

  if (!response.ok) {
    throw new Error('Failed to submit the form');
  }

  const data = await response.json(); 
  console.log(data); 

} catch (error) {
  console.error('Error:', error); 
}
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="emailType">Email Type:</Label>
          <Select
            id="emailType"
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
            required
          >
            <option value="">Select Email Type</option>
            {emailTypes.map((type, index)=>(
              <option key={index} value={type} >{type}</option>
            ))}
          </Select>
        </FormGroup>

        {emailType === "Leave Email" && (
          <LeaveForm
            leaveReason={leaveReason}
            setLeaveReason={setLeaveReason}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            details={details}
            setDetails={setDetails}
          />
        )}

        <FormGroup>
          <Label htmlFor="standardness">Standardness Level:</Label>
          <RangeInput
            type="range"
            id="standardness"
            min="1"
            max="5"
            value={standardness}
            onChange={(e) => setStandardness(e.target.value)}
          />
          <span>{standardness}</span>
        </FormGroup>

        <SubmitButton type="submit">
          Generate<img src={generateIcon} />
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default Options;
