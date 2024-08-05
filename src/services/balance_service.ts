
import { DataSource, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

/**
 * BalanceService class
 */
export class BalanceService {

    private user_repository: Repository<User>;

    constructor(private data_source: DataSource) {
        this.user_repository = this.data_source.getRepository(User);
    }

    /**
     * Gets the balance of a user
     * @returns {Promise<boolean>}
     */

    public async GetBalance(user_id: number): Promise<number> {
        try {
            const user = await this.user_repository.findOneBy({ id: user_id });

            if (!user) {
                return -1;  // User not found
            }

            return user.money;
        } catch (error) {
            console.error('Error fetching user balance:', error);
            return -1;
        }
    }
}

export const balance_service = new BalanceService(AppDataSource);