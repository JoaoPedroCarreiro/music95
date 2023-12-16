import { createContext, useEffect, useRef, useState } from "react"

import styled from "styled-components"

import Tab from "./Home/Tab"
import HomeTab from "./Home/HomeTab"
import HomeContent from "./Home/HomeContent"

let i = 0

const TabsContext = createContext(null)

const Box = styled.div`
    width: 100%;
    height: 510px;

    display: flex;
    flex-direction: column;

    margin-top: 10px;

    position: relative;
`

const Border = styled.div`
    position: absolute;
    top: 28px;
    left: 0;

    transform: translateY(-100%);

    background: transparent;
    width: 100%;
    height: 4px;

    border-left: 1.5px solid white;
    border-right: 1.5px solid black;

    z-index: 3;

    div {
        width: 100%;
        height: 100%;
        border-left: 1.5px solid rgb(171, 171, 171);
        border-right: 2px solid rgb(84, 84, 84);

        z-index: 4;
    }
`

const StyledHome = styled.div`
    width: 100%;
    height: 100%;

    border-bottom: 2px solid black;
    border-right: 2px solid black;
    border-top: 2px solid white;
    border-left: 2px solid white;
    border-style: ridge;

    position: relative;

    overflow-y: auto;
`

const Tabs = styled.div`
    width: max-content;
    height: 25px;

    display: grid;
    grid-template-columns: repeat(${ ({ $tabs }) => $tabs + 1 }, auto);
    align-items: center;
`

export default function Home() {
    const tabsRef = useRef(0)
    const borderRef = useRef(0)
    const boxRef = useRef(0)

    const [windowWidth, setWindowWidth] = useState(470)
    const [tabsNumber, setTabsNumber] = useState(-1)
    const [tabs, setTabs] = useState({})
    const [content, setContent] = useState(<HomeContent />)
    
    const addTab = (name, content=<></>) => {
        const obj = {...tabs}

        tabsRef.current.querySelector(`[data-active="true"]`).removeAttribute("data-active")

        obj[i] = <Tab key={"tab-" + i} active="true" index={i} content={content}>{name}</Tab>

        i++

        setContent(content)

        return setTabs(obj)
    }

    const removeTab = (e) => {
        e.stopPropagation()

        const index = Number(e.currentTarget.parentElement.getAttribute("data-index"))
        const obj = {...tabs}

        obj[index] = undefined
        delete obj[index]

        if(Object.keys(tabs)[Object.keys(tabs).findIndex(element => element === String(index)) + 1]) {
            setContent(tabs[Object.keys(tabs)[Object.keys(tabs).findIndex(element => element === String(index)) + 1]].props.content)
            tabsRef.current.querySelector(`[data-index="${Object.keys(tabs)[Object.keys(tabs).findIndex(element => element === String(index)) + 1]}"]`).setAttribute("data-active", "true")
            
            return setTabs(obj)
        }

        if(Object.keys(obj).length === 0) {
            tabsRef.current.firstChild.setAttribute("data-active", "true")
            setContent(<HomeContent />)
            
            return setTabs(obj)
        }

        setContent(tabs[Object.keys(tabs)[Object.keys(tabs).findIndex(element => element === String(index)) - 1]].props.content)
        tabsRef.current.querySelector(`[data-index="${Object.keys(tabs)[Object.keys(tabs).findIndex(element => element === String(index)) - 1]}"]`).setAttribute("data-active", "true")
        
        return setTabs(obj)
    }

    useEffect(() => {
        const length = Object.keys(tabs).length + 1

        if(length >= tabsNumber && tabsNumber !== -1) {
            const width = Number(windowWidth / length)
            const totalWidth = Number((Number(width).toFixed(2))) * length
            const lastWidth = totalWidth === windowWidth ? width : width + Math.abs(windowWidth - totalWidth) + 0.1

            tabsRef.current.style.gridTemplateColumns = `repeat(${length - 1}, ${width}px) ${lastWidth}px`

            return
        }

        if(tabsRef.current.clientWidth >= windowWidth && tabsNumber === -1) {
            const width = Number(windowWidth / length)
            const totalWidth = Number((Number(width).toFixed(2))) * length
            const lastWidth = totalWidth === windowWidth ? width : width + Math.abs(windowWidth - totalWidth) + 0.1

            tabsRef.current.style.gridTemplateColumns = `repeat(${length - 1}, ${width}px) ${lastWidth}px`

            setTabsNumber(length)

            return
        }

        setTabsNumber(-1)
        tabsRef.current.style = {}
    }, [tabs, tabsNumber, windowWidth])

    useEffect(() => {
        const init = tabsRef.current.firstChild.getBoundingClientRect().left
        const position = document.querySelector(`[data-active="true"]`).getBoundingClientRect().left - init
        const width = document.querySelector(`[data-active="true"]`).getBoundingClientRect().width === 0 ? 54 : document.querySelector(`[data-active="true"]`).getBoundingClientRect().width
        
        borderRef.current.style.background = `linear-gradient(90deg,
            transparent 0px,
            transparent ${position + 1}px,
            var(--gray) ${position + 1}px,
            var(--gray) ${position + width - 4}px,
            transparent ${position + width - 4}px,
            transparent ${windowWidth}px
        )`
    }, [content, windowWidth])

    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(boxRef.current.clientWidth))
    }, [])

    return (
        <TabsContext.Provider value={{ addTab: addTab, removeTab: removeTab, setContent: setContent }}>
            <Box ref={boxRef}>
                <Tabs $tabs={Object.keys(tabs).length} id="tabs" ref={tabsRef}>
                    <HomeTab active="true" />
                    {Object.values(tabs)}
                </Tabs>
                <Border ref={borderRef}><div></div></Border>
                <StyledHome>
                    {content}
                </StyledHome>
            </Box>
        </TabsContext.Provider>
	)
}

export { TabsContext }