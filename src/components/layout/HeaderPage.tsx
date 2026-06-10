import styled from "styled-components";

const HeaderPage = styled.header`
    position: fixed;
    inset: 0 auto auto 50%;
    transform: translateX(-50%);
    z-index: 20;

    width: min(100vw, 430px);
    height: 96px;
    padding: calc(16px + env(safe-area-inset-top)) 14px 12px;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    gap: 14px;

    color: #ffffff;

    background: radial-gradient(
            circle at 88% -30%,
            rgba(255, 224, 162, 0.38),
            transparent 42%
        ),
        linear-gradient(125deg, #720812 0%, #a80818 52%, #cf1727 100%);

    box-shadow: 0 10px 26px rgba(104, 5, 16, 0.22);
`;

export const BackButton = styled.button`
    position: relative;
    z-index: 1;

    width: 46px;
    height: 46px;
    flex-shrink: 0;

    display: grid;
    place-items: center;

    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 15px;

    color: #ffffff;
    background: rgba(255, 255, 255, 0.14);

    box-shadow: 0 8px 18px rgba(73, 3, 11, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);

    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    cursor: pointer;

    transition: transform 160ms ease, background 160ms ease,
        border-color 160ms ease;

    &:active {
        transform: scale(0.94);
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.32);
    }
`;

export const Title = styled.h1`
    margin: 0;
    flex: 1;

    color: #ffffff;
    font-size: 23px;
    line-height: 1.15;
    font-weight: 900;
    letter-spacing: -0.35px;
`;

export default HeaderPage;
