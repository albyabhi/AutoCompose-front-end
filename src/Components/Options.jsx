import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Result from "./Result";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  border: 1px solid white;
  padding: 30px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  min-height: 40px;
  &:focus {
    outline: none;
    border-color: #3b1c32;
  }
`;

const RangeInput = styled.input`
  width: 100%;
  height: 8px;
  background: linear-gradient(to right, #3b1c32, #5e4b8a);
  cursor: pointer;
  &::-webkit-slider-thumb,
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #3b1c32;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  &:hover::-webkit-slider-thumb,
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
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Suggestions = {
  "Interview Application": "Provide qualifications, skills, experience, and availability.",
  "Leave Email": "Specify the reason, duration, and any supporting documents.",
  "Meeting Invitation": "Mention the date, time, agenda, and participants.",
  "Complaint": "Describe the issue, relevant details, and any previous attempts to resolve it.",
  "Appreciation": "Express gratitude, specify contributions, and highlight the impact.",
  "Follow-up Email": "Reiterate key points from the last conversation and request updates if needed.",
  "Job Offer Letter": "Include job role, salary, benefits, start date, and acceptance instructions.",
  "Resignation Letter": "Mention resignation date, reason (if necessary), and express gratitude for the experience.",
  "Welcome Email": "Introduce the recipient to the organization, provide key resources, and set expectations.",
  "Newsletter": "Summarize updates, upcoming events, and valuable content for the audience.",
  "Promotion Email": "Highlight the benefits of a product or service with a compelling call to action.",
  "Survey Invitation": "Explain the purpose of the survey, estimated completion time, and provide a link.",
  "Feedback Request": "Politely ask for feedback on a product, service, or experience with a clear call to action.",
  "Company Announcement": "Share important updates, policy changes, or achievements concisely.",
  "Thank You Email": "Express appreciation for an action, support, or contribution in a personalized manner.",
  "Password Reset": "Provide a secure link for password reset and instructions for setting a new password.",
  "Account Verification": "Include a verification link or code and instructions for account activation.",
  "Order Confirmation": "Acknowledge the order with details, expected delivery time, and tracking options.",
  "Shipping Update": "Provide tracking details, estimated delivery date, and contact support information if needed.",
  "Event Invitation": "Include event details, RSVP instructions, and key reasons to attend.",
  "Referral Email": "Explain the referral program, benefits, and steps to refer someone.",
  "Support Ticket": "Acknowledge the issue, provide a ticket number, and mention response time expectations.",
  "Invoice Email": "Attach the invoice, mention due date, payment methods, and contact details for inquiries.",
  "Cancellation Notice": "Confirm the cancellation, mention any refund policies, and offer alternatives if applicable.",
  "Recommendation Letter": "Highlight strengths, experiences, and why the person is suitable for the opportunity.",
  "Reminder Email": "Gently remind about an upcoming deadline, event, or action required."
};

const EMAIL_TYPES = {
  INTERVIEW: "Interview Application",
  LEAVE: "Leave Email",
  MEETING: "Meeting Invitation",
  COMPLAINT: "Complaint",
  APPRECIATION: "Appreciation",
  FOLLOW_UP: "Follow-up Email",
  OFFER_LETTER: "Job Offer Letter",
  RESIGNATION: "Resignation Letter",
  WELCOME: "Welcome Email",
  NEWSLETTER: "Newsletter",
  PROMOTION: "Promotion Email",
  SURVEY: "Survey Invitation",
  FEEDBACK: "Feedback Request",
  ANNOUNCEMENT: "Company Announcement",
  THANK_YOU: "Thank You Email",
  PASSWORD_RESET: "Password Reset",
  ACCOUNT_VERIFICATION: "Account Verification",
  ORDER_CONFIRMATION: "Order Confirmation",
  SHIPPING_UPDATE: "Shipping Update",
  EVENT_INVITATION: "Event Invitation",
  REFERRAL: "Referral Email",
  SUPPORT_TICKET: "Support Ticket",
  INVOICE: "Invoice Email",
  CANCELLATION: "Cancellation Notice",
  RECOMMENDATION: "Recommendation Letter",
  REMINDER: "Reminder Email",
};

const Options = () => {
  const [emailData , setEmailData] = useState('');
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  console.log(apiUrl)
  const [formData, setFormData] = useState({
    name: "",
    emailType: "",
    standardness: 3,
    details: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDetailsChange = (e) => {
    setFormData((prev) => ({ ...prev, details: e.target.value }));
    e.target.style.height = "40px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${apiUrl}/gen/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send data");
      }
  
      const result = await response.json();
      console.log("Response from backend:", result);
      setEmailData(result);
    } catch (error) {
      console.error("Error:", error.message);
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="emailType">Email Type:</Label>
          <Input
            type="text"
            id="emailType"
            name="emailType"
            value={formData.emailType}
            onChange={handleChange}
            list="emailTypeOptions"
            required
          />
          <datalist id="emailTypeOptions">
            {Object.values(EMAIL_TYPES).map((type) => (
              <option key={type} value={type} />
            ))}
          </datalist>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="details">Additional Details:</Label>
          <TextArea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleDetailsChange}
            placeholder={Suggestions[formData.emailType] || "Provide relevant details..."}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="standardness">Standardness Level:</Label>
          <RangeInput
            type="range"
            id="standardness"
            name="standardness"
            min="1"
            max="5"
            value={formData.standardness}
            onChange={handleChange}
          />
          <span>{formData.standardness}</span>
        </FormGroup>

        <SubmitButton type="submit">Generate</SubmitButton>
      </Form>
      {emailData !== '' && <Result data={emailData} />}
    </FormContainer>
  );
};

export default Options;
