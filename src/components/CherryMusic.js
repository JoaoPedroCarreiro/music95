import { useContext } from "react"

import styled from "styled-components"

import { CherryContext } from "./Win"

import cherry from "../assets/cherry.png"
import min from "../assets/min.png"
import close from "../assets/close.png"

import TopButtons from "./CherryMusic/TopButtons"
import Home from "./CherryMusic/Home"
import MusicPlayer from "./CherryMusic/MusicPlayer"

const StyledCherryMusic = styled.div`
    width: 480px;
    height: 640px;

    background-color: var(--gray);

    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, calc(-50% - (19px)));

    border-bottom: 3px solid black;
    border-right: 3px solid black;
    border-top: 3px solid white;
    border-left: 3px solid white;
    border-style: ridge;

    padding: 2px;

    overflow: hidden;

    &.minimized {
        display: none;
    }

    .title {
        background-color: var(--blue);
        padding: 5px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        gap: 5px;

        user-select: none;

        div {
            display: flex;
            align-items: center;

            gap: 5px;
        }

        .win-options {
            gap: 3px;

            img {
                width: 9px;

                background-color: var(--gray);

                border-bottom: 2px solid black;
                border-right: 2px solid black;
                border-top: 2px solid white;
                border-left: 2px solid white;
                border-style: ridge;

                box-sizing: content-box;

                padding: 2px;
            }

            img:active {
                border-bottom: 2px solid white;
                border-right: 2px solid white;
                border-top: 2px solid black;
                border-left: 2px solid black;

                transform: translateY(1px);
            }
        }

        h1 {
            font-size: 1rem;
            font-weight: 100;
        }

        img {
            width: 16px;
            image-rendering: pixelated;
        }
    }

    @media only screen and (width <= 480px) {
        width: 100%;
    }
`

export default function CherryMusic() {
    const { minimized, setMinimized, closed, setClosed } = useContext(CherryContext)
    
  	return (
		<StyledCherryMusic id="cherry-music" className={`${minimized || closed ? "minimized" : ""}`}>
            <div className="title">
                <div className="left">
                    <img draggable="false" src={cherry} alt="Cherry Music 95" />
                    <h1>cherry_music_95.exe</h1>
                </div>
                <div className="win-options">
                    <button onClick={() => setMinimized(true)}><img src={min} alt="Min" /></button>
                    <button onClick={() => { setClosed(true); setMinimized(true) }}><img draggable="false" src={close} alt="Close" /></button>
                </div>
            </div>
            <TopButtons />
            <Home />
            <MusicPlayer />
		</StyledCherryMusic>
	)
}