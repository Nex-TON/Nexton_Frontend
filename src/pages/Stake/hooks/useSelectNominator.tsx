import { useState } from "react";

import { INominatorList } from "@/hooks/api/useNominatorList";

export const useSelectNominator = (nominatorList: INominatorList[]) => {
  const [selectedNominator, setSelectedNominator] = useState<INominatorList>(null);

  const handleSelectNominator = id => {
    setSelectedNominator(prevSelected =>
      prevSelected && prevSelected.id === id ? null : nominatorList.find(nominator => nominator.id === id),
    );
  };

  return { selectedNominator, handleSelectNominator };
};
