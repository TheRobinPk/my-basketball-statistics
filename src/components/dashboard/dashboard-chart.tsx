import React from 'react';
import {Card} from 'react-native-paper';
import ShootAroundChart from '../shoot-around-chart/shoot-around-chart';
import EmptyWrapper from '../common/empty-wrapper/empty-wrapper';
import {StyleSheet, View} from 'react-native';
import i18n from '../../i18n/i18n';
import {ShootAroundChartData} from '../../reducers/dashboard/dashboard-reducer';

interface IProps {
    chartData: ShootAroundChartData;
}

const DashboardChart = (props: IProps) => {
    const { chartData } = props;

  return (
      <View style={styles.cardStyle}>
          <Card mode='elevated' elevation={5}>
              <Card.Content>
                  <EmptyWrapper
                      isEmpty={chartData?.dataSets.length === 0}
                      emptyText={i18n.t('screens.dashboard.noResults')}>
                      <ShootAroundChart chartData={chartData} />
                  </EmptyWrapper>
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