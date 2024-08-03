import { Request, Response } from "express"
import { DepositRequestBody, TransactionRequestBody, TransferRequestBody, WithdrawRequestBody } from "../types/req_params";
import { Utils } from "../utils/validator";

class EventController {
    public async Event(req: Request, res: Response): Promise<Response> {
        try {
            // Treat request and call services
            const req_body = req.body as TransactionRequestBody;
            
            
            if (!this.dispatcher(req_body)) {
                return res.status(400).send('Invalid request');
            }


            return res.status(200).send(req_body);
        } catch (error) {
            return res.status(500);
        }
    }

    private async dispatcher(transactions_body: TransactionRequestBody): Promise<boolean> {
        // Switch, call the validator and dispatch to service
        switch (transactions_body.type) {
            case 'transfer':
                if (Utils.validate(transactions_body as TransferRequestBody)) {
                    // Call transfer service
                };
                return true;
                break;
            case 'withdraw':
                if (Utils.validate(transactions_body as WithdrawRequestBody)) {
                };
                return true;
                break;
            case 'deposit':
                if (Utils.validate(transactions_body as DepositRequestBody)) {
                };
                return true;
                break;
            default:
                return false;
        }
    }
}
export const event_controller = new EventController();