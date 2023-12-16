import styled from "styled-components"

import songs from "songs.json"
import Song from "../Song/Song"

import { useContext } from "react"
import { CherryContext } from "components/Win"

const StyledPlaylistContent = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	gap: 40px;

	margin: 20px 0px;

	.play-title {
		margin: 0 15px;
		padding: 0 20px;

		position: relative;
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		
		h2 {
			color: black;
			letter-spacing: 2px;

			width: 325px;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		button {
			display: flex;
			justify-content: center;
			align-items: center;

            padding: 5px;
		}

		&::after {
			content: "";

			width: 100%;
			height: 1px;

			background-color: rgba(0, 0, 0, 0.6);
			border-bottom: 1px solid white;

			transform: translateY(-50%);

			position: absolute;
			bottom: -20px;
			left: 0;
		}
	}

	.songs {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
`

export default function PlaylistContent({ name }) {
	const { currentMusic, setCurrentMusic, currentPlaylist, setCurrentPlaylist } = useContext(CherryContext)

	const onClick = () => {
		if(localStorage.getItem(name) === "empty") return
        if(currentPlaylist === name) return
        if(currentMusic === Number(localStorage.getItem(name)[0])) {
            setCurrentMusic(-1)
            setCurrentPlaylist(name)

            setTimeout(() => setCurrentMusic(Number(localStorage.getItem(name)[0])), 200)

            return
        }

		setCurrentMusic(Number(localStorage.getItem(name)[0]))
		setCurrentPlaylist(name)
	}

	const getSongs = () => {
		if(localStorage.getItem(name) === "empty") {
			return (
				<p style={{ width: "100%", textAlign: "center" }}>
					<strong style={{ color: "black", fontSize: "1.5rem", fontWeight: "600" }}>This Playlist is empty.</strong>
				</p>
			)
		}

		const arr = []

        const playlistSongs = localStorage.getItem(name).split(",")

		for(let i = 0; i < playlistSongs.length; i++) {
			arr.push(<Song key={songs[Number(playlistSongs[i])].name + "-playlist-" + name} song={songs[Number(playlistSongs[i])]} index={Number(playlistSongs[i])} />)
		}

		return arr
	}

	return (
		<StyledPlaylistContent>
			<div className="play-title">
				<h2>{name.slice(2, name.length)}</h2>
				<button id={"play-button-" + name} onClick={onClick} className="styled-button">Play</button>
			</div>
			<div className="songs">
				{getSongs()}
			</div>
		</StyledPlaylistContent>
	)
}