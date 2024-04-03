import { useState } from "react";
import styled from "styled-components";

import IcBack from "../../assets/icons/ic_back.svg";
import FooterButton from "../../components/common/FooterButton";
import NlpContext from "../../components/nlp/NlpContext";
import * as Contract from "../../hooks/contract/depositTon";
import { UserDeposit } from "../../hooks/contract/wrappers/tact_NexTon";

const Nlp = () => {
  const { sendMessage } = Contract.depositTon();
  const [input, setInput] = useState("");

  return (
    <>
      <NlpWrapper>
        <BackImg src={IcBack} onClick={() => window.history.back()} />
        <NlpHeader>Become LP</NlpHeader>
        <NlpContext input={input} setInput={setInput} />
        <FooterButton
          title="Confirm"
          onClick={() => {
            const data = (): UserDeposit => {
              return {
                $$type: "UserDeposit",
                queryId: BigInt(Date.now()),
                lockPeriod: 0n,
                leverage: 0n,
              };
            };
            console.log(data());
            sendMessage(data());
          }}
        />
      </NlpWrapper>
    </>
  );
};

export default Nlp;

const NlpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  padding: 2.9rem 1.6rem 1.4rem 1.6rem;
`;

const NlpHeader = styled.div`
  padding: 0.6rem 1.8rem;

  border-radius: 1.25rem;
  background-color: #d1e7ff;
  color: #007aff;
  font-family: Pretendard;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 590;
  line-height: 1.3rem; /* 118.182% */
  letter-spacing: -0.044rem;
`;

const BackImg = styled.img`
  position: absolute;
  left: 1.5rem;
  top: 2.8rem;

  cursor: pointer;
`;
