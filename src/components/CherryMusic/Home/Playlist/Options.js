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

    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    button {
        width: 100px;
    }
`

export default function Options({ reRender }) {
    const window = useRef(0)

    const rename = () => {
        window.current.style.display = "none"
        document.getElementById("rename-playlist-window").style.display = "block"
        document.getElementById("rename-playlist-window").style.pointerEvents = "all"
    }

    const deletePlaylist = () => {
        localStorage.removeItem(window.current.getAttribute("data-current-playlist"))

        window.current.style.display = "none"
        document.getElementById("cherry-music").style.pointerEvents = "all"

        const tabs = document.getElementById("tabs")
        const curPlay = window.current.getAttribute("data-current-playlist")

        const arr = []

        for(let i = 0; i < tabs.children.length; i++) {
            console.log(tabs.children, tabs.children.item(i).textContent, curPlay.slice(2, curPlay.length))
            if(tabs.children.item(i).textContent === curPlay.slice(2, curPlay.length)) {
                arr.push(tabs.children.item(i))
            }
        }

        for(const child of arr) {
            tabs.removeChild(child)
        }

        reRender()
    }

    const cancel = () => {
        window.current.style.display = "none"
        document.getElementById("cherry-music").style.pointerEvents = "all"
    }

    return (
		<StyledOptions data-current-playlist="" ref={window} id="options-window">
            <button onClick={rename} className= "styled-button">Rename</button>
            <button onClick={deletePlaylist} className="styled-button">Delete</button>
            <button onClick={cancel} className="styled-button">Cancel</button>
        </StyledOptions>
	)
}