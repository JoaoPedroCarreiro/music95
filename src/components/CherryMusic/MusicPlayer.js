import styled from "styled-components"

import play from "../../assets/play.webp"
import pause from "../../assets/pause.webp"
import next from "../../assets/next.webp"

import songs from "../../songs.json"

import { useContext, useEffect, useRef, useState } from "react"
import { CherryContext } from "components/Win"

function toTime(n) {
    const minute = Math.floor(n / 60)
    const second = Math.floor(n % 60)

    return `${minute}:${String(second).length === 1 ? "0" + second : second}`
}

const StyledMusicPlayer = styled.div`
    width: 100%;
    height: 40px;

    margin-top: 2px;

    #buttons {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        gap: 12px;

        button {
            width: 22px;
            height: 22px;

            display: flex;
            align-items: center;
            justify-content: center;

            img {
                pointer-events: none
            }
        }

        .bigger {
            width: 28px;
            height: 28px; 
        }
    }

    #slider {
        display: flex;
        align-items: center;
        justify-content : center;
        gap: 10px;

        width: 100%;

        transform: translateY(-2px);

        p {
            width: 32px;
            color: black;
            font-size: 1rem;
        }
    }

    #play[playing] img {
        content: url(${pause});
    }

    .slider {
        width: 300px;

        input[type="range"] {
            width: 100%;
            height: 17px;

            appearance: none;
            background-color: var(--gray);
    
            border-bottom: 2px solid white;
            border-right: 2px solid white;
            border-top: 2px solid gray;
            border-left: 2px solid gray;

            background-image: linear-gradient(var(--blue), var(--blue));
            background-size: 0% 100%;
            background-repeat: no-repeat;
        }
    
        input[type="range"]::-webkit-slider-thumb {
            width: 14px;
            height: 21px;

            appearance: none;
            background: var(--gray);

            border-bottom: 2px solid black;
            border-right: 2px solid black;
            border-top: 2px solid white;
            border-left: 2px solid white;

            cursor: pointer;
        }
    }

    @media only screen and (width <= 405px) {
        .slider {
            max-width: 300px;
        }
    }
`

export default function MusicPlayer() {
    const { volume, muted, currentMusic, setCurrentMusic, nextMusic, previousMusic, closed } = useContext(CherryContext)

    const slider = useRef(0)
    const audioRef = useRef(0)

    const [canTimeAffect, setCanTimeAffect] = useState(false)
    const [time, setTime] = useState("0:00")

    useEffect(() => {
        if(currentMusic === -1) {
            setCanTimeAffect(false)

            slider.current.value = 0
            slider.current.style.backgroundSize = "0% 100%"

            setTimeout(() => setCanTimeAffect(true), 500)

            return
        }

        if(document.getElementById("play").hasAttribute("playing")) {
            audioRef.current.pause()
        }

        setCanTimeAffect(false)

        audioRef.current.src = require("../../" + songs[currentMusic].url)
        audioRef.current.currentTime = 0
        slider.current.value = 0
        slider.current.style.backgroundSize = "0% 100%"

        setTimeout(() => setCanTimeAffect(true), 500)

        audioRef.current.play()
    }, [currentMusic])

    useEffect(() => {
        audioRef.current.volume = volume
    }, [volume])

    useEffect(() => {
        audioRef.current.muted = muted
    }, [muted])

    useEffect(() => {
        if(closed === true) {
            audioRef.current.pause()
        }
    }, [closed])

    const playAudio = (e) => {
        if(currentMusic === -1) {
            audioRef.current.play()
            
            setTimeout(() => setCanTimeAffect(true), 500)
            
            return
        }

        if(e.currentTarget.hasAttribute("playing")) {
            audioRef.current.pause()
            
            return
        }

        audioRef.current.play()
    }

    const nextSong = () => {
        setCanTimeAffect(false)

        setCurrentMusic(nextMusic)
        audioRef.current.currentTime = 0
        slider.current.value = 0
        slider.current.style.backgroundSize = "0% 100%"

        setTimeout(() => setCanTimeAffect(true), 500)
    }

    const previousSong = () => {
        setCanTimeAffect(false)

        setCurrentMusic(previousMusic)
        audioRef.current.currentTime = 0
        slider.current.value = 0
        slider.current.style.backgroundSize = "0% 100%"

        setTimeout(() => setCanTimeAffect(true), 500)
    }

    const onChange = (e) => {
        e.currentTarget.style.backgroundSize = `${e.currentTarget.value / 10}% 100%`
        setTime(toTime((e.currentTarget.value / 1000) * audioRef.current.duration))
    }

    const onMouseDown = () => {
        setCanTimeAffect(false)
    }

    const onMouseUp = (e) => {
        audioRef.current.currentTime = (e.currentTarget.value / 1000) * audioRef.current.duration
        setCanTimeAffect(true)
    }

    return (
        <StyledMusicPlayer>
            <audio
                src=""
                ref={audioRef}
                onEnded={nextSong}
                onPause={() => {
                    document.getElementById("play").removeAttribute("playing")
                }}
                onPlay={() => {
                    if(!document.getElementById("play").hasAttribute("playing")) document.getElementById("play").toggleAttribute("playing")
                }}
                onTimeUpdate={() => {
                    if(canTimeAffect) {
                        slider.current.style.backgroundSize = `${(audioRef.current.currentTime / audioRef.current.duration) * 100}% 100%`
                        slider.current.value = (audioRef.current.currentTime / audioRef.current.duration) * 1000
                        setTime(toTime(audioRef.current.currentTime))
                    }
                }}
            ></audio>
            <div id="buttons">
                <button onClick={previousSong} className="styled-button" disabled={currentMusic === -1}><img style={{ transform: "rotateZ(180deg)" }} src={next} alt="Previous Music" /></button>
                <button id="play" onClick={playAudio} className="bigger styled-button" disabled={currentMusic === -1}><img src={play} alt="Play/Pause" /></button>
                <button onClick={nextSong} className="styled-button" disabled={currentMusic === -1}><img src={next} alt="Next Music" /></button>
            </div>
            <div id="slider">
                <p>{time}</p>
                <div className="slider">
                    <input
                        ref={slider}
                        type="range"
                        min="0" max="1000"
                        defaultValue={0}
                        onMouseDown={onMouseDown}
                        onChange={onChange}
                        onMouseUp={onMouseUp}
                        disabled={currentMusic === -1}
                    />
                </div>
                <p>{audioRef.current?.duration ? toTime(audioRef.current.duration) : "0:00"}</p>
            </div>
        </StyledMusicPlayer>
    )
}