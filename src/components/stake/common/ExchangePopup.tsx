// import ModalWrapper from "@/components/common/Modal/ModalWrapper";
// import styled from "styled-components";

// const ExchangeConfirmModal = () => {
//   return (
//     <ModalWrapper>
//       <ModalContainer.wrapper>
//         <ModalContainer.title>
          
//         </ModalContainer.title>
//         <ModalContainer.subtitle>
//           This nxTON will be exchanged <br />
//           for the new one.
//         </ModalContainer.subtitle>
//         <ModalContainer.buttonwrapper>
//           <ModalContainer.cancel
//             onClick={async () => {
//               toggleModal(false);
//             }}
//           >
//             Now now
//           </ModalContainer.cancel>
//           <ModalContainer.submit
//             onClick={() => {
//               handleSubmit();
//             }}
//           >
//             Yes
//           </ModalContainer.submit>
//         </ModalContainer.buttonwrapper>
//       </ModalContainer.wrapper>
//     </ModalWrap>
//   );
// };
// export default ExchangeConfirmModal;

// const ModalContainer = {
//   cancel: styled.div`
//     cursor: pointer;
//     color: #1f53ff;
//     background: white;
//     width: 100%;
//     height: 42px;
//     border-radius: 1.4rem;
//     ${({ theme }) => theme.fonts.Telegram_Medium_2};

//     display: flex;
//     justify-content: center;
//     align-items: center;
//   `,
//   submit: styled.div`
//     cursor: pointer;
//     background: #1f53ff;
//     color: white;
//     width: 100%;
//     height: 42px;
//     border-radius: 1.4rem;
//     ${({ theme }) => theme.fonts.Telegram_Medium_2};

//     display: flex;
//     justify-content: center;
//     align-items: center;
//   `,
//   buttonwrapper: styled.div`
//     display: flex;
//     flex-direction: row;
//     gap: 1rem;
//     width: 100%;
//   `,
//   subtitle: styled.div`
//     ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
//     color: #c6c5d0;
//     text-align: center;
//     margin-bottom: 4rem;
//   `,
//   title: styled.div`
//     ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
//     text-align: center;
//     color: white;
//     margin-bottom: 9px;
//   `,
//   wrapper: styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;

//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);

//     border-radius: 2rem;
//     width: 320px;
//     height: auto;
//     padding: 5rem 1rem 1rem 1rem;
//     background: #1a1b23;

//     display: flex;
//     justify-content: center;
//     align-items: center;
//   `,
// };
