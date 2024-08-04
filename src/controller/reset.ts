import { Request, Response } from "express"
import { reset_service } from "../services/reset_service";


class ResetController {
    public async Reset(req: Request, res: Response): Promise<Response> {
        try {
            // Calls the reset service
            // await promise
            const reseted: Boolean = await reset_service.Reset();

            // If reseted, return 200
            if (reseted) {
                return res.status(200).send("OK");
            }
            return res.status(500);


        } catch (error) {
            return res.status(500);
        }
    }


}
export const reset_controller = new ResetController();