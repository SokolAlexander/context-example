import React, { useRef } from 'react';

interface RenderCounterProps {
  componentName: string;
}

const counterStyle: React.CSSProperties = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  background: 'rgba(255, 0, 0, 0.7)',
  color: 'white',
  padding: '2px 5px',
  borderRadius: '3px',
  fontSize: '0.7em',
  fontWeight: 'bold',
  zIndex: 10, // Ensure it's above other content
};

const RenderCounter: React.FC<RenderCounterProps> = ({ componentName }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  console.log(`${componentName} rendering... Count: ${renderCount.current}`); // Keep log for verification if needed

  return (
    <span style={counterStyle} title={`${componentName} Render Count`}>
      R: {renderCount.current}
    </span>
  );
};

export default RenderCounter; 