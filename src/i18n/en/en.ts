import {Translation} from '../i18n';

const englishTranslation: Translation = {
    general: {
        appName: 'My Basketball Statistics',
        dashboard: 'Dashboard',
        shootAround: 'Shoot Around',
        shootArounds: 'Shoot Arounds',
        about: 'About',
        shootAroundSpot: 'Shoot Around Spot',
        shootAroundSpots: 'Shoot Around Spots',
        spot: 'Spot',
        totalAttempts: 'Total Attempts',
        madeAttempts: 'Made Attempts',
        save: 'Save',
        cancel: 'Cancel',
        hide: 'Hide',
        apply: 'Apply',
        delete: 'Delete',
        edit: 'Edit',
        actions: 'Actions',
        savedSuccessfully: 'Saved successfully',
        date: 'Date',
        day: 'Day',
        week: 'Week',
        month: 'Month',
        filters: 'Filters',
        noResult: 'No results found',
        paginationLabel: 'Showing %{from} - %{to} of %{count}',
        shootAroundSpotLabels: {
            paint: 'Paint',
            freeThrow: 'Free Throw',
            midRightCorner: 'Midrange right corner',
            midLeftCorner: 'Midrange left corner',
            midRightWing: 'Midrange right wing',
            midLeftWing: 'Midrange left wing',
            midHighPost: 'Midrange high post',
            threeRightCorner: '3pt right corner',
            threeLeftCorner: '3pt left corner',
            threeRightWing: '3pt right wing',
            threeLeftWing: '3pt left wing',
            threeTopOfTheKey: '3pt top of the key',
        }
    },
    screens: {
        dashboard: {
            addShootAround: 'Add Shoot Around',
            noResults: 'No result found for the selected search criteria!',
            showDataBetween: 'Show data between',
            groupDataBy: 'Group data by'
        },
        addShootAround: {
            helperText: 'You can select a shooting spot by tapping on the spot'
        },
        shootArounds: {
            deleteConfirmation: 'Are you sure you want to delete the Shoot Around?'
        },
        about: {
            appVersion: 'App version',
            privacyPolicy: 'Privacy Policy',
            termsAndConditions: 'Terms and Conditions',
            thirdPartyLicenses: 'Third Party Licenses'
        }
    }
};

export default englishTranslation;