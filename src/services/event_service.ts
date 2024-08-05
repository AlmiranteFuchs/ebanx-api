
import { DepositRequestBody, DispatcherResponse, DispatcherResponseReason, TransactionRequestBody, TransferRequestBody, WithdrawRequestBody } from "../types/req_params";
import { DataSource, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";


/**
 * ResetService class
 */
export class EventService {

    private user_repository: Repository<User>;

    constructor(private data_source: DataSource) {
        this.user_repository = this.data_source.getRepository(User);
    }

    /**
     * Transfer money from one user to another
     * @param {TransferRequestBody} transfer
     * @returns {Promise<DispatcherResponse>}
     */

    public async Transfer(transfer: TransferRequestBody): Promise<DispatcherResponse> {
        try {
            // Get user from database
            let user_from: User | null = await this.user_repository.findOne({
                where: { id: parseInt(transfer.origin) }
            });

            let user_to: User | null = await this.user_repository.findOne({
                where: { id: parseInt(transfer.destination) }
            });

            // Check if user exists
            if (!user_from) {
                return { type: "error", reason: DispatcherResponseReason.NotFound };
            }

            // Check if user exists
            if (!user_to) {
                // We should create a new user
                user_to = new User();
                user_to.id = parseInt(transfer.destination);
                user_to.name = "New User"; // Not important for this case
                user_to.money = 0;

                // Save new user
                user_to = await this.user_repository.save(user_to);

                // Check if user was created
                if (!user_to) {
                    return { type: "error", reason: DispatcherResponseReason.ServerError };
                }
            }

            // Check if user has enough money
            if (user_from.money < transfer.amount) {
                return { type: "error", reason: DispatcherResponseReason.Prohibited };
            }

            // Update user money
            user_from.money -= transfer.amount;
            user_to.money += transfer.amount;


            // Save changes
            //  // This right here is where things can go wrong, if one of the saves fails, the money is lost and etc etc
            //  // For the sake of this exercise, we will assume that the save will always work or not work at all
            user_from = await this.user_repository.save(user_from);
            user_to = await this.user_repository.save(user_to);


            // Check if user was updated   
            if (!user_from || !user_to) {
                return { type: "error", reason: DispatcherResponseReason.ServerError };
            }

            return { type: "success", data: { user_from, user_to } };
        } catch (error) {
            return { type: "error", reason: DispatcherResponseReason.ServerError };
        }

    }

    /**
     * Withdraw money from user account
     * @param {WithdrawRequestBody} withdraw
     * @returns {Promise<DispatcherResponse>}
     */

    public async Withdraw(withdraw: WithdrawRequestBody): Promise<DispatcherResponse> {
        try {
            // Get user from database
            let user: User | null = await this.user_repository.findOne({
                where: { id: parseInt(withdraw.origin) }
            });

            // Check if user exists
            if (!user) {
                return { type: "error", reason: DispatcherResponseReason.NotFound };
            }

            // Check if user has enough money
            if (user.money < withdraw.amount) {
                return { type: "error", reason: DispatcherResponseReason.Prohibited };
            }

            // Update user money
            user.money -= withdraw.amount;

            // Save changes
            user = await this.user_repository.save(user);

            // Check if user was updated
            if (!user) {
                return { type: "error", reason: DispatcherResponseReason.ServerError };
            }

            return { type: "success", data: user };
        } catch (error) {
            return { type: "error", reason: DispatcherResponseReason.ServerError };
        }
    }

    /**
     * Deposit money to user account
     * @param {DepositRequestBody} deposit
     * @returns {Promise<DispatcherResponse>}
     */

    public async Deposit(deposit: DepositRequestBody): Promise<DispatcherResponse> {
        try {
            // Get user from database
            let user: User | null = await this.user_repository.findOne({
                where: { id: parseInt(deposit.destination) }
            });

            // Check if user exists
            if (!user) {
                // We should create a new user
                user = new User();
                user.id = parseInt(deposit.destination);
                user.name = "New User"; // Not important for this case
                user.money = 0;

                // Save new user
                user = await this.user_repository.save(user);

                // Check if user was created
                if (!user) {
                    return { type: "error", reason: DispatcherResponseReason.ServerError };
                }
            }

            // Update user money
            user.money += deposit.amount;

            // Save changes
            user = await this.user_repository.save(user);

            // Check if user was updated
            if (!user) {
                return { type: "error", reason: DispatcherResponseReason.ServerError };
            }

            return { type: "success", data: user };
        } catch (error) {
            return { type: "error", reason: DispatcherResponseReason.ServerError };
        }
    }


}

export const Event_service = new EventService(AppDataSource);