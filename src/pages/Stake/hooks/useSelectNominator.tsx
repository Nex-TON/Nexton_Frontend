import { useState } from "react";

import { INominator, NOMINATOR_LIST } from "@/constants/Nominator";

export const useSelectNominator = () => {
  const [selectedNominator, setSelectedNominator] = useState<INominator>(null);

  const handleSelectNominator = id => {
    setSelectedNominator(prevSelected =>
      prevSelected && prevSelected.id === id ? null : NOMINATOR_LIST.find(nominator => nominator.id === id),
    );
  };

  return { selectedNominator, handleSelectNominator };
};
