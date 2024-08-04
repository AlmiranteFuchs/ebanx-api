import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialState1722807404387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Delete all existing users
        await queryRunner.query(`DELETE FROM "user"`);

        // Reset the sequence
        await queryRunner.query(`DELETE FROM sqlite_sequence WHERE name = 'user'`); 

        // Insert a new user
        await queryRunner.query(`
            INSERT INTO user (id, name, email) VALUES
            (300, 'Efi', 0),
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
