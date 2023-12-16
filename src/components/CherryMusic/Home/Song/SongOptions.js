import { CherryContext } from "components/Win"
import { useContext, useRef } from "react"
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
        width: 150px;
    }
`

export default function SongOptions() {
    const { setCurrentMusic, setCurrentPlaylist } = useContext(CherryContext)

    const window = useRef(0)

    const play = () => {
        setCurrentMusic(window.current.getAttribute("data-current-song"))

        window.current.style.display = "none"
        document.getElementById("cherry-music").style.pointerEvents = "all"

        setCurrentPlaylist("p-" + document.querySelector(`[data-active="true"]`).textContent)
    }

    const addToPlaylist = () => {
        window.current.style.display = "none"
        document.getElementById("add-to-playlist-window").style.display = "block"
        document.getElementById("add-to-playlist-window").style.pointerEvents = "all"
        document.getElementById("add-to-playlist-window").setAttribute("data-current-song", window.current.getAttribute("data-current-song"))
    }

    const cancel = () => {
        window.current.style.display = "none"
        document.getElementById("cherry-music").style.pointerEvents = "all"
    }

    return (
		<StyledOptions data-current-song="" ref={window} id="song-options-window">
            <button onClick={play} className= "styled-button">Play</button>
            <button onClick={addToPlaylist} className="styled-button">Add to Playlist</button>
            <button onClick={cancel} className="styled-button">Cancel</button>
        </StyledOptions>
	)
}