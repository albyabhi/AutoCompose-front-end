import React from "react";
import styled from "styled-components";

// Define styled components
const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const LoginButton = styled.p`
  font-size: 1rem;
  cursor: pointer;
  background-color: #3b1c32; 
  border-radius: 15px;
   padding: 10px 20px;              
  color: white;              
  transition: background-color 0.3s ease, color 0.3s ease;  /* Smooth transition */

  &:hover {
    background-color: rgb(199, 173, 192);  /* Hover background color */
    color: #3b1c32;  /* Hover text color */
  }
`;


// Navbar component
const Navbar = () => {
  return (
    <NavContainer>
      <Title>AutoCompose</Title>
      <LoginButton>Login</LoginButton>
    </NavContainer>
  );
};

export default Navbar;
