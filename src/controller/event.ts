import { Request, Response } from "express"

class EventController {
    public async Event(req: Request, res: Response): Promise<Response> {
        try {
            // Treat request and call services
            

            return res.status(200).send("Event Controller");
        } catch (error) {
            return res.status(500);
        }
    }
}
export const event_controller = new EventController();