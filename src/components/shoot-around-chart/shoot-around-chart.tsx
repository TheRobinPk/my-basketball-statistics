import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Dataset} from 'react-native-chart-kit/dist/HelperTypes';
import colors from '../../colors';
import randomColor from 'randomcolor';
import {ShootAroundChartData} from '../../redux/reducers/dashboard/dashboard-reducer';
import Legend from '../common/legend/legend';

interface IProps {
    chartData: ShootAroundChartData | undefined;
}

const ShootAroundChart = (props: IProps) => {
    const [width, setWidth] = useState<number>(0);
    const [chartColors, setChartColors] = useState<string[]>([]);

    useEffect(() => {
        const randomColors = randomColor({
            count: props.chartData?.dataSets.length || 10,
            seed: 0,
            format: 'rgb',
            luminosity: 'dark'
        });
        setChartColors(randomColors);
    }, [props.chartData]);

    const labels = props.chartData?.labels || [];
    const datasets: Dataset[] = props.chartData?.dataSets.map((dataSet, i) => {
        return {
            key: dataSet.spot.toString(),
            color: () => chartColors[i],
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
            <Legend values={datasets.map((dataSet, i) => {
                return {
                  color: chartColors[i],
                  label: dataSet.key?.toString() || ''
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