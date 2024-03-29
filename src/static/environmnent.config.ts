import Constants from 'expo-constants';

export interface ApplicationEnvironment {
    DATABASE_NAME: string;
    SHOULD_LOG_SQL: boolean;
}

const ENV = {
    develop: {
        DATABASE_NAME: 'app_dev.db',
        SHOULD_LOG_SQL: true
    },
    preview: {
        DATABASE_NAME: 'app_preview.db',
        SHOULD_LOG_SQL: true
    },
    production: {
        DATABASE_NAME: 'app.db',
        SHOULD_LOG_SQL: false
    },
};

const getEnvVars = (env = Constants.manifest?.releaseChannel): ApplicationEnvironment => {
    // Default values for `releaseChannel` are `undefined` in dev mode and `default` in production
    if (__DEV__) {
        return ENV.develop;
    }
    // using `indexOf` will let you pick up dev, develop, development, dev-v1, dev-v2, dev-v3, and so on..
    // Returns `-1` if the value is not found.
    if (env?.indexOf('dev') !== -1) return ENV.develop;
    if (env?.indexOf('preview') !== -1) return ENV.preview;
    if (env?.indexOf('prod') !== -1) return ENV.production;
    return ENV.develop; // If you do not specify a channel, you will publish to the `default` channel.
};
export default getEnvVars();