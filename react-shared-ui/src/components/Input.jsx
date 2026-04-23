// FILE PURPOSE: Master Input component for the Federated Shared UI Library
import React, { useState } from 'react';

export default function Input({ type = 'text', placeholder, value, onChange, style = {}, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: isFocused ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
    background: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.2)' : 'none',
    boxSizing: 'border-box'
  };

  const combinedStyle = { ...baseStyle, ...style };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={combinedStyle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}
