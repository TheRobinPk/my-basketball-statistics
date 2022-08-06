import React from 'react';
import {Card} from 'react-native-paper';
import {useAppSelector} from '../../redux/store/store';
import ShootAroundChart from '../shoot-around-chart/shoot-around-chart';
import LoadingWrapper from '../common/loading-wrapper/loading-wrapper';
import EmptyWrapper from '../common/empty-wrapper/empty-wrapper';

const DashboardChart = () => {
    const chartData = useAppSelector(state => state.dashboard.chartData);
    const isLoading = useAppSelector(state => state.dashboard.isLoading);

  return (
      <Card mode='elevated' elevation={5}>
          <Card.Content>
              <LoadingWrapper isLoading={isLoading}>
                  <EmptyWrapper
                      isEmpty={chartData?.dataSets.length === 0}
                      emptyText='No result found for the selected search criteria!'>
                      <ShootAroundChart chartData={chartData} />
                  </EmptyWrapper>
              </LoadingWrapper>
          </Card.Content>
      </Card>
  );
};

export default DashboardChart;