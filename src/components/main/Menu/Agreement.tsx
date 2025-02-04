import { styled } from "styled-components";
import IcPrivacy from "@/assets/icons/Menu/ic_menu_privacy.svg";
import IcTerms from "@/assets/icons/Menu/ic_menu_terms.svg";
import AgreementToggle from "./AgreementToggle";

const Agreement = () => {
  const handleNewTap = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <AgreementWrapper>
      <AgreementButtonList>
        <AgreementButton id="menu page x button">
          <div
            id="menu page x button"
            onClick={() => handleNewTap("https://blockwavelabs.notion.site/nexton-privacy-policy")}
          >
            <img src={IcPrivacy} alt="twitter" id="menu page x button" />
            Privacy Policy
          </div>
          <AgreementToggle type="agreePrivacyPolicy" />
        </AgreementButton>
        <AgreementButton id="menu page x button">
          <div
            id="menu page x button"
            onClick={() => handleNewTap("https://blockwavelabs.notion.site/nexton-terms-of-use")}
          >
            <img src={IcTerms} alt="twitter" id="menu page x button" />
            Terms of Use
          </div>
          <AgreementToggle type="agreeTermsOfUse" />
        </AgreementButton>
      </AgreementButtonList>
    </AgreementWrapper>
  );
};

export default Agreement;

const AgreementWrapper = styled.div`
  width: 100%;
  padding: 0 10px;
  margin-top: 49px;
`;

const AgreementButtonList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;

  width: 100%;
  margin-top: 1rem;
`;

const AgreementButton = styled.button<{ $inactive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem 2rem;
  position: relative;
  border: none;
  border-radius: 15px;
  background-color: ${({ $inactive }) => ($inactive ? "#E1E4E6" : "#FFF")};
  box-shadow: ${({ $inactive }) => ($inactive ? "none" : "0px 0px 12px 0px rgba(206, 216, 225, 0.50)")};

  cursor: ${({ $inactive }) => ($inactive ? "default" : "pointer")};

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.2rem;

    color: ${({ $inactive }) => ($inactive ? "#B9B9BA" : "#2f3038")};
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }
`;
