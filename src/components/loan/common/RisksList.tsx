import { styled } from "styled-components";

const RisksList = () => {
  return (
    <RiskDisclosureItemBox>
      <RiskDisclosureItem>
        <RiskDisclosureNumberBox>
          <RiskDisclosureNumber>1</RiskDisclosureNumber>
        </RiskDisclosureNumberBox>
        <RiskDisclosureContent>
          <RiskDisclosureSubtitle>No Liquidation Risk Due to Collateral Ratio Changes</RiskDisclosureSubtitle>
          <RiskDisclosureText $lead>NFT Collateral</RiskDisclosureText>
          <RiskDisclosureText>$nxTON is issued using NFTs obtained by staking $TON as collateral.</RiskDisclosureText>
        </RiskDisclosureContent>
      </RiskDisclosureItem>

      <RiskDisclosureItem>
        <RiskDisclosureNumberBox>
          <RiskDisclosureNumber>2</RiskDisclosureNumber>
        </RiskDisclosureNumberBox>

        <RiskDisclosureContent>
          <RiskDisclosureSubtitle>Actions in Case of Default Default</RiskDisclosureSubtitle>
          <RiskDisclosureText>
            Although there is no specific repayment date, the loan must be repaid. Failure to do so may result in
            additional actions being taken. However, automatic liquidation will not occur.
          </RiskDisclosureText>
        </RiskDisclosureContent>
      </RiskDisclosureItem>

      <RiskDisclosureItem>
        <RiskDisclosureNumberBox>
          <RiskDisclosureNumber>3</RiskDisclosureNumber>
        </RiskDisclosureNumberBox>

        <RiskDisclosureContent>
          <RiskDisclosureSubtitle>Interest Rate Information</RiskDisclosureSubtitle>
          <RiskDisclosureText $lead>Interest Rate</RiskDisclosureText>
          <RiskDisclosureText>
            The current annual interest rate is 0%, but this may change in the future.
          </RiskDisclosureText>
        </RiskDisclosureContent>
      </RiskDisclosureItem>

      <RiskDisclosureItem>
        <RiskDisclosureNumberBox $last>
          <RiskDisclosureNumber>4</RiskDisclosureNumber>
        </RiskDisclosureNumberBox>

        <RiskDisclosureContent>
          <RiskDisclosureSubtitle>Other Considerations</RiskDisclosureSubtitle>
          <RiskDisclosureText $lead>Smart Contract Risk</RiskDisclosureText>
          <RiskDisclosureText>Be aware of potential code defects and security vulnerabilities.</RiskDisclosureText>
          <br />
          <RiskDisclosureText $lead $marginTop>
            Liquidity Risk
          </RiskDisclosureText>
          <RiskDisclosureText>There may be a lack of liquidity in certain situations.</RiskDisclosureText>
          <br />
          <RiskDisclosureText $lead $marginTop>
            Regulatory Risk
          </RiskDisclosureText>
          <RiskDisclosureText>
            Users must comply with applicable cryptocurrency and DeFi-related laws and regulations in their country.
          </RiskDisclosureText>
        </RiskDisclosureContent>
      </RiskDisclosureItem>
    </RiskDisclosureItemBox>
  );
};

export default RisksList;

const RiskDisclosureItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const RiskDisclosureItem = styled.div`
  display: flex;
  margin-bottom: 1rem;

  padding: 2rem 3.1rem 2.4rem 2rem;
  border-radius: 20px;
  background: var(--Neutral-Neutural-100, #fff);

  /* drop shadow_type 4 */
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

const RiskDisclosureNumberBox = styled.div<{ $last?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  margin-right: 0.8rem;
`;

const RiskDisclosureNumber = styled.div`
  display: flex;
  width: 27px;
  height: 27px;
  padding: 5px 11px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small}
  border-radius: 13.5px;
  background: #303234;
  color: #fff;
`;

const RiskDisclosureContent = styled.div`
  flex: 1;
`;

const RiskDisclosureSubtitle = styled.h2`
  width: 70%;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  color: #303234;

  margin-bottom: 0.8rem;
`;

const RiskDisclosureText = styled.p<{ $lead?: boolean; $marginTop?: boolean }>`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  color: ${({ $lead }) => ($lead ? "#5E6162" : "#aaaeaf")};

  ${({ $marginTop }) => $marginTop && "margin-top: 0.8rem;"}
`;
