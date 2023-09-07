import { styled } from "styled-components";
import UnstakingDetailHeader from "./UnstakingDetailHeader";
import UnstakingDetailList from "./UnstakingDetailList";
import { useEffect, useState } from "react";
import useTonConnect from "../../../../hooks/useTonConnect";
import { getAllStakeInfo } from "../../../../api/getAllStakeInfo";

const UnstakingDetail = () => {
  const [unstakingList, setUnstakingList] = useState([]);
  const { address } = useTonConnect();

  const getStakedInfo = async () => {
    if (address) {
      const response = await getAllStakeInfo(address);
      setUnstakingList(response.filter((item) => item.status === 1));
    }
  };

  useEffect(() => {
    getStakedInfo();
  }, [address]);

  return (
    <UnstakingDetailWrapper>
      <UnstakingDetailHeader UnstakingListLength={unstakingList?.length} />
      <UnstakingDetailList item={unstakingList} />
    </UnstakingDetailWrapper>
  );
};

export default UnstakingDetail;

const UnstakingDetailWrapper = styled.div`
  width: 100%;
`;
