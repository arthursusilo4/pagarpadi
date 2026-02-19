interface IconProps {
  className?: string
}

export function PlantIcon({ className }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 22V12M12 12C12 8.68629 14.6863 6 18 6C18 9.31371 15.3137 12 12 12ZM12 12C12 8.68629 9.31371 6 6 6C6 9.31371 8.68629 12 12 12Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}