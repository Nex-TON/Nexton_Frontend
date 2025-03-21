import styled from "styled-components";

const Tooltip=({children})=>{
    return(
        <TooltipContainer>
            {children}
        </TooltipContainer>
    )
};
export default Tooltip;

const TooltipContainer=styled.div`
    position: relative;

    width: fit-content;
    height: fit-content;
    padding: 7px 5px;

    background-color: black;
    border: none;
    border-radius: 3px;

    &::after{
        content: ' ';
        position: absolute;
        top: 100%;
        left: 30%;
        /* transform: translateX(-50%); */

        border-color: black transparent transparent transparent;
        border-style: solid;
        border-width: 8px;
    }
`