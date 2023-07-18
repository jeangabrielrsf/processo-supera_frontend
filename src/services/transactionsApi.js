import api from "./api";

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
	const response = await api.get(`/transferencias/${initialDate}-${finalDate}`);
	return response.data;
}
