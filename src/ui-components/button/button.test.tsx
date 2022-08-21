import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react-native';
import Button from './button';

describe('<Button />', () => {

    afterEach(cleanup);

    it('should render the button', () => {
        // GIVEN
        const callback = jest.fn();

        // WHEN
        render(
            <Button
                label='Button'
                type='primary'
                onPress={callback} />
        );

        // THEN
        const button = screen.getByText('Button');
        expect(button).toBeDefined();
    });

    it('should not call the callback is button is loading', () => {
        // GIVEN
        const callback = jest.fn();

        // WHEN
        render(
            <Button
                label='Button'
                type='primary'
                loading
                onPress={callback} />
        );

        // THEN
        const button = screen.getByRole('button');
        fireEvent.press(button);

        expect(callback).not.toHaveBeenCalled();
    });

    it('should not call the callback is button is disabled', () => {
        // GIVEN
        const callback = jest.fn();

        // WHEN
        render(
            <Button
                label='Button'
                type='primary'
                disabled
                onPress={callback} />
        );

        // THEN
        const button = screen.getByText('Button');
        fireEvent.press(button);

        expect(callback).not.toHaveBeenCalled();
    });

    it('should call the callback if the button is pressed', () => {
        // GIVEN
        const callback = jest.fn();

        // WHEN
        render(
            <Button
                label='Button'
                type='primary'
                onPress={callback} />
        );

        // THEN
        const button = screen.getByText('Button');
        fireEvent.press(button);

        expect(callback).toHaveBeenCalled();
    });
});
