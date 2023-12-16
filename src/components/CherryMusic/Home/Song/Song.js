import styled from "styled-components"

const StyledSong = styled.button`
    color: black;

    strong {
        color: black;
        font-weight: 700;
    }

    &:hover {
        text-decoration: underline;
    }
`

export default function Song({ song, index }) {
    return (
		<StyledSong onClick={() => {
            document.getElementById("song-options-window").style.display = "flex"
            document.getElementById("song-options-window").style.pointerEvents = "all"
            document.getElementById("song-options-window").setAttribute("data-current-song", `${index}`)
            document.getElementById("cherry-music").style.pointerEvents = "none"
        }}>
            <strong>{song.name}</strong> - <strong>{song.album}</strong> made by <strong>{song.artist}</strong>
        </StyledSong>
	)
}