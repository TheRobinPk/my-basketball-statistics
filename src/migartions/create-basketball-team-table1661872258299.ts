import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateBasketballTeamTable1661872258299 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'basketball_team',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'timestamp',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'string',
                        isNullable: false,
                    },
                    {
                        name: 'season_id',
                        type: 'integer',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'basketball_season',
                        columnNames: ['season_id'],
                        referencedColumnNames: ['id']
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('basketball_team');
    }

}
