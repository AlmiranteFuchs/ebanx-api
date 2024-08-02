export type TransferRequestBody = {
    type: 'transfer';
    origin: string;
    destination: string;
    amount: number;
};

export type WithdrawRequestBody = {
    type: 'withdraw';
    origin: string;
    amount: number;
};

export type DepositRequestBody = {
    type: 'deposit';
    destination: string;
    amount: number;
};

export type TransactionRequestBody =
    | TransferRequestBody
    | WithdrawRequestBody
    | DepositRequestBody;
