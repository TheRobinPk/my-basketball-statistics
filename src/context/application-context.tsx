import React, {createContext, useContext, useReducer} from 'react';
import {applicationReducer, ApplicationState, initialState} from '../reducers/application/application-reducer';
import {useComponentDidMount} from '../hooks/use-component-did-mount';
import {createConnection, DataSource} from 'typeorm';
import ENV from '../static/environmnent.config';
import {ShootAroundEntity} from '../domain/shoot-around';
import {CreateShootAroundTable1657877900861} from '../migartions/create-shootaround-table1657877900861';
import {CreateShootAroundTableIndex1658570828462} from '../migartions/create-shootaround-table-index1658570828462';
import {CreateBasketballSeasonTable1661867877921} from '../migartions/create-basketball-season-table1661867877921';
import {CreateBasketballTeamTable1661872258299} from '../migartions/create-basketball-team-table1661872258299';
import {CreateBasketballGameTable1661872303691} from '../migartions/create-basketball-game-table1661872303691';
import {BasketballGameEntity, BasketballSeasonEntity, BasketballTeamEntity} from '../domain/basketball-game';

const ApplicationContext = createContext<ApplicationState>(initialState);

export const useApplicationContext = () => {
    return useContext(ApplicationContext);
};

interface IProps {
    children: React.ReactNode;
}

const ApplicationProvider = (props: IProps) => {
    const [state, dispatch] = useReducer(applicationReducer, initialState);
    const { children } = props;

    useComponentDidMount(async () => {
        const dataSource: DataSource = await createConnection({
            type: 'expo',
            database: ENV.DATABASE_NAME,
            driver: require('expo-sqlite'),
            entities: [
                ShootAroundEntity,
                BasketballSeasonEntity,
                BasketballTeamEntity,
                BasketballGameEntity
            ],
            migrationsRun: true,
            migrations: [
                CreateShootAroundTable1657877900861,
                CreateShootAroundTableIndex1658570828462,
                CreateBasketballSeasonTable1661867877921,
                CreateBasketballTeamTable1661872258299,
                CreateBasketballGameTable1661872303691
            ],
            logging: ENV.SHOULD_LOG_SQL
        });
       dispatch({ type: 'init', payload: dataSource });
    });

    return (
        <ApplicationContext.Provider value={state}>
            {children}
        </ApplicationContext.Provider>
    );
};

export default ApplicationProvider;