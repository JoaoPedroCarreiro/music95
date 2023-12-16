import { useRef } from "react"
import styled from "styled-components"

const StyledRenamePlaylistWindow = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;

    width: 200px;
    height: 60px;
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

    input {
        width: 100%;
        height: 20px;

        border-bottom: 2px solid white;
        border-right: 2px solid white;
        border-top: 2px solid gray;
        border-left: 2px solid gray;
        border-style: ridge;

        color: black;
        background-color: white;
    }

    div {
        margin-top: 5px;

        display: flex;
        justify-content: space-between;

        button {
            font-size: 0.9rem;
        }
    }
`

export default function RenamePlaylistWindow({ reRender }) {
    const window = useRef(0)
    const name = useRef(0)

    const confirm = () => {
        if(!name.current.value) {
            window.current.style.display = "none"
            name.current.value = ""
            document.getElementById("repeated-name-window").style.display = "block"
            document.getElementById("repeated-name-window").style.pointerEvents = "all"

            return
        }

        if(localStorage.getItem("p-" + name.current.value)) {
            window.current.style.display = "none"
            name.current.value = ""
            document.getElementById("repeated-name-window").style.display = "block"
            document.getElementById("repeated-name-window").style.pointerEvents = "all"

            return
        }

        const value = localStorage.getItem(document.getElementById("options-window").getAttribute("data-current-playlist"))

        localStorage.removeItem(document.getElementById("options-window").getAttribute("data-current-playlist"))

        localStorage.setItem(`p-${name.current.value}`, value)

        window.current.style.display = "none"
        name.current.value = ""
        document.getElementById("cherry-music").style.pointerEvents = "all"

        reRender()
    }

    const cancel = () => {
        window.current.style.display = "none"
        name.current.value = ""
        document.getElementById("cherry-music").style.pointerEvents = "all"
    }

    return (
		<StyledRenamePlaylistWindow ref={window} id="rename-playlist-window">
            <input ref={name} type="text" maxLength={24} />
            <div>
                <button onClick={confirm} className="styled-button">Confirm</button>
                <button onClick={cancel} className="styled-button">Cancel</button>
            </div>
        </StyledRenamePlaylistWindow>
	)
}