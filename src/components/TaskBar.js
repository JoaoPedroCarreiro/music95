import { useContext, useEffect, useState } from "react"
import styled from "styled-components"

import { CherryContext } from "./Win"

import win from "../assets/win.png"
import cherry from "../assets/cherry.png"
import sound from "../assets/sound.webp"
import Volume from "./Volume"

const StyledTaskBar = styled.div`
    width: 100%;
    height: 36px;

    position: absolute;
    bottom: 0;

    padding: 3px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: var(--gray);

    pointer-events: none;
    user-select: none;
    
    &:before {
        content: "";

        background-color: white;
        width: 100%;
        height: 3px;

        position: absolute;
        top: -3px;
        left: 0;
    }

    img {
        width: 24px;
        height: 24px;
    }

    p {
        color: black;
    }

    .left {
        display: flex;

        gap: 10px;
    }

    .start {
        display: flex;
        align-items: center;

        gap: 5px;

        width: max-content;
        height: 24px;

        border-bottom: 2px solid black;
        border-right: 2px solid black;
        border-top: 2px solid white;
        border-left: 2px solid white;
        border-style: ridge;

        padding: 13px 4px;
    }

    .cherry {
        display: flex;
        align-items: center;

        gap: 5px;

        width: max-content;
        height: 24px;

        border-bottom: 2px solid white;
        border-right: 2px solid white;
        border-top: 2px solid black;
        border-left: 2px solid black;
        border-style: ridge;

        padding: 13px 4px;

        background-color: var(--lgray);

        pointer-events: all;

        img {
            pointer-events: none;
            image-rendering: pixelated;
        }
    }

    .cherry.minimized {
        border-bottom: 2px solid black;
        border-right: 2px solid black;
        border-top: 2px solid white;
        border-left: 2px solid white;
        border-style: ridge;

        background-color: var(--gray);
    }
    
    .cherry.closed {
        display: none;
    }    

    .time {
        display: flex;
        align-items: center;

        gap: 10px;

        width: max-content;
        height: 24px;

        border-bottom: 2px solid white;
        border-right: 2px solid white;
        border-top: 2px solid gray;
        border-left: 2px solid gray;

        padding: 13px 4px;
    }
    
    @media only screen and (width <= 405px) {
        width: 100%;
        height: 35px;

        justify-content: center;
        gap: 10px;

        * {
            font-size: 0.8rem;

            img {
                width: 16px;
                height: 16px;
            }
        }
    }

    @media only screen and (width <= 335px) {
        * {
            font-size: 0.7rem;
        }
    }

    @media only screen and (width <= 305px) {
        .right {
            display: none;
        }
    }
`

export default function TaskBar() {
    const { minimized, setMinimized, closed } = useContext(CherryContext)

    const date = new Date()

    const hour = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours()
    const minutes = (String(date.getMinutes()).length === 1) ? "0" + date.getMinutes() : date.getMinutes()
    const meridiem = (date.getHours() > 12) ? "PM" : "AM"

    const [time, setTime] = useState(`${hour}:${minutes} ${meridiem}`)

    useEffect(() => {
        const interval = setInterval(() =>  {
            const date = new Date()

            const hour = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours()
            const minutes = (String(date.getMinutes()).length === 1) ? "0" + date.getMinutes() : date.getMinutes()
            const meridiem = (date.getHours() > 12) ? "PM" : "AM"

            setTime(`${hour}:${minutes} ${meridiem}`)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <StyledTaskBar>
            <div className="left">
                <div className="start">
                    <img src={win} alt="Start" />
                    <p>Start</p>
                </div>
                <button onClick={() => setMinimized(!minimized)} className={`cherry ${minimized ? "minimized" : ""} ${closed ? "closed" : ""}`}>
                    <img src={cherry} alt="Cherry Logo" />
                    <p>cherry_music_95.exe</p>
                </button>
            </div>
            <div className="right">
                <div className="time" style={{ position: "relative" }}>
                    <Volume />
                    <button
                        style={{ pointerEvents: "all" }}
                        onClick={() => {
                            if(document.getElementById("volume-window").hasAttribute("open")) return  
                            setTimeout(() => document.getElementById("volume-window").toggleAttribute("open"), 100)
                        }}>
                        <img src={sound} alt="Start" />
                    </button>
                    <p>{time}</p>
                </div>
            </div>
        </StyledTaskBar>
    )
}