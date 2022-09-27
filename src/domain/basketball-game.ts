import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BasketballTeamEntity} from './basketball-team';
import {BasketballSeasonEntity} from './basketball-season';

export enum BasketballGameType {
    BASIC,
    COMPLETE
}

export enum BasketballGameOutcome {
    WON,
    LOST
}

@Entity('basketball_game')
export class BasketballGameEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, name: 'timestamp' })
    timestamp!: number;

    @Column({ nullable: false, name: 'game_type' })
    gameType!: string;

    @Column({ nullable: false, name: 'opponent_name' })
    opponentName!: string;

    @Column({ nullable: false, name: 'outcome' })
    gameOutcome!: string;

    @Column({ nullable: false, name: 'final_score' })
    finalScore!: number;

    @Column({ nullable: false, name: 'final_score_opp' })
    finalScoreOpponent!: number;

    @Column({ nullable: false, name: 'is_played' })
    played!: boolean;

    @Column({ nullable: false, name: 'is_started' })
    started!: boolean;

    @Column({ nullable: false, name: 'minutes' })
    minutesPlayed!: number;

    @Column({ nullable: false, name: 'fga' })
    fieldGoalAttempts!: number;

    @Column({ nullable: false, name: 'fgm' })
    fieldGoalsMade!: number;

    @Column({ nullable: false, name: 'fga_three' })
    fieldGoalAttemptsThree!: number;

    @Column({ nullable: false, name: 'fgm_three' })
    fieldGoalsMadeThree!: number;

    @Column({ nullable: false, name: 'fta' })
    freeThrowAttempts!: number;

    @Column({ nullable: false, name: 'ftm' })
    freeThrowsMade!: number;

    @Column({ nullable: false, name: 'orb' })
    offensiveRebounds!: number;

    @Column({ nullable: false, name: 'drb' })
    defensiveRebounds!: number;

    @Column({ nullable: false, name: 'ast' })
    assists!: number;

    @Column({ nullable: false, name: 'blk' })
    blocks!: number;

    @Column({ nullable: false, name: 'stl' })
    steals!: number;

    @Column({ nullable: false, name: 'tov' })
    turnovers!: number;

    @Column({ nullable: false, name: 'pf' })
    fouls!: number;

    @Column({ nullable: false, name: 'pts' })
    points!: number;

    @JoinColumn({ name: 'season_id' })
    @ManyToOne(() => BasketballSeasonEntity)
    season!: BasketballSeasonEntity;

    @JoinColumn({ name: 'team_id' })
    @ManyToOne(() => BasketballTeamEntity)
    team!: BasketballTeamEntity;
}