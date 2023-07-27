import { styled } from "styled-components";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);

    z-index: 1000;
    overflow: hidden;
`;

function ModalWrapper({ children, ...props }) {
    return <Container {...props}>{children}</Container>;
}

export default ModalWrapper;