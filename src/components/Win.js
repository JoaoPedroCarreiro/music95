import { createContext, useCallback, useEffect, useState } from "react"

import Apps from "./Apps"
import CherryMusic from "./CherryMusic"
import TaskBar from "./TaskBar"
import CreatePlaylistWindow from "./CherryMusic/Home/Playlist/CreatePlaylistWindow"
import RepeatedNameWindow from "./CherryMusic/Home/Playlist/RepeatedNameWindow"
import Options from "./CherryMusic/Home/Playlist/Options"
import RenamePlaylistWindow from "./CherryMusic/Home/Playlist/RenamePlaylistWindow"
import SongOptions from "./CherryMusic/Home/Song/SongOptions"
import Boot from "./CherryMusic/Boot"
import AddToPlaylist from "./CherryMusic/Home/Song/AddToPlaylist"

import songs from "../songs.json"

export const CherryContext = createContext(null)

export default function Win() {
	const [minimized, setMinimized] = useState(false)
	const [closed, setClosed] = useState(true)
	const [volume, setVolume] = useState(0.25)
	const [muted, setMuted] = useState(false)
	const [currentMusic, setCurrentMusic] = useState(-1)
	const [nextMusic, setNextMusic] = useState(-1)
	const [previousMusic, setPreviousMusic] = useState(-1)
	const [currentPlaylist, setCurrentPlaylist] = useState("")
	const [loaded, setLoaded] = useState(false)

	const [, setState] = useState({})
    const reRender = useCallback(() => setState({}), [])

	useEffect(() => {
		if(currentMusic === -1) return

		if(currentPlaylist === "p-New Songs") {
			setNextMusic((Number(currentMusic) === Number(songs.length) - 1) ? 0 : Number(currentMusic) + 1)
			setPreviousMusic((Number(currentMusic) === 0) ? songs.length - 1 : Number(currentMusic) - 1)

			return
		}

		const playlist = localStorage.getItem(currentPlaylist).split(",")
		const musicIndex = playlist.indexOf(String(currentMusic))

		setNextMusic((musicIndex === Number(playlist.length) - 1) ? Number(playlist[0]) : Number(playlist[musicIndex + 1]))
		setPreviousMusic((musicIndex === 0) ? Number(playlist[Number(playlist.length) - 1]) : Number(playlist[Number(musicIndex) - 1]))
	}, [currentMusic, currentPlaylist])

  	return (
		<CherryContext.Provider
			value={{
				minimized: minimized,
				setMinimized: setMinimized,
				closed: closed,
				setClosed: setClosed,
				volume: volume,
				setVolume: setVolume,
				muted: muted,
				setMuted: setMuted,
				currentMusic: currentMusic,
				setCurrentMusic: setCurrentMusic,
				nextMusic: nextMusic,
				setNextMusic: setNextMusic,
				previousMusic: previousMusic,
				setPreviousMusic: setPreviousMusic,
				currentPlaylist: currentPlaylist,
				setCurrentPlaylist: setCurrentPlaylist
			}}
		>
			<Boot setLoaded={setLoaded} />
			{
				(loaded) ? 
					<>
						<Apps />
						<CherryMusic />
						<TaskBar />
						<CreatePlaylistWindow reRender={reRender} />
						<RepeatedNameWindow />
						<Options reRender={reRender} />
						<RenamePlaylistWindow reRender={reRender} />
						<SongOptions />
						<AddToPlaylist />
					</>
				:
					<></>
			}
		</CherryContext.Provider>
	)
}