import { useEffect, useState } from "react";
import { useStakeInfo } from "../../../api/hooks/useStakeInfo";
import useTonConnect from "../../../hooks/useTonConnect";
import { DDayChange } from "../../../utils/dateChanger";

const useMyAssetFilter = () => {
  const { address } = useTonConnect();
  // all 클릭 했을 때 나머지 리스트 opacity 관리 하는 state
  const [activeOpacity, setActiveOpacity] = useState(false);
  //클릭한 리스트 관리 하는 state
  const [checkPeriod, setCheckPeriod] = useState([false, false, false, false]);
  //ongoing,all 클릭 했을 떄 border 관리 하기 위한 state
  const [period, setPeriod] = useState("Period");
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const { nftList } = useStakeInfo(address);

  const handleToggleFilter = () => {
    setIsOpenFilter((prev) => !prev);
  };

  const handleCheckPeriod = (type: string) => {
    handleToggleFilter();
    switch (type) {
      case "Ongoing":
        setCheckPeriod([true, false, false, false]);
        setActiveOpacity(false);
        setPeriod(type);
        break;
      case "Forthcoming":
        setCheckPeriod([false, true, false, false]);
        setActiveOpacity(false);
        setPeriod(type);
        break;
      case "Expired":
        setCheckPeriod([false, false, true, false]);
        setActiveOpacity(false);
        setPeriod(type);
        break;
      case "All":
        setCheckPeriod([false, false, false, true]);
        setActiveOpacity(true);
        setPeriod(type);
        break;
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
    handleCheckPeriod,
    handlePrintMyAssetFilter,
    handleToggleFilter,
  };
};

export default useMyAssetFilter;
