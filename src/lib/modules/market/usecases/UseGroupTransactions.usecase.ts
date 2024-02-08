import type { TransactionRecord } from '../dto/TransactionRecord.dto';

const arePriceSimilar = (price1: number, price2: number): boolean => {
	return Math.floor(price1/100) === Math.floor(price2/100);
}

export const UseGroupTransactions = () => ({
	execut: (transactions: TransactionRecord[]): TransactionRecord[] => {
		const allTransactions = [...transactions];
		const groupedTransactions: TransactionRecord[] = [];
		let currentGroup: TransactionRecord[] = [];

		for (let i = 0; i < allTransactions.length; i++) {
			// If empty, start a new group
			if (currentGroup.length === 0) {
				currentGroup.push(allTransactions[i]);
				continue;
			}
			// If the current transaction is the same type, resource and price as the group, add it to the group
			if (
				currentGroup[0].type === allTransactions[i].type &&
				currentGroup[0].resource === allTransactions[i].resource &&
				arePriceSimilar(currentGroup[0].price, allTransactions[i].price)
			) {
				currentGroup.push(allTransactions[i]);
				continue;
			}
			// If the current transaction is different, close the group and start a new one
			groupedTransactions.push({
				...currentGroup[0],
				amount: currentGroup.reduce((acc, curr) => acc + curr.amount, 0)
			});
			currentGroup = [];
			currentGroup.push(allTransactions[i]);
		}
		// Add the last group to the list
		groupedTransactions.push(...currentGroup);

		return groupedTransactions;
	}
});
