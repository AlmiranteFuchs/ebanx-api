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


export type DispatcherResponse =
    | { type: 'success'; data: object }
    | { type: 'error'; reason: DispatcherResponseReason }

export enum DispatcherResponseReason {
    MalformedRequest = 'malformed_request',
    ServerError = 'server_error',
    Prohibited = 'prohibited',
    NotFound = 'not_found'
}