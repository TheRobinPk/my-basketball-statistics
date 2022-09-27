import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateBasketballGameTable1661872303691 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'basketball_game',
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
                        name: 'game_type',
                        type: 'string',
                        isNullable: false,
                    },
                    {
                        name: 'opponent_name',
                        type: 'string',
                        isNullable: false,
                    },
                    {
                        name: 'outcome',
                        type: 'string',
                        isNullable: false,
                    },
                    {
                        name: 'final_score',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'final_score_opp',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'is_played',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'is_started',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'minutes',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'fga',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'fgm',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'fga_three',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'fgm_three',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'fta',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'ftm',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'orb',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'drb',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'ast',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'blk',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'stl',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'tov',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'pf',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'pts',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'season_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'team_id',
                        type: 'integer',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'basketball_season',
                        columnNames: ['season_id'],
                        referencedColumnNames: ['id']
                    },
                    {
                        referencedTableName: 'basketball_team',
                        columnNames: ['team_id'],
                        referencedColumnNames: ['id']
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('basketball_game');
    }

}
