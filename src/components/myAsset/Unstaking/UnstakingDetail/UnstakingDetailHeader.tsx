import { styled } from "styled-components";
import IcBack from "../../../../assets/icons/ic_back.svg";
import IcDown from "../../../../assets/icons/MyAsset/ic_arrow_down.svg";
import IcUp from "../../../../assets/icons/MyAsset/ic_arrow_up.svg";
import { useState } from "react";

interface UnstakingDetailHeaderProps {
  UnstakingListLength: number;
  handleMoveUnstakingDetail: () => void;
}

const UnstakingDetailHeader = (props: UnstakingDetailHeaderProps) => {
  const { UnstakingListLength, handleMoveUnstakingDetail } = props;
  const [isOpenDesc, setIsOpenDesc] = useState(false);
  return (
    <>
      <UnstakingDetailHeaderWrapper>
        <UnstakingDetailHeaderLeft>
          <BackWrapper onClick={handleMoveUnstakingDetail}>
            <img src={IcBack} alt="back" />
          </BackWrapper>
          <UnstakingDetailTitle onClick={() => setIsOpenDesc((prev) => !prev)}>
            Unstaking NFT
          </UnstakingDetailTitle>
          {isOpenDesc ? (
            <img src={IcUp} alt="up" onClick={() => setIsOpenDesc(false)} />
          ) : (
            <img src={IcDown} alt="down" onClick={() => setIsOpenDesc(true)} />
          )}
        </UnstakingDetailHeaderLeft>
        <UnstakingDetailRightText>
          Total unstaking NFT {UnstakingListLength}
        </UnstakingDetailRightText>
      </UnstakingDetailHeaderWrapper>
      {isOpenDesc && (
        <UnstakingNftDescBox>
          <div>
            <UnstakingNftDesc>
              Unstaking will take approximately 7days to complete. Your
            </UnstakingNftDesc>
            <UnstakingNftDesc>
              transaction history will be burned. Once you’ve had run burning
            </UnstakingNftDesc>
            <UnstakingNftDesc>
              NFT and unstaking, canceling transaction can not be accepted.
            </UnstakingNftDesc>
          </div>
        </UnstakingNftDescBox>
      )}
    </>
  );
};

export default UnstakingDetailHeader;

const UnstakingDetailHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding-bottom: 1rem;

  border-bottom: 0.1rem solid #e5e5ea;
`;

const UnstakingDetailHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.6rem;
  height: 2.6rem;

  border-radius: 50%;
  box-shadow: 0px 4px 20px #e1e4e6;

  cursor: pointer;
`;

const UnstakingDetailTitle = styled.span`
  color: #27293e;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;

const UnstakingDetailRightText = styled.span`
  color: #27293e;
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;

const UnstakingNftDescBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  padding: 1.4rem;

  border-bottom: 0.1rem solid #e5e5ea;
`;

const UnstakingNftDesc = styled.p`
  margin: 0;
  padding: 0;

  color: #45464f;
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;
