import { Request, Response } from "express"
import { balance_service } from "../services/balance_service";


class BalanceController {
    public async Balance(req: Request, res: Response): Promise<Response> {
        try {
            // Treat request and call services
            // Its just one parameter, so we dont need a fancy validator
            const account_id: number = req.query.account_id as unknown as number;

            if (!account_id || isNaN(account_id) || account_id < 0) {
                return res.status(400).send("Invalid ID");
            }


            // Service call
            const balance: Number = await balance_service.get_balance(account_id);

            if (balance === -1) {
                return res.status(404).send('0');
            }

            return res.status(200).send(balance.toString());

        } catch (error) {
            return res.status(500);
        }
    }


}
export const balance_controller = new BalanceController();