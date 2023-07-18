import styled from "styled-components";
import Transactions from "../components/Transactions";

export default function Home() {
	return (
		<>
			<Header>Processo Seletivo - Supera Tecnologia</Header>
			<Transactions />
		</>
	);
}

const Header = styled.header`
	border: 1px solid black;
	background-color: #ff601e;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 40px;
	font-weight: 700;
`;
