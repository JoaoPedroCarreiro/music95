import styled from "styled-components"

import { useContext } from "react"
import { TabsContext } from "../Home"
import HomeContent from "./HomeContent"

const StyledTab = styled.button`
    color: black;

    display: flex;

    align-items: center;
    gap: 5px;

    border-right: 3px solid black;
    border-top: 3px solid white;
    border-left: 3px solid white;

    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    border-style: ridge;

    padding: 3px;

    position: relative;

    overflow: hidden;
    text-overflow: ellipsis;

    &[data-active="true"] {
        padding: 4px 3px;
        transform: translateY(-2px);

        z-index: 1;
    }
`

export default function HomeTab({ active }) {
    const { setContent } = useContext(TabsContext)

    const onClick = (e) => {
        const tabs = document.getElementById("tabs")

        tabs.querySelector(`[data-active="true"]`).removeAttribute("data-active")
        e.currentTarget.setAttribute("data-active", "true")

        setContent(<HomeContent />)
    }

    return (
		<StyledTab onClick={onClick} data-active={active}>Home</StyledTab>
	)
}