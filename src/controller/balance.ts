import { Request, Response } from "express"

class BalanceController {
    public async Balance(req: Request, res: Response): Promise<Response> {
        try {
            // Treat request and call services
            

            return res.status(200).send("Event Controller");
        } catch (error) {
            return res.status(500);
        }
    }
}
export const balance_controller = new BalanceController();