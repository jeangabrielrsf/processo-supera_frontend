import api from "./api";
import dayjs from "dayjs";

export async function getTransactions() {
	const response = await api.get("/transferencias");
	return response.data;
}

export async function getTransactionsByAccountId(accountId) {
	const response = await api.get(`/transferencias/conta/${accountId}`);
	return response.data;
}

export async function getTransactionsByOperatorName(operatorName) {
	const response = await api.get(`/transferencias/operador/${operatorName}`);
	return response.data;
}

export async function getTransactionsByDateRange(initialDate, finalDate) {
	let initialDateConverted = dayjs(initialDate).toISOString();
	console.log(initialDateConverted);
	let finalDateConverted = dayjs(finalDate).toISOString();
	console.log(finalDateConverted);
	const response = await api.get(
		`/transferencias/${initialDateConverted}/${finalDateConverted}`
	);
	return response.data;
}
