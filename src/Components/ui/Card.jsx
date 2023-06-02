import React from "react";

const Card = ({
  children,
  title,
  subtitle,
  headerslot,
  className = "custom-class",
  bodyClass = "p-6",
  noborder,
  titleClass = "custom-class",
}) => {
  return (
    <div
      className={`
        card rounded-md bg-white   
        border border-slate-200 drop-shadow-md
        ${className}
      `}
    >
      {(title || subtitle) && (
        <header className="card-header border border-slate-200 bg-gray-50 flex items-start justify-between px-6 pt-6 pb-3">
          <div>
            {title && <div className={`card-title ${titleClass}`}>{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {headerslot && <div className="card-header-slot">{headerslot}</div>}
        </header>
      )}
      <main className={`card-body ${bodyClass}`}>{children}</main>
    </div>
  );
};

export default Card;
