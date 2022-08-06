import {ShootAroundAggregatedResult} from './shoot-around-service';
import {ShootAroundSpot} from '../domain/shoot-around';
import {DateRange} from '../components/common/date-picker/date-range-picker';
import {DataAggregationType, ShootAroundChartData, ShootAroundDataSet} from '../redux/reducers/dashboard/dashboard-reducer';

const LABEL_FORMAT_MAP: Map<DataAggregationType, string> = new Map<DataAggregationType, string>([
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
        dataAggregationType: DataAggregationType | undefined,
        dateRange: DateRange
    ): ShootAroundChartData {
        let labels: string[] = [];
        let dataSets: ShootAroundDataSet[] = [];
        if (dataAggregationType) {
            labels = this.calculateLabels(dataAggregationType, dateRange);
            dataSets = this.calculateDataSets(shootAroundAggregatedResults, dataAggregationType, labels);
        }
        return {
            labels: labels,
            dataSets: dataSets
        };
    }

    private calculateLabels(dataAggregationType: DataAggregationType, dateRange: DateRange): string[] {
        const result = [];

        const { start, end } = dateRange;
        const rangeStart = start.clone().startOf(dataAggregationType);
        const rangeEnd = end.clone().endOf(dataAggregationType);
        let date = rangeStart.clone();
        while (date.isSameOrBefore(rangeEnd)) {
            result.push(date.clone());
            date = date.clone().add(1, dataAggregationType);
        }
        return result.map((label) => label.format(LABEL_FORMAT_MAP.get(dataAggregationType)));
    }

    private calculateDataSets(
        shootAroundAggregatedResults: ShootAroundAggregatedResult[],
        dataAggregationType: DataAggregationType,
        labels: string[]) {
        const dataSets: ShootAroundDataSet[] = [];
        const aggregatedResultsBySpot = this.groupAggregatedResultsBySpot(shootAroundAggregatedResults);
        aggregatedResultsBySpot.forEach((results, spot) => {
            const resultsForSpotByDate = this.groupResultsByDate(results, dataAggregationType);
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
        dataAggregationType: DataAggregationType,
    ): Map<string, NormalizedResult[]> {
        return aggregatedResultsForSpot
            .map((aggregatedResult) => this.normalizeShootAroundAggregatedResult(aggregatedResult, dataAggregationType))
            .reduce(
                (result, item) => result.set(item.weekStartLabel, [...result.get(item.weekStartLabel) || [], item]),
                new Map<string, NormalizedResult[]>()
            );
    }

    private normalizeShootAroundAggregatedResult(
        aggregatedResult: ShootAroundAggregatedResult,
        dataAggregationType: DataAggregationType)
        : NormalizedResult {
        const format = LABEL_FORMAT_MAP.get(dataAggregationType);
        return {
            spot: aggregatedResult.spot,
            totalAttempts: aggregatedResult.totalAttempts,
            madeAttempts: aggregatedResult.madeAttempts,
            weekStartLabel: aggregatedResult.day.clone().startOf(dataAggregationType).format(format)
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