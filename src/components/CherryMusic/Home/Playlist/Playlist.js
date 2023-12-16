import { TabsContext } from "components/CherryMusic/Home"
import { useContext } from "react"
import styled from "styled-components"

const StyledPlaylist = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    
    box-sizing: border-box;

    color: black;
    letter-spacing: .15rem;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    margin-bottom: 12px;

    cursor: pointer;

    position: relative;

    p {
        font-size: .9rem;
        text-align: start;

        color: black;
        font-weight: bold;
        letter-spacing: .15rem;
    }

    &:hover {
        p {
            text-decoration: underline;
        }
    }

    .options {
        position: absolute;
        left: 0;
    }
    
    .more {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            color: black;
            font-weight: bold;
            font-size: 1rem;
            padding: 1px;

            transform: translateX(1px) translateY(-25%);
        }
    }
`

export default function Playlist({ children, content }) {
    const { addTab } = useContext(TabsContext)

    const onClick = (e) => {
        e.stopPropagation()

        document.getElementById("options-window").style.display = "flex"
        document.getElementById("options-window").style.pointerEvents = "all"
        document.getElementById("options-window").setAttribute("data-current-playlist", `p-${children}`)
        document.getElementById("cherry-music").style.pointerEvents = "none"
    }

    return (
		<StyledPlaylist onClick={() => addTab(children, content)} tabIndex="0" role="button">
            <p>{children}</p>
            <button className="more styled-button" onClick={onClick}><span>...</span></button>
        </StyledPlaylist>
	)
}