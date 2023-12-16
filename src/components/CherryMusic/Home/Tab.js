import styled from "styled-components"

import close from "../../../assets/close.png"
import { useContext } from "react"
import { TabsContext } from "../Home"

const StyledTab = styled.div`
    color: black;

    display: flex;

    align-items: center;
    gap: 4px;

    border-right: 3px solid black;
    border-top: 3px solid white;
    border-left: 3px solid white;

    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    border-style: ridge;

    padding: 3px;

    position: relative;

    overflow: hidden;

    span {
        color: black;

        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #close {
        display: none;
    }

    &[data-active="true"] {
        padding: 4px 3px;
        transform: translateY(-2px);

        z-index: 1;

        #close {
            display: block;

            padding-right: 1px;
            
            z-index: 5;
        }
    }
`

export default function Tab({ children, active="false", index, content=<></> }) {
    const { setContent, removeTab } = useContext(TabsContext)

    const onClick = (e) => {
        const tabs = document.getElementById("tabs")

        tabs.querySelector(`[data-active="true"]`).removeAttribute("data-active")
        e.currentTarget.setAttribute("data-active", "true")

        setContent(content)
    }

    return (
		<StyledTab onClick={onClick} data-active={active} data-index={index} tabIndex="0" role="button">
            <span>{children}</span>
            <button onClick={removeTab} id="close"><img src={close} alt="Close Tab" /></button>
        </StyledTab>
	)
}