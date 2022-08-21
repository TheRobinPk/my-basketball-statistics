import * as path from 'path';

export const androidConfig = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
        platformName: 'Android',
        platformVersion: '8',
        deviceName: 'Android Emulator',
        avd: 'e2e-pixel-2-api-30',
        app: path.join(__dirname, 'bin', 'my-basketball-statistics.apk'),
        automationName: 'UiAutomator2'
    }
};