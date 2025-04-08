import styled from "styled-components";
import IcTon from "@/assets/icons/Stake/Staking_TON.png";
import IcNxTon from "@/assets/icons/Stake/nxTON_Pop-up.png";
import IcUSDT from "@/assets/icons/Stake/Staking_USDT.png";
import IcArrowRight from "@/assets/icons/Stake/ic_chevron_right.svg";

export const TokenFilterModal = ({ toggleModal, onSelected,setExchangeModal,hasOldNxTon,setValue }) => {
  const handleSelection = token => {
    onSelected(token); // Pass selected token to parent
    toggleModal(); // Close modal
    setValue("amount","0")
    if (token==="nxTON"&&hasOldNxTon){
      setExchangeModal(true)
    }
  };

  return (
    <>
      <ModalWRapper>
        <Title>Please select a token.</Title>
        <TokenSelectWrapper>
          <TokenWrapper
            onClick={() => {
              handleSelection("TON");
            }}
          >
            <TokenIcon>
              <img src={IcTon} alt="ton icon" />
              <TokenName>TON</TokenName>
            </TokenIcon>
            <RightArrowWrapper>
              <img src={IcArrowRight} />
            </RightArrowWrapper>
          </TokenWrapper>
          <DivideBar />
          <TokenWrapper
            onClick={() => {
              handleSelection("USDT");
            }}
          >
            <TokenIcon>
              <img src={IcUSDT} alt="ton icon" />
              <TokenName>USDT (Tether)</TokenName>
              <NewIon>NEW</NewIon>
            </TokenIcon>
            <RightArrowWrapper>
              <img src={IcArrowRight} />
            </RightArrowWrapper>
          </TokenWrapper>
          <DivideBar />
          <TokenWrapper
            onClick={() => {
              handleSelection("nxTON");
            }}
          >
            <TokenIcon>
              <img src={IcNxTon} alt="ton icon" />
              <TokenName>NxTON</TokenName>
              <NewIon>NEW</NewIon>
            </TokenIcon>
            <RightArrowWrapper>
              <img src={IcArrowRight} />
            </RightArrowWrapper>
          </TokenWrapper>
          <NxtPointIntro>
            <h2>Bonus NXT Point!</h2>
            <p>
              Earn bonus NXT points by staking!Try the newly listed <span>$NxTON</span> now!
            </p>
          </NxtPointIntro>
        </TokenSelectWrapper>
      </ModalWRapper>
    </>
  );
};
const NxtPointIntro = styled.div`
  gap: 0.4rem;
  border-radius: 10px;
  border: 1px solid transparent;
  background: linear-gradient(103deg, rgba(217, 217, 217, 0) 28.68%, rgba(255, 255, 255, 0.2) 89.57%);
  overflow: hidden;
  position: relative;
  //border에 그라데이션을 줘야해서 눈속임
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit; /* 부모의 border-radius를 상속 */
    padding: 1px; /* 테두리 두께 */
    background: linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0) 100%);

    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);

    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: 1; /* 부모보다 위에 표시 */
  }

  width: 278px;
  height: 76px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;

  padding: 7px 11px;

  h2 {
    color: var(--Neutral-Neutural-100, #fff);
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 21px */
  }
  p {
    color: var(--Neutral-Neutural-100, #fff);
    ${({ theme }) => theme.fonts.Nexton_Label_Small}
    span {
      color: var(--Neutral-Neutural-100, #fff);
      ${({ theme }) => theme.fonts.Nexton_Label_Large};
    }
  }
`;

const NewIon = styled.div`
  border-radius: 17px;
  background: var(--gradation, linear-gradient(96deg, #c078f9 5.73%, #6047f4 100%));
  display: flex;
  padding: 5px 6px 4px 8px;
  justify-content: center;
  align-items: center;

  color: white;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
`;

const TokenName = styled.div`
  color: var(--Primary-Neutral-90, #e8e8ee);
  text-align: center;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;

const DivideBar = styled.div`
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 0.1rem;
`;

const RightArrowWrapper = styled.div`
  img {
    width: 24px;
    height: 24px;
  }
`;

const TokenIcon = styled.div`
  img {
    width: 22px;
    height: 22px;
  }
  display: flex;
  flex-direction: row;
  gap: 0.9rem;

  justify-content: center;
  align-items: center;
`;

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TokenSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.9rem;
  width: 100%;
`;

const Title = styled.div`
  color: white;
  text-align: center;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
`;

const ModalWRapper = styled.div`
  display: inline-flex;
  padding: 28px 21px 38px 21px;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  width: 320px;
  height: auto;

  border-radius: 20px;
  background: var(--Neutral-variant-Neutral-variant-10, #1a1b23);
`;
