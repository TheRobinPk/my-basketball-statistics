import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import englishTranslation from './en/en';

export interface Translation {
    general: {
        dashboard: string;
        shootAround: string;
        shootArounds: string;
        shootAroundSpot: string;
        shootAroundSpots: string;
        spot: string;
        totalAttempts: string;
        madeAttempts: string;
        save: string;
        cancel: string;
        hide: string;
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
        paginationLabel: string;
        shootAroundSpotLabels: {
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
    };
    screens: {
        dashboard: {
            addShootAround: string;
            noResults: string;
            showDataBetween: string;
            groupDataBy: string;
        },
        addShootAround: {
            helperText: string;
        },
        shootArounds: {
            deleteConfirmation: string;
        }
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