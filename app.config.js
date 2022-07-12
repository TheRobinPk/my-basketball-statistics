export default {
    name: 'basketball-shootaround-app',
    slug: 'basketball-shootaround-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
        resizeMode: 'contain',
        backgroundColor: '#eeeee'
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        '**/*'
    ],
    ios: {
        supportsTablet: true,
        bundleIdentifier: 'org.zenbot.basketball-shootaround-app'
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#FFFFFF'
        },
        package: 'org.zenbot.basketball.shootaround.app',
    },
    web: {
        favicon: './assets/favicon.png'
    },
    extra: {
        apiUrlHost: process.env.API_URL_HOST
    }
};
