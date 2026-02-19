interface IconProps {
  className?: string
}

export function BugIcon({ className }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M8 7C8 5.89543 8.89543 5 10 5H14C15.1046 5 16 5.89543 16 7V15C16 17.2091 14.2091 19 12 19C9.79086 19 8 17.2091 8 15V7Z" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      <path 
        d="M16 11H20M4 11H8M16 15H19M5 15H8M14 5L16 3M10 5L8 3" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  )
}