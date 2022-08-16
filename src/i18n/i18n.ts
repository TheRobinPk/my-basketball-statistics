import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import englishTranslation from './en/en';

export interface Translation {
    general: {
        dashboard: string;
        shootAround: string;
        shootArounds: string;
        shootAroundSpot: string;
        spot: string;
        totalAttempts: string;
        madeAttempts: string;
        save: string;
        cancel: string;
        apply: string;
        delete: string;
        edit: string;
        actions: string;
        savedSuccessfully: string;
        date: string;
        day: string;
        week: string;
        month: string;
        filters: string;
        noResult: string;
        shootAroundSpots: {
            paint: string;
            freeThrow: string;
            midRightCorner: string;
            midLeftCorner: string;
            midRightWing: string;
            midLeftWing: string;
            midHighPost: string;
            threeRightCorner: string;
            threeLeftCorner: string;
            threeRightWing: string;
            threeLeftWing: string;
            threeTopOfTheKey: string;
        };
    }
}

const i18n = new I18n({
        en: englishTranslation
    },
    {
        enableFallback: true,
        locale: Localization.locale,
        defaultLocale: 'en'
    });

export default i18n;