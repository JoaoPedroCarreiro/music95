import { useRef } from "react"
import styled from "styled-components"

import close from "../../../../assets/close.png"
import alert from "../../../../assets/alert.png"

const StyledRepeatedNameWindow = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;

    width: 300px;
    height: auto;
    background-color: var(--gray);

    transform: translateX(-50%) translateY(-50%);

    z-index: 5;

    border-bottom: 2px solid black;
    border-right: 2px solid black;
    border-top: 2px solid white;
    border-left: 2px solid white;
    border-style: ridge;

    padding: 3px;

    display: none;

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

    .content-alert {
        padding: 10px;
        
        & > div {
            display: flex;
            gap: 7px;

            p {
                color: black;
                flex: 2;
            }
        }

        button {
            margin: 0 50%;
            margin-top: 10px;

            transform: translateX(-50%);

            padding: 3px 30px;
        }
    }
`

export default function RepeatedNameWindow() {
    const window = useRef(0)

    const closeFunc = () => {
        window.current.style.display = "none"

        document.getElementById("cherry-music").style.pointerEvents = "all"
    }

    return (
		<StyledRepeatedNameWindow ref={window} id="repeated-name-window">
            <div className="title">
                <div className="left">
                    <h1>cherry_music_95.exe</h1>
                </div>
                <div className="win-options">
                    <button onClick={closeFunc}><img draggable="false" src={close} alt="Close" /></button>
                </div>
            </div>
            <div className="content-alert">
                <div>
                    <img src={alert} alt="Alert" />
                    <p>Already have a playlist with this name or name is empty</p>
                </div>
                <button onClick={closeFunc} className="styled-button">Ok</button>
            </div>
        </StyledRepeatedNameWindow>
	)
}