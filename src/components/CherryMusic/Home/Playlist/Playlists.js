import styled from "styled-components"
import Playlist from "./Playlist"
import PlaylistContent from "./PlaylistContent"

const StyledPlaylists = styled.div`
    width: calc(100% - 10px);

    position: relative;

    & > div {
        width: 100%;
        height: 240px;
        border-bottom: 2px solid white;
        border-right: 2px solid white;
        border-top: 2px solid gray;
        border-left: 2px solid gray;
        border-style: ridge;

        padding: 10px;

        overflow-y: auto;
    }

    #new-button {
        position: absolute;
        left: 50%;
        top: 0px;

        background-color: var(--gray);

        transform: translateX(-50%) translateY(-50%);

        padding: 7px;
    }
`

export default function Playlists() {
    const getPlaylists = () => {
        const arr = []

        for(let i = 0; i < localStorage.length; i++) {
            arr.push(<Playlist key={"playlist-" + i} content={<PlaylistContent name={localStorage.key(i)} />}>{localStorage.key(i).split("p-")[1]}</Playlist>)
        }

        return arr
    }

    const addPlaylist = () => {
        document.getElementById("cherry-music").style.pointerEvents = "none"
        document.getElementById("create-playlist-window").style.display = "block"
        document.getElementById("create-playlist-window").style.pointerEvents = "all"
    }

    return (
		<StyledPlaylists>
            <div style={{ paddingTop: "20px" }}>
                {getPlaylists()}
            </div>
            <button onClick={addPlaylist} className="styled-button" id="new-button">New Playlist</button>
        </StyledPlaylists>
	)
}