import React from 'react';
import styled from 'styled-components';

// Styled component with dotted border and max width/height
const ResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  border: 2px dashed white; /* Dotted/dashed border */
  padding: 30px 170px;
  border-radius: 8px;
  max-width: 800px;
  margin: 20px auto;    
  overflow: auto;  /* Scroll if content overflows */
  
  
  box-sizing: border-box;

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    padding: 30px 10px;
    margin: 20px 20px;
  }
`;



const Result = () => {
  return (
    <ResultContainer>
      Result
    </ResultContainer>
  );
};

export default Result;
