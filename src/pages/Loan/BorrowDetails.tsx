import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IcExclude from "@/assets/icons/Loan/ic_exclude.svg";
import IcTonLogo from "@/assets/icons/Loan/ic_ton_logo.svg";
import { DoubleArrows } from "@/components/loan/common/DoubleArrows.tsx";
import ProgressBar from "@/components/loan/common/ProgressBar.tsx";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";

import {
  BorrowContentBox,
  BorrowHeaderBox,
  BorrowHeaderBoxTitle,
  BorrowRateBox,
  BorrowRateBoxBottom,
  BorrowRateBoxHeader,
  BorrowRateBoxHeaderLeft,
  BorrowRateBoxHeaderRight,
  BorrowWrapper,
  CollateralizingNFTInfo,
  CollateralizingNFTInfoDivider,
  CollateralizingNFTInfoHeader,
  CollateralizingNFTInfoItem,
  CollateralizingNFTInfoItemBottom,
  CollateralizingNFTInfoItemBox,
  ExcludeBox,
} from "./Borrow.styled.tsx.tsx";

const tele = (window as any).Telegram.WebApp;

// ! Data is currently mocked
const BorrowDetails = () => {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useNFTDetail(Number(id));

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate(-1);
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  const handleExpandInfo = () => {
    setIsInfoExpanded(!isInfoExpanded);
  };

  return (
    <BorrowWrapper>
      <BorrowHeaderBox>
        <BorrowHeaderBoxTitle>
          <h1>Loan</h1>
        </BorrowHeaderBoxTitle>
      </BorrowHeaderBox>

      <ProgressBar currentStep={1} />

      <BorrowContentBox>
        {isInfoExpanded ? (
          <CollateralizingNFTInfo>
            <CollateralizingNFTInfoHeader>Collateralizing NFT info</CollateralizingNFTInfoHeader>

            <CollateralizingNFTInfoItem>
              <span>Token ID</span>
              <p>4817sddss863ddddwdwsdwd</p>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>Network</span>

              <CollateralizingNFTInfoItemBox>
                <img src={IcTonLogo} alt="TON_logo" />
                <p>TON</p>
              </CollateralizingNFTInfoItemBox>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>LTV</span>
              <p>50.0%</p>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />

            <CollateralizingNFTInfoItem>
              <span>Principal</span>
              <p>10,000 TON</p>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>Nominator Pool</span>
              <p>DG Pool #1</p>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>Leveraged</span>
              <p>X1.0</p>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>Lockup period</span>
              <p>60 days</p>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>Unstakable date</span>
              <p>DD.MM.YY</p>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>Protocol Fees</span>
              <p>2%</p>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>Staking APR</span>
              <p>5%</p>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>Total Amount</span>
              <p>10,083 TON</p>
            </CollateralizingNFTInfoItem>

            <CollateralizingNFTInfoItemBottom onClick={handleExpandInfo}>
              <DoubleArrows stroke="white" direction="up" />
            </CollateralizingNFTInfoItemBottom>
          </CollateralizingNFTInfo>
        ) : (
          <CollateralizingNFTInfo>
            <CollateralizingNFTInfoHeader>Collateralizing NFT info</CollateralizingNFTInfoHeader>

            <CollateralizingNFTInfoItem>
              <span>Token ID</span>
              <p>4817sddss863ddddwdwsdwd</p>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>Network</span>

              <CollateralizingNFTInfoItemBox>
                <img src={IcTonLogo} alt="TON_logo" />
                <p>TON</p>
              </CollateralizingNFTInfoItemBox>
            </CollateralizingNFTInfoItem>
            <CollateralizingNFTInfoDivider />
            <CollateralizingNFTInfoItem>
              <span>LTV</span>
              <p>50.0%</p>
            </CollateralizingNFTInfoItem>

            <CollateralizingNFTInfoItemBottom onClick={handleExpandInfo}>
              <DoubleArrows stroke="white" direction="down" />
            </CollateralizingNFTInfoItemBottom>
          </CollateralizingNFTInfo>
        )}

        <ExcludeBox>
          <img src={IcExclude} alt="exclude_icon" />
        </ExcludeBox>

        {/* // ! To be implemented */}
        <BorrowRateBox>
          <BorrowRateBoxHeader>
            <BorrowRateBoxHeaderLeft>Borrow</BorrowRateBoxHeaderLeft>
            <BorrowRateBoxHeaderRight>1NXT = n TON</BorrowRateBoxHeaderRight>
          </BorrowRateBoxHeader>
          <BorrowRateBoxBottom>000.00 nxTON</BorrowRateBoxBottom>
        </BorrowRateBox>
      </BorrowContentBox>
    </BorrowWrapper>
  );
};

export default BorrowDetails;
