import styled from "styled-components";

export default function TransactionItem({ transaction }) {
	let date = new Date(transaction.datatransferencia).toLocaleDateString();
	return (
		<Wrapper>
			<div>{date}</div>
			<div>R$ {transaction.valor}</div>
			<div>{transaction.tipo}</div>
			<div>
				{transaction.nomeOperador == null ? "Null" : transaction.nameOperador}
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: fit-content;
	align-items: center;
	font-size: 16px;

	div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;
