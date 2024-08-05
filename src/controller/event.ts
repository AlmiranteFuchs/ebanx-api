import { Request, Response } from "express"
import { DepositRequestBody, DispatcherResponse, DispatcherResponseReason, TransactionRequestBody, TransferRequestBody, WithdrawRequestBody } from "../types/req_params";
import { Utils } from "../utils/validator";
import { Event_service, EventService } from "../services/event_service";
import { User } from "../entity/User";

class EventController {
    public async Event(req: Request, res: Response): Promise<Response> {
        try {

            // Treat request and call services
            const req_body = req.body as TransactionRequestBody;

            // Call dispatcher
            const response: DispatcherResponse = await this.dispatcher(req_body);

            // Return response
            if (response.type === 'error') {
                if (response.reason === DispatcherResponseReason.MalformedRequest) {
                    return res.status(400).send('0');
                } else if (response.reason === DispatcherResponseReason.NotFound) {
                    return res.status(404).send('0');
                } else if (response.reason === DispatcherResponseReason.Prohibited) {
                    return res.status(403).send('0');
                } else {
                    return res.status(500).send('Server error');
                }
            }

            const response_data = response.data as object;

            return res.status(201).send(response_data);
        } catch (error) {
            return res.status(500).send('Server error');
        }
    }

    private async dispatcher(transactions_body: TransactionRequestBody): Promise<DispatcherResponse> {
        // Glorified switch statement, if else would work too
        switch (transactions_body.type) {
            case 'transfer': {
                if (Utils.validate(transactions_body as TransferRequestBody)) {
                    const response = await Event_service.Transfer(transactions_body as TransferRequestBody);

                    if (response.type === 'error') {
                        return response;
                    }

                    // If success, alter response data to formatted object
                    // Build response data
                    const { user_from, user_to } = response.data as { user_from: User, user_to: User };

                    const response_data = {
                        "origin": {
                            "id": user_from.id.toString(),
                            "balance": user_from.money
                        },
                        "destination": {
                            "id": user_to.id.toString(),
                            "balance": user_to.money
                        }
                    };

                    return { type: 'success', data: response_data };
                }
                break;
            }
            case 'withdraw': {
                if (Utils.validate(transactions_body as WithdrawRequestBody)) {
                    const response = await Event_service.Withdraw(transactions_body as WithdrawRequestBody);

                    if (response.type === 'error') {
                        return response;
                    }

                    // If success, alter response data to formatted object
                    // Build response data
                    const user = response.data as User;

                    const response_data = {
                        "origin": {
                            "id": user.id.toString(),
                            "balance": user.money
                        }
                    };

                    return { type: 'success', data: response_data };
                }
                break;
            }
            case 'deposit': {
                if (Utils.validate(transactions_body as DepositRequestBody)) {
                    const response = await Event_service.Deposit(transactions_body as DepositRequestBody);

                    if (response.type === 'error') {
                        return response;
                    }

                    // If success, alter response data to formatted object
                    // Build response data
                    const user = response.data as User;

                    const response_data = {
                        "destination": {
                            "id": user.id.toString(),
                            "balance": user.money
                        }
                    };

                    return { type: 'success', data: response_data };
                }
                break;
            }
            default:
                break;
        }

        // If validation fails in any case, return the error
        return { type: 'error', reason: DispatcherResponseReason.MalformedRequest };
    }
}
export const event_controller = new EventController();