import styled from "styled-components"

const StyledApp = styled.div`
    pointer-events: none;
    user-select: none;

    width: 90px;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 4px;

    border: 1px solid transparent;

    padding: 4px;

    img {
        width: 32px;
        height: 32px;
    }

    p {
        text-align: center;
        font-size: 0.8rem;
    }
`

export default function App({ icon, name }) {
    return (
        <StyledApp>
            <img src={icon} alt={name} />
            <p>{name}</p>
        </StyledApp>
    )
}