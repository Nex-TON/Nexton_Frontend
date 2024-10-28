import { styled } from "styled-components";

const RisksList = () => {
  return (
    <RiskDisclosureItemBox>
      <RiskDisclosureItem>
        <RiskDisclosureNumberBox>
          <RiskDisclosureNumber>1</RiskDisclosureNumber>
          <RiskDisclosureNumberDivider />
        </RiskDisclosureNumberBox>

        <RiskDisclosureContent>
          <RiskDisclosureSubtitle>No Liquidation Risk Due to Collateral Ratio Changes</RiskDisclosureSubtitle>
          <RiskDisclosureText $lead>NFT Collateral</RiskDisclosureText>
          <RiskDisclosureText>
            Since $nxTON is issued using NFTs obtained by staking $TON as collateral, there is no risk of liquidation
            due to changes in the value of the collateral.
          </RiskDisclosureText>
        </RiskDisclosureContent>
      </RiskDisclosureItem>

      <RiskDisclosureItem>
        <RiskDisclosureNumberBox>
          <RiskDisclosureNumber>2</RiskDisclosureNumber>
          <RiskDisclosureNumberDivider />
        </RiskDisclosureNumberBox>

        <RiskDisclosureContent>
          <RiskDisclosureSubtitle>Automatic Liquidation in Case of Default</RiskDisclosureSubtitle>
          <RiskDisclosureText $lead>Default</RiskDisclosureText>
          <RiskDisclosureText>
            If the loan repayment schedule is not followed, the automatic liquidation process will start.
          </RiskDisclosureText>
          <br />
          <RiskDisclosureText $lead $marginTop>
            Additional Fees
          </RiskDisclosureText>
          <RiskDisclosureText>
            Additional fees may be incurred during liquidation, which can increase the user's losses.
          </RiskDisclosureText>
        </RiskDisclosureContent>
      </RiskDisclosureItem>

      <RiskDisclosureItem>
        <RiskDisclosureNumberBox>
          <RiskDisclosureNumber>3</RiskDisclosureNumber>
          <RiskDisclosureNumberDivider />
        </RiskDisclosureNumberBox>

        <RiskDisclosureContent>
          <RiskDisclosureSubtitle>Interest Rate Information</RiskDisclosureSubtitle>
          <RiskDisclosureText $lead>Interest Rate</RiskDisclosureText>
          <RiskDisclosureText>
            An annual interest rate of 2% applies. In addition to the loan principal, interest costs must also be
            repaid.
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
  margin-top: 3.9rem;
`;

const RiskDisclosureItem = styled.div`
  display: flex;
  margin-bottom: 1rem;

  padding: 0 1.9rem 0 0.8rem;
`;

const RiskDisclosureNumberBox = styled.div<{ $last?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $last }) => ($last ? "start" : "center")};
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

const RiskDisclosureNumberDivider = styled.div`
  width: 1px;
  height: 100%;

  margin-top: 0.2rem;

  border: 1px dashed #f1f4f4;
`;

const RiskDisclosureContent = styled.div`
  flex: 1;
  margin-bottom: 4rem;
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
