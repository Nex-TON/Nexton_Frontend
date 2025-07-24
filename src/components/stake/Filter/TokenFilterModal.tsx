import styled from "styled-components";
import IcTon from "@/assets/icons/Stake/Staking_TON.png";
import IcNxTon from "@/assets/icons/Stake/nxTON_Pop-up.png";
import IcUSDT from "@/assets/icons/Stake/Staking_USDT.png";
import IcBmTon from "@/assets/icons/Stake/Staking_BmTON.svg";
import IcEclipse from "@/assets/icons/Stake/ic_eclipse.svg";
import IcClose from "@/assets/icons/Stake/ic_close.svg";
import { useRecoilState } from "recoil";
import { stakingAtom } from "@/lib/atom/staking";

export const TokenFilterModal = ({ toggleModal, onSelected, setExchangeModal, hasNxTon, setValue }) => {
  const [, setStakingInfo] = useRecoilState(stakingAtom);

  const handleSelection = token => {
    onSelected(token); // Pass selected token to parent
    toggleModal(); // Close modal
    setValue("amount", "");
    if (token === "nxTON" && hasNxTon === "0") {
      setExchangeModal(true);
    }
    setStakingInfo(prev => ({
          ...prev,
          tokenSort: token,
        }));
  };

  return (
    <>
      <ModalWRapper>
        <CloseTap>
          <img src={IcClose} alt="close icon" onClick={toggleModal} />
        </CloseTap>
        <DivideBar />
        <Title>Select Asset</Title>
        <TokenSelectWrapper>
          <TokenInnerWrapper>
            <TokenSort>TON</TokenSort>
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
                <img src={IcEclipse} />
              </RightArrowWrapper>
            </TokenWrapper>
          </TokenInnerWrapper>
          <TokenInnerWrapper>
            <TokenSort>Stable coin</TokenSort>
            <TokenWrapper
              onClick={() => {
                handleSelection("USDT");
              }}
            >
              <TokenIcon>
                <img src={IcUSDT} alt="ton icon" />
                <TokenName>USDT (Tether)</TokenName>
              </TokenIcon>
              <RightArrowWrapper>
                <img src={IcEclipse} />
              </RightArrowWrapper>
            </TokenWrapper>
          </TokenInnerWrapper>
          <TokenInnerWrapper>
            <TokenSort>LSTs</TokenSort>
            <TokenWrapper
              onClick={() => {
                handleSelection("nxTON");
              }}
              style={{ marginBottom: "1.7rem" }}
            >
              <TokenIcon>
                <img src={IcNxTon} alt="ton icon" />
                <TokenName>TON-NxTON</TokenName>
              </TokenIcon>
              <RightArrowWrapper>
                <img src={IcEclipse} />
              </RightArrowWrapper>
            </TokenWrapper>
            <TokenWrapper
              onClick={() => {
                handleSelection("bmTON");
              }}
            >
              <TokenIcon>
                <img src={IcBmTon} alt="ton icon" />
                <TokenName>bmTON</TokenName>
              </TokenIcon>
              <RightArrowWrapper>
                <img src={IcEclipse} />
              </RightArrowWrapper>
            </TokenWrapper>
          </TokenInnerWrapper>
        </TokenSelectWrapper>
      </ModalWRapper>
    </>
  );
};
const CloseTap = styled.div`
  padding: 0 1.3rem 0 1.3rem;
  display: flex;
  justify-content: flex-end;
`;
const TokenInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TokenSort = styled.div`
  color: #909394;
  text-align: start;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  margin-bottom: 0.8rem;
`;

const TokenName = styled.div`
  color: #303234;
  text-align: center;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;

const DivideBar = styled.div`
  background: #e5e5ea;
  width: 100%;
  height: 0.1rem;
  margin: 1.1rem 0 2.4rem 0;
`;

const RightArrowWrapper = styled.div`
  img {
    width: 1.8rem;
    height: 1.8rem;
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
  width: 100%;
  gap: 3.1rem;
  padding: 0 1.3rem 0 1.3rem;
`;

const Title = styled.div`
  margin-bottom: 1.9rem;
  color: #333;
  text-align: start;
  ${({ theme }) => theme.fonts.Nexton_Title_Small};
  padding: 0 1.3rem 0 1.3rem;
`;

const ModalWRapper = styled.div`
  display: inline-flex;
  padding: 16px 0 65px 0;
  flex-direction: column;
  width: 320px;
  height: auto;

  border-radius: 20px;
  background: white;
`;
