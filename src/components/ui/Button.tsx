import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text' | 'outline' | 'cyberpunk';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  animate?: boolean;
  glowing?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  animate = true,
  glowing = false,
  className,
  ...props
}: ButtonProps) => {
  // Map variants to class names
  const variantClassMap = {
    primary: 'futuristic-button',
    secondary: 'futuristic-button-secondary',
    text: 'text-white hover:text-neon-purple transition-colors',
    outline: 'border border-neon-purple/50 hover:border-neon-purple text-white hover:bg-neon-purple/10 rounded-full transition-all',
    cyberpunk: 'cyberpunk-button',
  };

  // Map sizes to class names
  const sizeClassMap = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8',
  };

  // Apply glowing effect if enabled
  const glowingClass = glowing ? 'shadow-neon hover:shadow-neon-strong' : '';

  // Combine all classes
  const buttonClasses = cn(
    variantClassMap[variant],
    sizeClassMap[size],
    fullWidth ? 'w-full' : '',
    glowingClass,
    className
  );

  // Button content
  const getContent = () => (
    <>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
      {!icon && variant === 'primary' && <ArrowRight className="w-4 h-4" />}
    </>
  );

  // External link
  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        target="_blank" 
        rel="noopener noreferrer"
      >
        {getContent()}
      </a>
    );
  }

  // Internal route link
  if (to) {
    return (
      <Link 
        to={to} 
        className={buttonClasses}
      >
        {getContent()}
      </Link>
    );
  }

  // Animated button
  if (animate) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={buttonClasses}
        {...props}
      >
        {getContent()}
      </motion.button>
    );
  }

  // Standard button
  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {getContent()}
    </button>
  );
};

export default Button;