import { styled } from "styled-components";
import Icback from "../../../assets/icons/ic_back.svg";
import NftPreviewImage from "./NftPreviewImage";
import NFTPreviewInfo from "./NFTPreviewInfo";
import FooterButton from "../../common/FooterButton";
import { UserDeposit } from "../../../hooks/tact_NexTon";
import * as Contract from "../../../hooks/useNextonContract";
import BasicModal from "../../modals/BasicModal";
import { useState } from "react";

interface NFTPreviewProps {
  handleMovePreview: () => void;
}

const NFTPreview = (props: NFTPreviewProps) => {
  const { handleMovePreview } = props;

  const { sendMessage } = Contract.useNextonContract();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <NFTPreviewWrapper>
      {modal && <BasicModal toggleModal={toggleModal} />}
      <NFTPreviewHeader>
        <BackImageBox>
          <BackImage src={Icback} alt="back" onClick={handleMovePreview} />
        </BackImageBox>
        Staking NFT Preview
      </NFTPreviewHeader>
      <NftPreviewImage />
      <NFTPreviewInfo />
      <NFTPreviewConfirmBox>
        <NFTPreviewConfirmText>
          Please check your NFT details periodically
        </NFTPreviewConfirmText>
        <FooterButton
          title="Confirm"
          // onClick={async () => {
          //   const data = (): UserDeposit => {
          //     return {
          //       $$type: "UserDeposit",
          //       queryId: BigInt(Date.now()),
          //       lockPeriod: 0n,
          //       leverage: 0n,
          //     };
          //   };
          //   await sendMessage(data());
          //   setModal(true);
          //   getDepoist();
          // }}
          onClick={toggleModal}
        />
      </NFTPreviewConfirmBox>
    </NFTPreviewWrapper>
  );
};

export default NFTPreview;

const NFTPreviewWrapper = styled.div`
  width: 100%;
  padding: 4.5rem 1.7rem 0 1.7rem;
`;

const NFTPreviewHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5.1rem;

  width: 100%;
  margin-bottom: 2rem;

  color: #45464f;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;

const BackImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 2.6rem;
  height: 2.6rem;

  border-radius: 50%;
  background-color: #f9f9ff;
  box-shadow: 0px 0px 20px 0px #e1e4e6;

  cursor: pointer;
`;

const BackImage = styled.img``;

const NFTPreviewConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  text-align: center;
`;
const NFTPreviewConfirmText = styled.span`
  color: #007aff;
  ${({ theme }) => theme.fonts.Telegram_Caption_1_1};
`;
