import App from "./Apps/App"
import styled from "styled-components"

import computer from "../assets/computer.png"
import netneighborhood from "../assets/netneighborhood.png"
import inbox from "../assets/inbox.png"
import trash from "../assets/trash.png"

import CherryApp from "./Apps/CherryApp"

const StyledApps = styled.div`
    padding: 10px 5px;

    display: flex;
    flex-direction: column;

    gap: 20px;
`

export default function Apps() {
    return (
        <StyledApps>
            <App icon={computer} name="My Computer" />
            <App icon={netneighborhood} name="Network Neighborhood" />
            <App icon={inbox} name="Inbox" />
            <App icon={trash} name="Recycle Bin" />
            <CherryApp />
        </StyledApps>
    )
}