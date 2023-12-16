import styled from "styled-components"

import songs from "songs.json"
import Song from "./Song/Song"

import play from "assets/play.webp"
import pause from "assets/pause.webp"
import { useContext, useEffect, useRef } from "react"
import { CherryContext } from "components/Win"

const StyledDiscoverContent = styled.div`
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

export default function DiscoverContent() {
	const { currentMusic, setCurrentMusic, currentPlaylist, setCurrentPlaylist } = useContext(CherryContext)

	const onClick = () => {
		if(currentPlaylist === "p-New Songs") return
        if(currentMusic === 0) {
            setCurrentMusic(-1)
            setCurrentPlaylist("p-New Songs")

            setTimeout(() => setCurrentMusic(0, 200))

            return
        }

		setCurrentMusic(0)
		setCurrentPlaylist("p-New Songs")
	}

	const getSongs = () => {
		const arr = []

		for(let i = 0; i < songs.length; i++) {
			arr.push(<Song key={songs[i].name + "-discover"} song={songs[i]} index={i} />)
		}

		return arr
	}

	return (
		<StyledDiscoverContent>
			<div className="play-title">
				<h2>Find new songs</h2>
				<button id="play-button-p-New Songs" onClick={onClick} className="styled-button">Play</button>
			</div>
			<div className="songs">
				{getSongs()}
			</div>
		</StyledDiscoverContent>
	)
}