import { styled } from "styled-components";
import { useRef, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import FooterButton from "../common/FooterButton";

const Container = styled.div`
    position: fixed;

    top: 20rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: max-content;
    height: max-content;

    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 3.1rem 2.2rem 1.7rem 2.2rem;

    overflow: hidden;
`;

const Title = styled.p`
    text-align: center;
    font-family: "pretendard";
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.8rem; /* 112.5% */
    letter-spacing: -0.078px;

    margin-bottom: 0.7rem;
`;

const SubTitle = styled.p`
    text-align: center;
    font-family: "pretendard";
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.8rem; /* 138.462% */
    letter-spacing: -0.078px;

    margin-bottom: 2rem;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;

    box-sizing: border-box;
    border-radius: 0.5rem;
    padding: 1.1rem 8.2rem;
    background: #007aff;

    text-align: center;
    font-family: "pretendard";
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.8rem; /* 138.462% */
    letter-spacing: -0.078px;

    border: none;
`;

function BasicModal({ setModal }) {
    const innerRef = useRef(null);

    useEffect(() => {
        const handler = (e: Event) => {
            if (innerRef.current && !innerRef.current.contains(e.target)) {
                setModal(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <ModalWrapper>
            <Container ref={innerRef}>
                <Title>Successfully staked!</Title>
                <SubTitle>
                    Visit Ton Scan using below url
                    <br />
                    to check your transaction
                </SubTitle>

                <Button
                    onClick={() => {
                        setModal(false);
                        window.location.href =
                            "https://testnet.tonscan.org/address/EQCY_ODi6mZJC1m7RNr6QoweWvumtebT-G21Yn_V2U7x5i2c";
                    }}>
                    Open TON Scan
                </Button>
            </Container>
        </ModalWrapper>
    );
}

export default BasicModal;
