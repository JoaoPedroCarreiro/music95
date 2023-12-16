import styled from "styled-components"

const StyledTopButtons = styled.div`
    display: flex;
    gap: 12px;

    color: black;

    margin: 0 6px;
    margin-top: 5px;

    font-size: .9rem;

    button:hover {
        text-decoration: underline;
    }
`

export default function TopButtons() {
    return (
		<StyledTopButtons>
            <button>File</button>
            <button>Edit</button>
            <button>View</button>
            <button>Options</button>
            <button>Help</button>
        </StyledTopButtons>
	)
}