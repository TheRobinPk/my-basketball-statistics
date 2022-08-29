import * as assert from 'assert';

export const expectHasText = async (element: any, text: string) => {
    assert.equal(await element.getText(), text);
};