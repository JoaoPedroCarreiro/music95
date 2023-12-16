import { CherryContext } from "components/Win"
import { useContext } from "react"
import styled from "styled-components"
import songs from "songs.json"

const StyledCurrentMusic = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    .img-music {
        width: 148px;
        height: 148px;

        border-bottom: 3px solid black;
        border-right: 3px solid black;
        border-top: 3px solid white;
        border-left: 3px solid white;
        border-style: ridge;

        padding: 2px;

        color: black;
    }

    p {
        color: black;
        text-align: center;
    }

    strong {
        color: black;
        font-weight: 700;
    }
`

export default function CurrentMusic() {
    const { currentMusic } = useContext(CherryContext)

    return (
        <StyledCurrentMusic>
            
            {
                currentMusic === -1 ?
                    <>
                        <div className="img-music"></div>
                        <p><strong>No music playing</strong></p>
                    </>
                :
                    <>
                        <img className="img-music" src={require("../../../" + songs[currentMusic].img)} alt={songs[currentMusic].name + " image"} />
                        <p><strong>{songs[currentMusic].name} - {songs[currentMusic].album}</strong></p>
                        <p>by <strong>{songs[currentMusic].artist}</strong></p>
                    </>
            }
        </StyledCurrentMusic>
    )
}