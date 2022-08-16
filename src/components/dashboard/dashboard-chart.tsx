import React from 'react';
import {Card} from 'react-native-paper';
import {useAppSelector} from '../../redux/store/store';
import ShootAroundChart from '../shoot-around-chart/shoot-around-chart';
import LoadingWrapper from '../common/loading-wrapper/loading-wrapper';
import EmptyWrapper from '../common/empty-wrapper/empty-wrapper';
import {StyleSheet, View} from 'react-native';
import i18n from '../../i18n/i18n';

const DashboardChart = () => {
    const chartData = useAppSelector(state => state.dashboard.chartData);
    const isLoading = useAppSelector(state => state.dashboard.isLoading);

  return (
      <View style={styles.cardStyle}>
          <Card mode='elevated' elevation={5}>
              <Card.Content>
                  <LoadingWrapper isLoading={isLoading}>
                      <EmptyWrapper
                          isEmpty={chartData?.dataSets.length === 0}
                          emptyText={i18n.t('screens.dashboard.noResults')}>
                          <ShootAroundChart chartData={chartData} />
                      </EmptyWrapper>
                  </LoadingWrapper>
              </Card.Content>
          </Card>
      </View>
  );
};

const styles = StyleSheet.create({
    cardStyle: {
        margin: 8
    }
});

export default DashboardChart;