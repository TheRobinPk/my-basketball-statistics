const ENV_DEVELOP = 'develop';
const ENV_PREVIEW = 'preview';
const ENV_PRODUCTION = 'production';

const appNameMap = new Map([
    [ENV_DEVELOP, 'My Basketball Stats (Dev)'],
    [ENV_PREVIEW, 'My Basketball Stats (Prev)'],
    [ENV_PRODUCTION, 'My Basketball Statistics']
]);

const appSlugMap = new Map([
    [ENV_DEVELOP, 'my-basketball-statistics-dev'],
    [ENV_PREVIEW, 'my-basketball-statistics-preview'],
    [ENV_PRODUCTION, 'my-basketball-statistics']
]);

const appBundleIdentifierMap = new Map([
    [ENV_DEVELOP, 'org.zenbot.my.basketball.statistics.dev'],
    [ENV_PREVIEW, 'org.zenbot.my.basketball.statistics.preview'],
    [ENV_PRODUCTION, 'org.zenbot.my.basketball.statistics']
]);

const environment = process.env.ENVIRONMENT;
const appVersion = '1.0.0';

const config = {
    expo: {
        name: appNameMap.get(environment),
        slug: appSlugMap.get(environment),
        version: appVersion,
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'automatic',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#2c698d'
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [
            '**/*'
        ],
        ios: {
            supportsTablet: true,
            bundleIdentifier: appBundleIdentifierMap.get(environment)
        },
        android: {
            package: appBundleIdentifierMap.get(environment),
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#2c698d'
            }
        }
    }
};

export default config;