import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'ai', 'outline', 'ghost'
  size = 'md',        // 'sm', 'md', 'lg'
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-stone transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary: "bg-terracotta hover:bg-terracotta-deep text-white shadow-warm-sm hover:shadow-terracotta-glow focus:ring-terracotta",
    secondary: "bg-canvas-card hover:bg-sandstone-300 text-umber border border-sandstone-400/60 focus:ring-umber",
    ai: "bg-umber hover:bg-umber-dark text-sandstone-50 border border-gold/50 shadow-ai-bloom focus:ring-gold",
    outline: "bg-transparent hover:bg-sandstone-200/60 text-umber border border-umber focus:ring-umber",
    ghost: "bg-transparent hover:bg-sandstone-200/50 text-umber-light hover:text-umber focus:ring-sandstone-400",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
