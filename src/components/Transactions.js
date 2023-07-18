import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTransactions } from "../services/transactionsApi";
import TransactionItem from "./TransactionItem";

export default function Transactions() {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const promise = getTransactions();
		promise
			.then((result) => {
				setTransactions(result);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [loading]);

	return (
		<Wrapper>
			<InputArea>
				<InputBox>
					<p>Data de início</p>
					<input type="date" name="data-inicio" />
				</InputBox>

				<InputBox>
					<p>Data de fim</p>
					<input type="date" name="data-fim" />
				</InputBox>

				<InputBox>
					<p>Nome do operador transacionado</p>
					<input type="text" name="nome-operador" />
				</InputBox>
			</InputArea>
			<Button>
				<button>Pesquisar</button>
			</Button>

			<TransactionsInfo>
				<Info>
					<div>
						<p>Data</p>
					</div>
					<div>
						<p>Valência</p>
					</div>
					<div>
						<p>Tipo</p>
					</div>
					<div>
						<p>Nome do operador transacionado</p>
					</div>
				</Info>
				{loading ? (
					<p>Carregando transações...</p>
				) : (
					transactions.map((transaction, index) => {
						return <TransactionItem key={index} transaction={transaction} />;
					})
				)}
			</TransactionsInfo>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid black;
	height: 400px;
`;

const InputBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const InputArea = styled.div`
	display: flex;
	justify-content: space-between;
	width: 80%;
	height: fit-content;
`;

const Button = styled.div`
	width: 30%;
	margin: 15px;
	border: 1px solid red;
	button {
		background-color: #ff601e;
		border: none;
		width: 100%;
		border-radius: 10px;
		font-size: 20px;
	}

	&:hover {
		cursor: pointer;
	}
`;

const TransactionsInfo = styled.div`
	border: 1px solid black;
`;

const Info = styled.div`
	border: 1px solid green;
	display: flex;
	justify-content: space-between;
	font-size: 18px;

	div {
		border: 1px solid black;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
