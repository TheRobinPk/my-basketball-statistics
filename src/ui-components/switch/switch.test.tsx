import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react-native';
import Switch, {ISwitchOption} from './switch';

describe('<Switch />', () => {

    afterEach(cleanup);

    it('should render the options', () => {
        // GIVEN
        const options: ISwitchOption[] = [
            {
                key: 'option-1',
                label: 'Option #1'
            },
            {
                key: 'option-2',
                label: 'Option #2'
            }
        ];
        const callback = jest.fn();

        // WHEN
        render(
            <Switch
                options={options}
                value='option-1'
                onPress={callback} />
        );

        // THEN
        const option1 = screen.getByText('Option #1');
        expect(option1).toBeDefined();

        const option2 = screen.getByText('Option #2');
        expect(option2).toBeDefined();

        fireEvent.press(option2);

        expect(callback).toHaveBeenCalledWith('option-2');
    });

    it('should call the callback when option is clicked', () => {
        // GIVEN
        const options: ISwitchOption[] = [
            {
                key: 'option-1',
                label: 'Option #1'
            },
            {
                key: 'option-2',
                label: 'Option #2'
            }
        ];
        const callback = jest.fn();

        // WHEN
        render(
            <Switch
                options={options}
                value='option-1'
                onPress={callback} />
        );

        // THEN
        fireEvent.press(screen.getByText('Option #2'));
        expect(callback).toHaveBeenCalledWith('option-2');
    });
});
