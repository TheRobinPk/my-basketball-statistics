import React, {useState} from 'react';
import {Dimensions, ScrollView, View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {ShootAroundChartData} from '../../service/shoot-around-chart-service';
import {Dataset} from 'react-native-chart-kit/dist/HelperTypes';
import colors from '../../colors';

interface IProps {
    chartData: ShootAroundChartData | undefined;
}

const ShootAroundChart = (props: IProps) => {
    const [width, setWidth] = useState<number>(0);
    const labels = props.chartData?.labels || [];
    const datasets: Dataset[] = props.chartData?.dataSets.map((dataSet) => {
        return {
            key: dataSet.spot.toString(),
            color: () => dataSet.color,
            data: dataSet.data
        };
    }) || [];

    const widthByLabels = labels.length * 80;
    const chartWidth = widthByLabels > width ? widthByLabels : width;

    return (
        <ScrollView
            style={styles.scrollViewStyle}
            horizontal
            showsHorizontalScrollIndicator
            persistentScrollbar
            indicatorStyle='black'
            onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
            <LineChart
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
                renderDotContent={({x, y, indexData}) => (
                    <>
                        {indexData > 0 && indexData < 1 ? (
                            <View
                                style={{
                                    top: y - 16,
                                    left: x + 8,
                                    ...styles.dotContentStyle
                                }}>
                                <Text style={styles.dotContentTextStyle}>
                                    {indexData}
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
    );
};

const styles = StyleSheet.create({
    scrollViewStyle: {
        paddingBottom: 4
    },
    dotContentStyle: {
        position: 'absolute',
    },
    dotContentTextStyle: {
        fontSize: 10
    }
});

export default ShootAroundChart;