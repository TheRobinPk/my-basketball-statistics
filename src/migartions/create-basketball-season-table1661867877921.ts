import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateBasketballSeasonTable1661867877921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'basketball_season',
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
                        name: 'start_date',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'end_date',
                        type: 'int',
                        isNullable: false,
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('basketball_season');
    }

}
