import { useEffect, useState } from "react";

import { useStakeInfo } from "../../../hooks/api/useStakeInfo";
import useTonConnect from "../../../hooks/contract/useTonConnect";
import { DDayChange } from "../../../utils/dateChanger";
import { getNftState } from "@/utils/getNftState";

const useMyAssetFilter = () => {
  const { address } = useTonConnect();
  const [checkPeriod, setCheckPeriod] = useState([false, false, false, false]);
  const { nftList } = useStakeInfo(address);

  const handleCheckPeriod = (type: string) => {
    const periodMapping = {
      Ongoing: 0,
      Forthcoming: 1,
      Expired: 2,
      All: 3,
    };

    const newCheckPeriod = [...checkPeriod];
    if (type === "All") {
      const newState = newCheckPeriod[3] ? [false, false, false, false] : [false, false, false, true];
      setCheckPeriod(newState);
    } else {
      const index = periodMapping[type];
      if (newCheckPeriod[index]) {
        newCheckPeriod[index] = false;
      } else {
        newCheckPeriod[index] = true;
        newCheckPeriod[3] = false;
      }
      setCheckPeriod(newCheckPeriod);
    }
  };

  const handlePrintMyAssetFilter = () => {
    return nftList?.filter(item => {
      const nftState = getNftState(item.unstakableDate); // NFT 상태 계산 ("ongoing", "forthcoming", "expired")
  
      return (
        (checkPeriod[0] && nftState === "ongoing") ||
        (checkPeriod[1] && nftState === "forthcoming") ||
        (checkPeriod[2] && nftState === "expired") ||
        checkPeriod[3] // "All" 선택 시
      );
    });
  };

  return {
    checkPeriod,
    handleCheckPeriod,
    handlePrintMyAssetFilter,
  };
};
export default useMyAssetFilter;
