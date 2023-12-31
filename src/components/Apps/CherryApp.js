import { useContext } from "react"

import styled from "styled-components"

import { CherryContext } from "components/Win"

import cherry from "../../assets/cherry.png"

const StyledCherryApp = styled.button`
    user-select: none;

    width: 90px;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 4px;

    border: 1px solid transparent;

    padding: 4px;

    img {
        width: 32px;
        height: 32px;

        image-rendering: pixelated;
    }

    p {
        text-align: center;
        font-size: 0.8rem;
    }

    &[oneclick] {
        border: 1px solid white;
        border-style: dotted;
    }
`

export default function CherryApp() {
    const { setClosed, setMinimized } = useContext(CherryContext)

    return (
        <StyledCherryApp
            onDoubleClick={() => { setClosed(false); setMinimized(false) }}
            onClick={(e) => e.currentTarget.setAttribute("oneclick", "")}
            onBlur={(e) => e.currentTarget.removeAttribute("oneclick")}
        >
            <img src={cherry} alt="Cherry Music 95" />
            <p>Cherry Music 95</p>
        </StyledCherryApp>
    )
}