import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBasketballGameTableIndex1661872303691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`create index "idx_bgame_timestamp" on "basketball_game" ("timestamp" desc)`);
        await queryRunner.query(`create index "idx_bgame_season" on "basketball_game" ("season_id" desc)`);
        await queryRunner.query(`create index "idx_bgame_team" on "basketball_game" ("team_id" desc)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop index if exists "idx_bgame_timestamp"`);
        await queryRunner.query(`drop index if exists "idx_bgame_season"`);
        await queryRunner.query(`drop index if exists "idx_bgame_team"`);
    }

}
