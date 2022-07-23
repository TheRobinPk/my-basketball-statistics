import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShootAroundTableIndex1658570828462 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`create index "idx_shootaround_timestamp" on "shoot_around" ("timestamp" desc)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop index if exists "idx_shootaround_timestamp"`);
    }

}
