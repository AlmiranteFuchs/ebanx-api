import { Request, Response } from "express"
import { TransactionRequestBody } from "../types/req_params";

class EventController {
    public async Event(req: Request, res: Response): Promise<Response> {
        try {
            // Treat request and call services
            const req_body = req.body as TransactionRequestBody;

            // Switch case to handle the different types of transactions


            return res.status(200).send(req_body);
        } catch (error) {
            return res.status(500);
        }
    }

    private async validator(transactions_body: TransactionRequestBody): Promise<boolean> {
        // Check type of transaction
        switch (transactions_body.type) {
            case 'transfer':
                // Check if origin and destination are valid
                if (!transactions_body.origin || !transactions_body.destination) {
                    return false;
                }
                break;
            case 'withdraw':
                // Check if origin is valid
                if (!transactions_body.origin) {
                    return false;
                }
                break;
            case 'deposit':
                // Check if destination is valid
                if (!transactions_body.destination) {
                    return false;
                }
                break;
            default:
                return false;
        }

        return true;
    }
}
export const event_controller = new EventController();