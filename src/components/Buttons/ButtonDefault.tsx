import React from "react";

type ButtonPropTypes = {
  label: string;
  link: string;
  customClasses?: string;
  onClick?: () => void; // Add this line to accept onClick
  disabled?: boolean;
};

const ButtonDefault: React.FC<ButtonPropTypes> = ({
  label,
  link,
  customClasses,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={`button ${customClasses}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ButtonDefault;
