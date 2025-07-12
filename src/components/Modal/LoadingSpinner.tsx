import { RingLoader } from "react-spinners";

interface LoadingSpinnerProps {
  smallHeight?: boolean; // optional prop
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[350px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center
      mx-auto `}
    >
      <RingLoader size={150} color="red" />
    </div>
  );
};

export default LoadingSpinner;
