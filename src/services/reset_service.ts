
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

/**
 * ResetService class
 */
export class ResetService {

    /**
     * Reset the database
     * @returns {Promise<boolean>}
     */

    public async Reset(): Promise<boolean> {
        try {
            // Reset the database
            await AppDataSource.query(`DELETE FROM "user"`);
            await AppDataSource.query(`DELETE FROM sqlite_sequence WHERE name = 'user'`);

            // Insert a new user
            // await AppDataSource.query(`
            //     INSERT INTO user (id, name, money) VALUES
            //     (300, 'Efi', 0)
            // `);

            // Log the reset
            console.log(" - Database reset - ");
            return true;
        } catch (error) {
            console.log(" - Error on reset - ", error);
            return false;
        }
    }
}

export const Reset_service = new ResetService();