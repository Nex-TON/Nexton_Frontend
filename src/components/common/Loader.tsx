import { TailSpin } from "react-loader-spinner";

const Loader = ({ height = 25, width = 25 }: { height?: number; width?: number }) => {
  return (
    <TailSpin
      visible={true}
      height={String(height)}
      width={String(width)}
      color="#007aff"
      ariaLabel="tail-spin-loading"
      radius="4"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
