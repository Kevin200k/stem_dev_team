// SparkleStar.jsx
export default function SparkleStar({ size = 16, color = "#9379f4", className = "" }) {
   return (
       <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Slim, minimal curved star */}
      <path d="M12 2C12.1 4 12.8 5 14.5 5.2C12.8 5.4 12.1 6.5 12 8.5C11.9 6.5 11.2 5.4 9.5 5.2C11.2 5 11.9 4 12 2Z" />
    </svg>
  );
}