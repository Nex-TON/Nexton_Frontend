import { useEffect, useState } from "react";

export const useCheckInputRules = (input: string) => {
  const [isUnderLimitAmount, setIsUnderLimitAmount] = useState(false);

  const handleCheckUnderLimitAmount = () => {
    if (input !== "" && Number(input) < 0.5) {
      setIsUnderLimitAmount(true);
    } else {
      setIsUnderLimitAmount(false);
    }
  };

  useEffect(() => {
    handleCheckUnderLimitAmount();
  }, [input]);

  return { isUnderLimitAmount };
};
