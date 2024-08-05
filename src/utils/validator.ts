import { DepositRequestBody, TransactionRequestBody, TransferRequestBody, WithdrawRequestBody } from "../types/req_params";

// Abstract class 
export class Utils {
    // Overload signatures
    static validate(request: TransferRequestBody): boolean;
    static validate(request: WithdrawRequestBody): boolean;
    static validate(request: DepositRequestBody): boolean;

    // Implementation
    static validate(request: TransactionRequestBody): boolean {
        switch (request.type) {
            case 'transfer':
                return this.validateTransfer(request);
            case 'withdraw':
                return this.validateWithdraw(request);
            case 'deposit':
                return this.validateDeposit(request);
            default:
                return false;
        }
    }

    private static validateTransfer(request: TransferRequestBody): boolean {
        return typeof request.origin === 'string' &&
            typeof request.destination === 'string' &&
            typeof request.amount === 'number' && request.amount >= 0;
    }

    private static validateWithdraw(request: WithdrawRequestBody): boolean {
        return typeof request.origin === 'string' &&
            typeof request.amount === 'number' && request.amount >= 0;
    }

    private static validateDeposit(request: DepositRequestBody): boolean {
        return typeof request.destination === 'string' &&
            typeof request.amount === 'number' && request.amount >= 0;
    }
}
