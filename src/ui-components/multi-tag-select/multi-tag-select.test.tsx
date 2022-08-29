import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react-native';
import MultiTagSelect, {ITagItem} from './multi-tag-select';

describe('<MultiTagSelect />', () => {

    afterEach(cleanup);

    it('should render the tags', () => {
        // GIVEN
        const tags: ITagItem[] = [
            {
                key: 'tag-1',
                label: 'Tag #1'
            },
            {
                key: 'tag-2',
                label: 'Tag #2'
            }
        ];
        const callback = jest.fn();

        // WHEN
        render(
            <MultiTagSelect
                items={tags}
                selectedItems={tags}
                onChange={callback} />
        );

        // THEN
        const tag1 = screen.getByText('Tag #1');
        expect(tag1).toBeDefined();

        const tag2 = screen.getByText('Tag #2');
        expect(tag2).toBeDefined();
    });

    it('should call the callback with extended values if not selected option is pressed', () => {
        // GIVEN
        const tags: ITagItem[] = [
            {
                key: 'tag-1',
                label: 'Tag #1'
            },
            {
                key: 'tag-2',
                label: 'Tag #2'
            }
        ];
        const callback = jest.fn();

        // WHEN
        render(
            <MultiTagSelect
                items={tags}
                selectedItems={[]}
                onChange={callback} />
        );

        // THEN
        fireEvent.press(screen.getByText('Tag #1'));
        expect(callback).toHaveBeenCalledWith([tags[0]]);
    });

    it('should call the callback with empty values if the only selected option is pressed', () => {
        // GIVEN
        const tags: ITagItem[] = [
            {
                key: 'tag-1',
                label: 'Tag #1'
            },
            {
                key: 'tag-2',
                label: 'Tag #2'
            }
        ];
        const callback = jest.fn();

        // WHEN
        render(
            <MultiTagSelect
                items={tags}
                selectedItems={[tags[0]]}
                onChange={callback} />
        );

        // THEN
        fireEvent.press(screen.getByText('Tag #1'));
        expect(callback).toHaveBeenCalledWith([]);
    });
});
