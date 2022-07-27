import {ShootAroundAggregatedResult} from './shoot-around-service';
import {ShootAroundSpot} from '../domain/shoot-around';
import {DateRange} from '../components/common/date-time-range-picker/date-range-picker';
import {DateRangeType, ShootAroundChartData, ShootAroundDataSet} from '../redux/reducers/dashboard/dashboard-reducer';
import colors from '../colors';

const LABEL_FORMAT_MAP: Map<DateRangeType, string> = new Map<DateRangeType, string>([
    ['day', 'MM-DD'],
    ['week', 'MM-DD'],
    ['month', 'MMM']
]);

interface NormalizedResult {
    spot: ShootAroundSpot;
    weekStartLabel: string;
    totalAttempts: number;
    madeAttempts: number;
}

export default class ShootAroundChartService {
    calculateShootAroundChartData(
        shootAroundAggregatedResults: ShootAroundAggregatedResult[],
        dateRangeType: DateRangeType,
        dateRange: DateRange
    ): ShootAroundChartData {
        const labels = this.calculateLabels(dateRangeType, dateRange);
        const dataSets = this.calculateDataSets(shootAroundAggregatedResults, dateRangeType, labels);
        return {
            labels: labels,
            dataSets: dataSets
        };
    }

    private calculateLabels(dateRangeType: DateRangeType, dateRange: DateRange): string[] {
        const result = [];

        const { start, end } = dateRange;
        const rangeStart = start.clone().startOf(dateRangeType);
        const rangeEnd = end.clone().endOf(dateRangeType);
        let date = rangeStart.clone();
        while (date.isSameOrBefore(rangeEnd)) {
            result.push(date.clone());
            date = date.clone().add(1, dateRangeType);
        }
        return result.map((label) => label.format(LABEL_FORMAT_MAP.get(dateRangeType)));
    }

    private calculateDataSets(
        shootAroundAggregatedResults: ShootAroundAggregatedResult[],
        dateRangeType: DateRangeType,
        labels: string[]) {
        const dataSets: ShootAroundDataSet[] = [];
        const aggregatedResultsBySpot = this.groupAggregatedResultsBySpot(shootAroundAggregatedResults);
        aggregatedResultsBySpot.forEach((results, spot) => {
            const resultsForSpotByDate = this.groupResultsByDate(results, dateRangeType);
            dataSets.push(this.calculateDataSet(resultsForSpotByDate, spot, labels));
        });
        return dataSets;
    }

    private groupAggregatedResultsBySpot(
        shootAroundAggregatedResults: ShootAroundAggregatedResult[]
    ): Map<ShootAroundSpot, ShootAroundAggregatedResult[]> {
        return shootAroundAggregatedResults.reduce(
            (result, item) => result.set(item.spot, [...result.get(item.spot) || [], item]),
            new Map<ShootAroundSpot, ShootAroundAggregatedResult[]>()
        );
    }

    private groupResultsByDate(
        aggregatedResultsForSpot: ShootAroundAggregatedResult[],
        dateRangeType: DateRangeType,
    ): Map<string, NormalizedResult[]> {
        return aggregatedResultsForSpot
            .map((aggregatedResult) => this.normalizeShootAroundAggregatedResult(aggregatedResult, dateRangeType))
            .reduce(
                (result, item) => result.set(item.weekStartLabel, [...result.get(item.weekStartLabel) || [], item]),
                new Map<string, NormalizedResult[]>()
            );
    }

    private normalizeShootAroundAggregatedResult(
        aggregatedResult: ShootAroundAggregatedResult,
        dateRangeType: DateRangeType)
        : NormalizedResult {
        const format = LABEL_FORMAT_MAP.get(dateRangeType);
        return {
            spot: aggregatedResult.spot,
            totalAttempts: aggregatedResult.totalAttempts,
            madeAttempts: aggregatedResult.madeAttempts,
            weekStartLabel: aggregatedResult.day.clone().startOf(dateRangeType).format(format)
        };
    }

    private calculateDataSet(
        resultsForSpotByDate: Map<string, NormalizedResult[]>,
        spot: ShootAroundSpot,
        formattedLabels: string[]): ShootAroundDataSet {
        const data: number[] = [];
        formattedLabels.forEach((label) => {
            const resultsForSpotByLabel = resultsForSpotByDate.get(label);
            if (resultsForSpotByLabel !== undefined) {
                const summedUp = resultsForSpotByLabel.reduce((a, b) => this.sumNormalizedResults(a, b, spot, label));
                data.push(summedUp.madeAttempts / summedUp.totalAttempts);
            } else {
                data.push(0);
            }
        });
        return {
            color: colors.primaryColor,
            spot: spot,
            data: data,
        };
    }

    private sumNormalizedResults(a: NormalizedResult, b: NormalizedResult, spot: ShootAroundSpot, label: string): NormalizedResult {
        return {
            spot: spot,
            weekStartLabel: label,
            totalAttempts: a.totalAttempts + b.totalAttempts,
            madeAttempts: a.madeAttempts + b.madeAttempts
        };
    }
}