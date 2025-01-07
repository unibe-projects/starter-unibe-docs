interface MessageLoadingButton {
    text: string;
  }

const LoadingButton: React.FC<MessageLoadingButton> = ({ text }) => {
  return (
    <span className="flex justify-center items-center">
      <svg
        className="w-5 h-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-25"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M4 12a8 8 0 0116 0"
          className="opacity-75"
        />
      </svg>
      <span className="ml-2">{text}</span>
    </span>
  );
};

export default LoadingButton;
