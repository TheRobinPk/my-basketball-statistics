import React, {useState} from 'react';
import {Dimensions, ScrollView, View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Dataset} from 'react-native-chart-kit/dist/HelperTypes';
import Legend from '../common/legend/legend';
import ShootAroundSpotMap from '../../static/shoot-around-spot-map';
import colors from '../../static/colors';
import {ShootAroundSpot} from '../../domain/shoot-around';
import {ShootAroundChartData} from '../../reducers/dashboard/dashboard-reducer';

interface IProps {
    chartData: ShootAroundChartData;
}

const ShootAroundChart = (props: IProps) => {
    const [width, setWidth] = useState<number>(0);

    const labels = props.chartData?.labels || [];
    const datasets: Dataset[] = props.chartData.dataSets.map((dataSet) => {
        return {
            key: dataSet.spot.toString(),
            color: () => ShootAroundSpotMap.get(dataSet.spot)?.color || '',
            data: dataSet.data
        };
    }) || [];

    const widthByLabels = labels.length * 80;
    const chartWidth = widthByLabels > width ? widthByLabels : width;

    return (
        <View>
            <ScrollView
                style={styles.scrollViewStyle}
                horizontal
                showsHorizontalScrollIndicator
                persistentScrollbar
                indicatorStyle='black'
                onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
                <LineChart
                    style={styles.lineChartStyle}
                    withShadow={false}
                    getDotColor={() => colors.primaryColor}
                    transparent
                    data={{
                        labels: labels,
                        datasets: [
                            ...datasets,
                            {
                                key: 'fixed-0',
                                data: [0], // fixing 0 as min value
                            },
                            {
                                key: 'fixed-1',
                                data: [1], // // fixing 1 as max value
                            }
                        ]
                    }}
                    renderDotContent={({x, y, indexData, index}) => (
                        <>
                            {indexData > 0 && indexData < 1 ? (
                                <View
                                    key={index}
                                    style={{
                                        top: y - 16,
                                        left: x + 8,
                                        ...styles.dotContentStyle
                                    }}>
                                    <Text style={styles.dotContentTextStyle}>
                                        {Math.round(indexData * 100) / 100}
                                    </Text>
                                </View>
                            ) : null}
                        </>
                    )}
                    width={chartWidth}
                    height={Dimensions.get('window').height / 2}
                    chartConfig={{
                        color: () => colors.primaryColor,
                        strokeWidth: 2,
                        barPercentage: 0.5,
                        useShadowColorFromDataset: false
                    }} />
            </ScrollView>
            <Legend values={datasets.map((dataSet) => {
                const shootAroundSpotConfig = ShootAroundSpotMap.get(dataSet.key as ShootAroundSpot);
                return {
                  color: shootAroundSpotConfig?.color || '',
                  label: shootAroundSpotConfig?.translation || ''
                };
            })} />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewStyle: {
        paddingBottom: 4
    },
    lineChartStyle: {
        marginLeft: -16,
        marginBottom: -32
    },
    dotContentStyle: {
        position: 'absolute',
    },
    dotContentTextStyle: {
        fontSize: 8
    }
});

export default ShootAroundChart;