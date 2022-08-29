import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateShootAroundTable1657877900861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'shoot_around',
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
                        name: 'total_attempts',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'made_attempts',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'spot',
                        type: 'string',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('shoot_around');
    }

}
