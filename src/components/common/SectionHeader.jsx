import React from 'react';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  action
}) {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end'
  }[align];

  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 ${align === 'center' ? 'sm:justify-center' : ''}`}>
      <div className={`flex flex-col ${alignClass} max-w-2xl`}>
        {eyebrow && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="h-px w-6 bg-terracotta inline-block" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta">
              {eyebrow}
            </span>
          </div>
        )}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-umber tracking-tight leading-snug">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-xs sm:text-sm text-umber-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
