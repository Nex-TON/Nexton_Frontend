import { useEffect, useState } from "react";

import { useStakeInfo } from "../../../hooks/api/useStakeInfo";
import useTonConnect from "../../../hooks/contract/useTonConnect";
import { DDayChange } from "../../../utils/dateChanger";

const useMyAssetFilter = () => {
  const { address } = useTonConnect();
  // all 클릭 했을 때 나머지 리스트 opacity 관리 하는 state
  const [activeOpacity, setActiveOpacity] = useState(false);
  //클릭한 리스트 관리 하는 state
  const [checkPeriod, setCheckPeriod] = useState([false, false, false, false]);
  //ongoing,all 클릭 했을 떄 border 관리 하기 위한 state
  const [period, setPeriod] = useState("Filter");
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const { nftList } = useStakeInfo(address);

  const handleToggleFilter = () => {
    setIsOpenFilter((prev) => !prev);
  };

  const handleCheckPeriod = (type: string) => {
    const defaultCheck = [false, false, false, false];

    const periodMapping = {
      Ongoing: [true, false, false, false],
      Forthcoming: [false, true, false, false],
      Expired: [false, false, true, false],
      All: [false, false, false, true],
    };

    handleToggleFilter();

    if (periodMapping[type]) {
      setCheckPeriod(periodMapping[type]);
      setActiveOpacity(type === "All");
      setPeriod(type);
    } else {
      setCheckPeriod(defaultCheck);
    }
  };

  const handlePrintMyAssetFilter = () => {
    switch (period) {
      case "Ongoing":
        return nftList?.filter(
          (item) => DDayChange(item.timeStamp, item.lockPeriod) > 15
        );
      case "Forthcoming":
        return nftList?.filter(
          (item) =>
            DDayChange(item.timeStamp, item.lockPeriod) <= 15 &&
            DDayChange(item.timeStamp, item.lockPeriod) > 0
        );
      case "Expired":
        return nftList?.filter(
          (item) => DDayChange(item.timeStamp, item.lockPeriod) <= 0
        );
      default:
        return nftList;
    }
  };

  return {
    isOpenFilter,
    activeOpacity,
    checkPeriod,
    period,
    setPeriod,
    setIsOpenFilter,
    handleCheckPeriod,
    handlePrintMyAssetFilter,
    handleToggleFilter,
  };
};

export default useMyAssetFilter;
