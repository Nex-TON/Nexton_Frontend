import { styled } from "styled-components";

const DetailNFTInfoHeader = ({ title }: { title: string }) => {
  return <DetailNFTInfoHeaderWrapper>{title}</DetailNFTInfoHeaderWrapper>;
};

export default DetailNFTInfoHeader;

const DetailNFTInfoHeaderWrapper = styled.div`
  width: 100%;
  padding: 0.9rem 0 0.9rem 1.3rem;

  border-radius: 2rem;
  background-color: #f9f9ff;
  box-shadow: 0 0.4rem 2rem 0 #e1e4e6;

  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;
