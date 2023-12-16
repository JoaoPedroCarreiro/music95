import { useContext, useEffect, useRef } from "react"
import styled from "styled-components"
import { CherryContext } from "./Win"

const StyledVolume = styled.div`
    width: 110px;
    height: 200px;

    background-color: var(--gray);

    transform: translateX(-50%) translateY(-100%);

    position: absolute;
    top: -13px;
    left: 14px;

    border-bottom: 3px solid black;
    border-right: 3px solid black;
    border-top: 3px solid white;
    border-left: 3px solid white;
    border-style: ridge;

    padding: 2px;

    pointer-events: all;

    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &[open] {
        display: flex;
    }

    p {
        position: absolute;
        top: 5px;
    }

    #sound-slider {
        transform: rotateZ(270deg);

        padding: 8px;
        padding-bottom: 20px;

        border: 2px solid rgba(0,0,0, 0.7);
        border-style: dotted;

        position: relative;

        div {
            position: absolute;
            top: -28px;
            right: 0;

            width: 0;
            height: 0;

            /* background-color: white; */

            border-left: 127px solid transparent;
            border-bottom: 16px solid rgba(255, 255, 255, 0.8);

            overflow: hidden;
        }

        input[type="range"] {
            appearance: none;
            
            width: 108px;
            height: 6px;

            background-color: black;

            border-bottom: 2px solid white;
            border-right: 2px solid gray;
            border-top: 2px solid gray;
            border-left: 2px solid white;
        }

        input[type="range"]::-webkit-slider-thumb {
            width: 13px;
            height: 21px;

            appearance: none;
            background: var(--gray);

            border-bottom: 1px solid black;
            border-right: 1px solid white;
            border-top: 1px solid white;
            border-left: 1px solid black;

            cursor: pointer;
        }
    }

    #mute {
        position: absolute;
        bottom: 5px;
        left: 10px;

        display: flex;
        gap: 5px;

        div {
            border-top: 1px solid rgba(0, 0, 0, 0.5);
            border-left: 1px solid rgba(0, 0, 0, 0.5);
            border-bottom: 1px solid white;
            border-right: 1px solid white;
        }

        input[type="checkbox"] {
            appearance: none;

            width: 1rem;
            height: 1rem;

            background-color: white;

            border-top: 2px solid black;
            border-left: 2px solid black;
            border-bottom: 2px solid var(--gray);
            border-right: 2px solid var(--gray);
            
            position: relative;

            &:checked::after {
                content: "";

                position: absolute;

                left: 50%;
                top: 1px;

                width: 3px;
                height: 6px;

                border: solid black;
                border-width: 0 3px 3px 0;

                transform: translateX(-50%) rotate(45deg);
            }
        }

        label {
            color: black;
            position: relative;
        }

        span::after {
            content: "";

            position: absolute;

            bottom: -1px;
            left: 1px;

            width: 12px;
            height: 2px;

            background-color: black;
        }
    }
`

export default function Volume() {
    const volumeSlider = useRef(0)

    const { setVolume, setMuted } = useContext(CherryContext)

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if(!volumeSlider.current.hasAttribute("open")) return
            if(!volumeSlider.current.contains(e.target)) volumeSlider.current.removeAttribute("open")
        })
    }, [])

	return (
		<StyledVolume ref={volumeSlider} id="volume-window">
            <p>Volume</p>
            <div id="sound-slider">
                <div></div>
                <input onChange={(e) => setVolume(e.currentTarget.value / 100)} type="range" min={0} max={100} defaultValue={25} />
            </div>
            <div id="mute">
                <input id="mute-input" type="checkbox" onChange={(e) => setMuted(e.currentTarget.checked)} />
                <label htmlFor="mute-input">Mute</label>
            </div>
		</StyledVolume>
	)
}