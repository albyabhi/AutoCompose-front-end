import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Styled component with dotted border and max width/height
const ResultContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
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

const CopyButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
  
  &:hover {
    background-color: #45a049;
  }
`;

// Function to preserve formatting and break text
const preserveFormat = (text) => {
  return text ? text.replace(/\n/g, '<br />') : '';  // Check if text exists
};

const Result = ({ data }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);  // To track completion
  const [copy , setCopy] = useState('Copy to Clipboard')

  // Use the correct property: data.emailContent
  const words = preserveFormat(data?.emailContent || '').split(/\s+/); 
  const bodyRef = useRef(null);  // Reference to the body container for copying

  // Function to simulate word-by-word generation
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayedText((prev) => prev + ' ' + words[currentWordIndex]);
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        clearInterval(interval);
        setIsCompleted(true); // Set to true when the simulation is complete
      }
    }, 100); // Adjust the speed here (in ms)
    return () => clearInterval(interval);
  }, [currentWordIndex, words]);

  // Function to copy the body to the clipboard with formatting
  const copyToClipboard = () => {
    const text = bodyRef.current.innerText;  // Get the plain text with formatting but no styling
    const textarea = document.createElement('textarea');
    textarea.value = text;  // Set text content
    document.body.appendChild(textarea);
    textarea.select();  // Select the text
    document.execCommand('copy');  // Execute the copy command
    document.body.removeChild(textarea);  // Clean up the textarea element
    setCopy('Copied to Clipboard !')
  };

  return (
    <ResultContainer>
      <div>
        <h3>Generated Body:</h3>
        <div
          ref={bodyRef}
          dangerouslySetInnerHTML={{
            __html: displayedText,  // Render the progressively generated text
          }}
        />
        {isCompleted && (
          <CopyButton onClick={copyToClipboard}>{copy}</CopyButton>
        )}
      </div>
    </ResultContainer>
  );
};

export default Result;
