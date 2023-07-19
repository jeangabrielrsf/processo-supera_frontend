import { useEffect, useState } from "react";
import styled from "styled-components";
import {
	getTransactions,
	getTransactionsByDateRange,
	getTransactionsByOperatorName,
} from "../services/transactionsApi";
import TransactionItem from "./TransactionItem";

export default function Transactions() {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [type, setType] = useState("default");
	const [initialDate, setInitialDate] = useState("");
	const [finalDate, setFinalDate] = useState("");
	const [operatorName, setOperatorName] = useState("");

	useEffect(() => {
		if (type === "default") {
			const promise = getTransactions();
			promise
				.then((result) => {
					setTransactions(result);
					setLoading(false);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [loading]);

	async function handleInputs() {
		console.log(initialDate);
		console.log(finalDate);
		console.log(operatorName);
		if (initialDate === "" && finalDate === "" && operatorName !== "") {
			try {
				let newTransactions = await getTransactionsByOperatorName(operatorName);
				setTransactions(newTransactions);
			} catch (error) {
				console.log(error);
			}
		}

		if (initialDate !== "" && finalDate !== "" && operatorName === "") {
			try {
				let newTransactions = await getTransactionsByDateRange(
					initialDate,
					finalDate
				);
				setTransactions(newTransactions);
			} catch (error) {
				console.log(error);
			}
		} else if (initialDate === "" && finalDate === "" && operatorName === "") {
			try {
				console.log("situação 3");
				let newTransactions = await getTransactions();
				setTransactions(newTransactions);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<Wrapper>
			<InputArea>
				<InputBox>
					<p>Data de início</p>
					<input
						type="date"
						name="data-inicio"
						id="data-inicio"
						value={initialDate}
						onChange={(e) => setInitialDate(e.target.value)}
					/>
				</InputBox>

				<InputBox>
					<p>Data de fim</p>
					<input
						type="date"
						name="data-fim"
						id="data-fim"
						value={finalDate}
						onChange={(e) => setFinalDate(e.target.value)}
					/>
				</InputBox>

				<InputBox>
					<p>Nome do operador transacionado</p>
					<input
						type="text"
						name="nome-operador"
						id="nome-operador"
						value={operatorName}
						onChange={(e) => setOperatorName(e.target.value)}
					/>
				</InputBox>
			</InputArea>
			<Button>
				<button onClick={handleInputs}>Pesquisar</button>
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
				<Items>
					{loading ? (
						<p>Carregando transações...</p>
					) : (
						transactions.map((transaction, index) => {
							return <TransactionItem key={index} transaction={transaction} />;
						})
					)}
				</Items>
			</TransactionsInfo>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 400px;
	margin-top: 20px;
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
	width: 80%;
	border: 1px solid black;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: normal;
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

const Items = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;
