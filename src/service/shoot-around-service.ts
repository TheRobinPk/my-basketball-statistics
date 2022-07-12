import {SQLTransaction, WebSQLDatabase} from 'expo-sqlite';
import {ShootAround} from '../domain/shoot-around';
import {SQLError, SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import moment from 'moment';

const CREATE_TABLE_SQL = 'create table if not exists shoot_around(' +
    'id integer primary key autoincrement,' +
    'timestamp integer,' +
    'total_attempts integer,' +
    'made_attempts integer,' +
    'spot text' +
    ')';

const INSERT_STATEMENT = 'insert into shoot_around(timestamp, total_attempts, made_attempts, spot) values (?, ?, ?, ?)';

const SELECT_ALL_STATEMENT = 'select id, timestamp, total_attempts, made_attempts, spot from shoot_around';

export default class ShootAroundService {
    static initTable(database: WebSQLDatabase): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            database.exec([{ sql: CREATE_TABLE_SQL, args: [] }], false, (error) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }

    static insert(database: WebSQLDatabase, shootAround: ShootAround) {
        return new Promise((resolve, reject) => {
            database.transaction((transaction: SQLTransaction) => {
                transaction.executeSql(
                    INSERT_STATEMENT,
                    [
                        shootAround.dateTime.unix(),
                        shootAround.totalAttempts,
                        shootAround.madeAttempts,
                        shootAround.spot.toString()
                    ],
                    (transaction: SQLTransaction, resultSet: SQLResultSet) => {
                        resolve(resultSet);
                },
                    (transaction: SQLTransaction, error: SQLError): boolean => {
                        if (error) {
                            reject(error);
                        }
                        return !!error;
                    });
            });
        });
    }

    static findAll(database: WebSQLDatabase): Promise<ShootAround[]> {
        return new Promise((resolve, reject) => {
            database.transaction((transaction: SQLTransaction) => {
                transaction.executeSql(
                    SELECT_ALL_STATEMENT,
                    [],
                    (transaction: SQLTransaction, resultSet: SQLResultSet) => {
                        resolve(resultSet.rows._array.map(ShootAroundService.resultSetMapper));
                    },
                    (transaction: SQLTransaction, error: SQLError): boolean => {
                        if (error) {
                            reject(error);
                            return false;
                        }
                        return true;
                    });
            });
        });
    }

    private static resultSetMapper(item: any) {
        return {
            id: item['id'],
            dateTime: moment.unix(item['timestamp'] as number),
            totalAttempts: item['total_attempts'] as number,
            madeAttempts: item['made_attempts'] as number,
            spot: item['spot']
        };
    }
}
