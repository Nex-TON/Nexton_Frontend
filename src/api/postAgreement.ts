import { client } from "./axios";

interface postAgreementProps{
    userId:string,
}

export const postAgreement = async (agreementInfo: postAgreementProps) => {
  try {
    const response = await client.post(`/auth/postAgreement`,agreementInfo);
    return response.status;
  } catch (e) {
    console.error(e);
  }
};
