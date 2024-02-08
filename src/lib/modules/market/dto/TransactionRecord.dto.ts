export interface TransactionRecord {
	username: string;
	resource: 'WOOD' | 'MARBLE' | 'SULFUR' | 'CRYSTAL' | 'WINE' | 'GOLD';
	amount: number;
	price: number;
	type: 'BUY' | 'SELL';
	date: Date;
};
