import React from 'react';
import {cleanup, render, screen} from '@testing-library/react-native';
import Legend, {ILegendValue} from './legend';

describe('<Legend />', () => {

    afterEach(cleanup);

    it('should render all the labels', () => {
        // GIVEN
        const legendValues: ILegendValue[] = [
            {
                label: 'Item #1',
                color: '#000000'
            },
            {
                label: 'Item #2',
                color: '#8b4513'
            }
        ];

        // WHEN
        render(<Legend values={legendValues} />);

        // THEN
        const legend1 = screen.getByText('Item #1');
        expect(legend1).toBeDefined();

        const legend2 = screen.getByText('Item #2').parent;
        expect(legend2).toBeDefined();
    });
});
