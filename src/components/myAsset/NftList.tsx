import styled from "styled-components";
import NftItem from "../common/NftItem";
import { useNavigate } from "react-router";

const NftList = () => {
    const navigate = useNavigate();

    const moveToDetail = () => {
        navigate("/myasset/1");
    };
    return (
        <NFtListWrapper>
            <NftItem moveToDetail={moveToDetail} />
            <NftItem />
            <NftItem />
            <NftItem />
            <NftItem />
            <NftItem />
        </NFtListWrapper>
    );
};

export default NftList;

const NFtListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    gap: 2rem;

    width: 100%;
    height: 50rem;
    padding: 1.6rem;
    margin-top: 2rem;

    overflow: auto;

    &::-webkit-scrollbar {
        width: 4px;
        background: transparent;
        border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background: #c4c4c4;
        border-radius: 6px;
    }

    &::-webkit-scrollbar-track {
        margin-top: 3px;
        margin-bottom: 3px;
        background-clip: padding-box;
    }
`;
