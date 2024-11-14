import styled from "styled-components";

const tele = (window as any).Telegram.WebApp;

export const UserInfoCard = () => {
  const userName = tele?.initDataUnsafe?.user?.username;
  const userProfileUrl = tele?.initDataUnsafe?.user?.photo_url;


  return (
    <>
      <UserInfoContainer>
        <UserInfoText>
          <WelcomeText>Hello,</WelcomeText>
          <UserNameText>{userName}</UserNameText>
        </UserInfoText>
        <UserProfile><img src={userProfileUrl} alt="my page user's telegram profile"/></UserProfile>
      </UserInfoContainer>
    </>
  );
};

const UserNameText = styled.div`
  color: #2f3038;
  ${({theme})=>theme.fonts.Nexton_Title_Medium_1};
`;

const WelcomeText = styled.div`
  color: #2f3038;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
`;

const UserProfile = styled.div`
width: 5.5rem;
height: 5.5rem;
border-radius: 50%;
`;

const UserInfoText = styled.div`
display: felx;
flex-direction: column;
`;

const UserInfoContainer = styled.div`
  border-radius: 15px;
  background: var(--Neutral-Neutural-100, #fff);
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.7rem 1.9rem;

  height: 110px;
  width: 100%;
  
  margin-bottom: 1.6rem;
`;
