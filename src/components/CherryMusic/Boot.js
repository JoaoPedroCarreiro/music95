import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import boot from "assets/boot.webp"

const StyledBoot = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    z-index: 5;

    width: 100%;
    height: 100vh;

    border: 25px solid black;

    overflow: hidden;

    /* pointer-events: none;
    user-select: none; */

    background-color: black;

    #messages {
        display: flex;
        flex-direction: column;

        gap: 20px;

        p {
            display: none;
        }

        & > p:nth-last-child(2) {
            animation: infinite blink-anim 0.3s steps(2, start);
        }

        & > p:last-child {
            position: absolute;

            bottom: 200px;
            left: 0;
        }
    }

    #boot-window {
        display: none;

        width: 100%;
        height: calc(100% - 25px);

        img {
            width: 100%;
            height: 100%;
        }

        #loading-bar {
            position: relative;

            width: 100%;
            height: 25px;

            background-color: rgb(174, 184, 193);

            div {
                position: absolute;
                top: 0;
                left: -100px;

                width: 75%;
                height: 100%;

                background: linear-gradient(90deg, rgb(174, 184, 193) 0%, rgb(77, 127, 184) 45%, rgb(77, 127, 184) 55%, rgb(174, 184, 193) 100%);

                animation: infinite loading-anim 2.2s linear;
            }
        }
    }

    @keyframes blink-anim {
        to {
            visibility: hidden;
        }
    }

    @keyframes loading-anim {
        0% { left: -75% }
        100% { left: 100% }
    }
`

export default function Boot({ setLoaded }) {
    const bootRef = useRef(0)
    const messagesRef = useRef(0)
    const bootWindowRef = useRef(0)

    const [notLoaded, setNotLoaded] = useState(true)
    const [clicked, setClicked] = useState(false)

    const onKeyDown = (e) => {
        if(clicked) return

        if(e.key === "s") {
            setClicked(true)
    
            bootRef.current.style.display = "none"
            document.body.style.cursor = `url(${require("../../assets/arrow.cur")}), auto`
    
            setLoaded(true)

            return
        }
        
        if(notLoaded) return

        setClicked(true)

        messagesRef.current.style.display = "none"
        bootWindowRef.current.style.display = "block"

        setTimeout(() => {
            bootRef.current.style.display = "none"
            document.body.style.cursor = `url(${require("../../assets/loading.cur")}), auto`

            const startupAudio = new Audio(require("../../assets/startup.mp3"))
            startupAudio.volume = 0.5
            startupAudio.play()

            setTimeout(() => {
                document.body.style.cursor = `url(${require("../../assets/arrow.cur")}), auto`

                setLoaded(true)
            }, 1500)
        }, 4000)
    }

    useEffect(() => {
        for(let i = 0; i < messagesRef.current.querySelectorAll("p").length; i++) {
            setTimeout(() => {
                messagesRef.current.querySelectorAll("p").item(i).style.display = "block"
            }, 800 + (i * 800))
        }

        setTimeout(() => {
            setNotLoaded(false)
        }, 5500)
    }, [])

    return (
        <StyledBoot onKeyDown={onKeyDown} tabIndex="0" ref={bootRef}>
            <div ref={messagesRef} id="messages">
                <p>CherryWindows95 Version 1.0</p>
                <div>
                    <p>Made by João Pedro Carreiro.</p>
                    <p>More websites on <span style={{ textDecoration: "underline" }}>www.localhost.com</span></p>
                    <p>Enjoy!</p>
                </div>
                <p>_</p>
                <p>Press any key to start.</p>
            </div>
            <div ref={bootWindowRef} id="boot-window">
                <img src={boot} alt="boot" />
                <div id="loading-bar"><div></div></div>
            </div>
        </StyledBoot>
    )
}