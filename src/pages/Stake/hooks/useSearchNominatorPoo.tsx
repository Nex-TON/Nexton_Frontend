import { useEffect, useState } from "react";
import { NOMINATOR_LIST } from "../../../constants/Nominator";

export const useSearchNominatorPool = (searchInput: string) => {
  const [searchNominator, setSearchNominator] = useState(NOMINATOR_LIST);

  useEffect(() => {
    if (searchInput === "") {
      setSearchNominator(NOMINATOR_LIST);
    } else {
      setSearchNominator(
        NOMINATOR_LIST.filter((item) =>
          item.title.match(new RegExp(searchInput, "i"))
        )
      );
    }
  }, [searchInput]);

  const handleSearchNominatorPool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput === "") {
      setSearchNominator(NOMINATOR_LIST);
    } else {
      setSearchNominator(
        NOMINATOR_LIST.filter((item) => item.title.includes(searchInput))
      );
    }
  };

  return { searchNominator, handleSearchNominatorPool };
};
