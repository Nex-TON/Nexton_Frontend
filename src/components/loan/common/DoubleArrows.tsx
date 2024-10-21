export const DoubleArrows = ({ stroke, direction }: { stroke: string; direction: "up" | "down" }) => {
    return direction === "up" ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M7.19981 10.8L11.9998 6L16.7998 10.8M7.19981 18L11.9998 13.2L16.7998 18"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M16.8002 13.2L12.0002 18L7.2002 13.2M16.8002 6L12.0002 10.8L7.2002 6"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };