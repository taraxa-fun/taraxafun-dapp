
export interface Trade {
    id: string;
    type: "buy" | "sell";
    amount: number;
    date: string;
    transactionNumber: string;
    username: string;
}