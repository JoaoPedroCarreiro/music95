import { useRef } from "react"
import styled from "styled-components"

const StyledOptions = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;

    width: max-content;
    height: max-content;
    background-color: var(--gray);

    transform: translateX(-50%) translateY(-50%);

    z-index: 5;

    border-bottom: 2px solid black;
    border-right: 2px solid black;
    border-top: 2px solid white;
    border-left: 2px solid white;
    border-style: ridge;

    padding: 3px;

    max-height: 200px;
    overflow-y: auto;

    display: none;

    div {
        width: max-content;
        height: max-content;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    button {
        width: 150px;
    }
`

export default function AddToPlaylist() {
    const window = useRef(0)

    const onClick = (e) => {
        const value = localStorage.getItem("p-" + e.currentTarget.textContent).startsWith("empty") ? "" : localStorage.getItem("p-" + e.currentTarget.textContent)

        if(value.split(",").includes(String(window.current.getAttribute("data-current-song")))) return
        
        const newValue = value === "" ? window.current.getAttribute("data-current-song") : value + "," + window.current.getAttribute("data-current-song")

        localStorage.setItem("p-" + e.currentTarget.textContent, newValue)

        window.current.style.display = "none"
        document.getElementById("cherry-music").style.pointerEvents = "all"
    }

    const getPlaylists = () => {
        const arr = []

        for(let i = 0; i < localStorage.length; i++) {
            arr.push(<button key={"playlist-add-" + localStorage.key(i)} onClick={onClick} className="styled-button">{localStorage.key(i).split("p-")[1]}</button>)
        }

        return arr
    }

    const cancel = () => {
        window.current.style.display = "none"
        document.getElementById("cherry-music").style.pointerEvents = "all"
    }

    return (
		<StyledOptions data-current-song="" ref={window} id="add-to-playlist-window">
            <div>
                {getPlaylists()}
                <button onClick={cancel} className="styled-button" style={{ marginTop: "10px" }}>Cancel</button>
            </div>
        </StyledOptions>
	)
}