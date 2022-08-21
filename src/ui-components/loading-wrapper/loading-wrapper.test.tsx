import React from 'react';
import {cleanup, render, screen} from '@testing-library/react-native';
import LoadingWrapper from './loading-wrapper';
import {Text} from 'react-native';

describe('<LoadingWrapper />', () => {

    afterEach(cleanup);

    it('should render loading', () => {
        // GIVEN

        // WHEN
        render(
            <LoadingWrapper isLoading>
                <Text>Text when not loading</Text>
            </LoadingWrapper>
        );

        // THEN
        const legend1 = screen.queryByText('Text when not loading');
        expect(legend1).toBeNull();
    });

    it('should render the children if not loading', () => {
        // GIVEN

        // WHEN
        render(
            <LoadingWrapper isLoading={false}>
                <Text>Text when not loading</Text>
            </LoadingWrapper>
        );

        // THEN
        const legend1 = screen.getByText('Text when not loading');
        expect(legend1).toBeDefined();
    });
});
