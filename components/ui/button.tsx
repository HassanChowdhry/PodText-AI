import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;