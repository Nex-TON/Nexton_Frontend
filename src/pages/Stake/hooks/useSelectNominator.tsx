import { useState } from "react";

export const useSelectNominator = () => {
  const [isSelectedNominator, setIsSelectedNominator] = useState(
    Array(3).fill(false)
  );

  const handleSelectNominator = (nominatorIdx: number) => {
    const updatedNomintorList = Array(3).fill(false);
    updatedNomintorList[nominatorIdx] = !isSelectedNominator[nominatorIdx];
    setIsSelectedNominator(updatedNomintorList);
  };

  return { isSelectedNominator, handleSelectNominator };
};
