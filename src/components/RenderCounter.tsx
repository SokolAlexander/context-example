import { useRef, useEffect } from 'react';

interface RenderCounterProps {
  componentName: string;
}

export const RenderCounter = ({ componentName }: RenderCounterProps) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      background: '#ff000033',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '12px',
    }}>
      {componentName} renders: {renderCount.current}
    </div>
  );
}; 