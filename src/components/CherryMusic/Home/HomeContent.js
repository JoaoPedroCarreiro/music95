import { useContext } from "react"

import styled from "styled-components"

import Playlists from "./Playlist/Playlists"
import CurrentMusic from "./CurrentMusic"
import { TabsContext } from "../Home"
import DiscoverContent from "./DiscoverContent"

const StyledHomeContent = styled.div`
    height: 464px;

    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 40px;

    margin: 30px 0;

    position: relative;

    .discover {
        padding-bottom: 30px;

        button {
            padding: 10px;

            font-size: 1.05rem;
        }
    }
`

export default function HomeContent() {
    const { addTab } = useContext(TabsContext)

    return (
		<StyledHomeContent>
            <CurrentMusic />
            <Playlists />
            <div className="discover">
                <button onClick={() => addTab("New Songs", <DiscoverContent />)} className="styled-button">Discover New Songs</button>
            </div>
        </StyledHomeContent>
	)
}