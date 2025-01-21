import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const FormContainer = styled.div`
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3b1c32;
  }
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
`;

const LeaveForm = ({ leaveReason, setLeaveReason, startDate, setStartDate, endDate, setEndDate, details, setDetails }) => {

  const reasons = ["sick", "occasion", "other"];

  return (
    <>
    <FormGroup>
      <Label htmlFor="leaveReason">Reason for Leave:</Label>
      <Select
        id="leaveReason"
        value={leaveReason}
        onChange={(e) => setLeaveReason(e.target.value)}
      >
        <option value="">Select</option>
        {reasons.map((reason, index) => (
          <option key={index} value={reason}>
            {reason}
          </option>
        ))}
      </Select>
    </FormGroup>

    {leaveReason === "other" && (
      <FormGroup>
        <Label htmlFor="details">Additional Details (optional):</Label>
        <Textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Explain the reason for your leave, if necessary."
        />
      </FormGroup>
    )}

    <FormGroup>
      <Label htmlFor="startDate">Start Date:</Label>
      <Input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
    </FormGroup>

    <FormGroup>
      <Label htmlFor="endDate">End Date:</Label>
      <Input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        
      />
    </FormGroup>
  </>
  );
};

export default LeaveForm;
