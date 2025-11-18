import styled from "styled-components";
import { colors } from './designSystem';

const Logo = styled.div`
    img {
        width: ${({size}) =>
            size === "extra-small"? "1rem"
                : size === "small"? "3rem"
                    : size === "large"? "6rem"
                        : "100px"};
    }
    background: ${colors.textPrimary};
    border-radius: 50%;

    @media (max-width: 1279px) {
        img{
        width: 4rem;}
    }
    @media (max-width: 480px) {
        img{
        width: 3rem;}
    }
`;

const Logo_chat = styled.div`
    background: ${colors.textPrimary};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 3rem;

    }
    @media (max-width: 1279px) {
        img{
        width: 2rem;}
    }
    @media (max-width: 480px) {
        img{
        width: 1.4rem;}
    }
`;

export {Logo, Logo_chat};
