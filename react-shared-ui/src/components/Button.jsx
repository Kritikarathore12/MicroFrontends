// FILE PURPOSE: Master Button component for the Federated Shared UI Library
import React from 'react';

export default function Button({ children, onClick, variant = 'primary', style = {}, ...props }) {
  const baseStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      color: 'white',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#cbd5e1',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    danger: {
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
      color: 'white',
    }
  };

  const combinedStyle = { ...baseStyle, ...variants[variant], ...style };

  return (
    <button 
      onClick={onClick} 
      style={combinedStyle}
      onMouseOver={(e) => {
        if (variant === 'primary') e.target.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.5)';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.target.style.boxShadow = baseStyle.boxShadow;
        e.target.style.transform = 'translateY(0)';
      }}
      {...props}
    >
      {children}
    </button>
  );
}
