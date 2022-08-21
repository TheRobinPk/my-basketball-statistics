import {BeforeAll, Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import {remote} from 'webdriverio';
import {getElementByClassName, getElementByResourceId, getElementByText} from '../utils/get-element';
import {androidConfig} from '../config/e2e-config';
import {expectHasText} from '../utils/expect';

setDefaultTimeout(120000);

let driver: any;

BeforeAll(async function () {
    driver = await remote(androidConfig);
    await driver.pause(2000);
});

Given(/^I wait for (\d+) milliseconds$/, async (millis: number) => {
    await driver.pause(millis);
});

When(/^I tap on "(.*)"$/, async (id: string) => {
    const element = await getElementByResourceId(id, driver);
    await element.click();
});

When(/^I tap on "(.*)" text$/, async (text: string) => {
    const element = await getElementByText(text, driver);
    await element.click();
});

When('I tap on the basketball court', async () => {
    const { width, height } = await driver.getWindowSize();
    await driver.touchPerform([
        {
            action: 'tap',
            options: {
                x: height / 6,
                y: width / 2
            }
        }
    ]);
});

When(/^I set the "(.*)" text input with value (\d+)$/, async (id: string, value: number) => {
    const totalAttemptsInput = await getElementByResourceId(id, driver);
    await totalAttemptsInput.setValue(value);
});

Then(/^I except "(.*)" view type exists$/, async (className: string) => {
    const element = await getElementByClassName(className, driver);
    await element.click(); // click should fail if not exists
});

Then(/^I expect "(.*)" text is visible$/, async (text: string) => {
    const elementWithText = await getElementByText(text, driver);
    await expectHasText(elementWithText, text);
});