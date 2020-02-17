const files = require.context(
    '../',
    true,
    /modules\/.*?\/i18n\/de(\.js(on)?)?/
);
const modules = {
    appstore: {
        save: 'Speichern',
        reset: 'Reset',
        noMapkit:
            'Dieses Modul funktioniert mit dem Kartentyp "Mapkit" wegen Beschränkungen seitens Mapkit nicht!',
        closeWarning: {
            title: 'Ungespeicherte Änderungen',
            text:
                'Du hast Änderungen im AppStore vorgenommen, die noch nicht gespeichert sind. Setze sie zurück oder speichere sie, um den AppStore zu schliessen.',
            close: 'Meldung schliessen',
        },
    },
    settings: {
        name: 'Einstellungen',
        save: 'Speichern',
        discard: 'Änderungen verwerfen',
        reset: 'Reset',
        resetWarning: {
            title: 'Zurücksetzen der Einstellungen',
            text:
                'Möchtest du wirklich Einstellungen auf ihre Standardwerte zurücksetzen?',
            close: 'Abbrechen',
            total: 'Alle Einstellungen',
            module: 'Nur von diesem Modul',
        },
        closeWarning: {
            title: 'Ungespeicherte Änderungen',
            text:
                'Du hast Änderungen in den Einstellungen vorgenommen, die noch nicht gespeichert sind. Setze sie zurück, verwerfe sie oder speichere sie, um die Einstellungen zu schliessen.',
            close: 'Meldung schliessen',
        },
    },
};
files.keys().forEach(key => (modules[key.split('/')[2]] = files(key)));

module.exports = {
    modules,
    error: {
        title: 'LSS-Manager: Fehler',
        msg:
            'Sollte dieser Fehler öfters auftreten, so melde ihn bitte an das LSSM-Team!',
    },
    vehicles: [
        'LF 20',
        'LF 10',
        'DLK 23',
        'ELW 1',
        'RW',
        'GW-A',
        'LF 8/6',
        'LF 20/16',
        'LF 10/6',
        'LF 16-TS',
        'GW-Öl',
        'GW-L2-Wasser',
        'GW-Messtechnik',
        'SW 1000',
        'SW 2000',
        'SW 2000-Tr',
        'SW Kats',
        'TLF 2000',
        'TLF 3000',
        'TLF 8/8',
        'TLF 8/18',
        'TLF 16/24-Tr',
        'TLF 16/25',
        'TLF 16/45',
        'TLF 20/40',
        'TLF 20/40-SL',
        'TLF 16',
        'GW-Gefahrgut',
        'RTW',
        'NEF',
        'HLF 20',
        'RTH',
        'FuStW',
        'GW-Höhenrettung',
        'ELW 2',
        'leBefKw',
        'MTW',
        'TSF-W',
        'KTW',
        'GKW',
        'MTW-TZ',
        'MzKW',
        'LKW K 9',
        'BRmG R',
        'Anh DLE',
        'MLW 5',
        'WLF',
        'AB-Rüst',
        'AB-Atemschutz',
        'AB-Öl',
        'GruKw',
        'FüKw',
        'GefKw',
        'Dekon-P',
        'AB-Dekon-P',
        'KdoW-LNA',
        'KdoW-OrgL',
        'FwK',
        'KTW Typ B',
        'ELW 1 (SEG)',
        'GW-San',
        'Polizeihubschrauber',
        'AB-Schlauch',
        'GW-Taucher',
        'GW-Wasserrettung',
        'LKW 7 Lkr 19 tm',
        'Anh MzB',
        'Anh SchlB',
        'Anh MzAB',
        'Tauchkraftwagen',
        'MZB',
        'AB-MZB',
        'WaWe 10',
        'GRTW',
        'NAW',
        'FLF',
        'Rettungstreppe',
        'AB-Gefahrgut',
        'AB-Einsatzleitung',
        'SEK - ZF',
        'SEK - MTF',
        'MEK - ZF',
        'MEK - MTF',
        'GW-Werkfeuerwehr',
        'ULF mit Löscharm',
        'TM 50',
        'Turbolöscher',
        'TLF 4000',
        'KLF',
        'MLF',
        'HLF 10',
    ],
    buildings: [
        'Feuerwache',
        'Feuerwehrschule',
        'Rettungswache',
        'Rettungsschule',
        'Krankenhaus',
        'Rettungshubschrauber-Station',
        'Polizeiwache',
        'Leitstelle',
        'Polizeischule',
        'THW',
        'THW Bundesschule',
        'Bereitschatspolizei',
        'Schnelleinsatzgruppe (SEG)',
        'Polizeihubschrauberstation',
        'Bereitstellungsraum',
        'Wasserrettung',
        'Verbandszellen',
        'Polizei-Sondereinheiten',
        'Feuerwache (Kleinwache)',
        'Polizeiwache (Kleinwache)',
        'Rettungswache (Kleinwache)',
    ],
};

//
// export default {
//     modules: {
//         dashboard: {
//             name: 'Dashboard',
//             description:
//                 'Fügt eine Übersicht über eigene Gebäude und Fahrzeuge dem Spiel hinzu',
//             ...dashboard,
//         },
//         enhancedPOI: {
//             name: 'Verbesserte POI',
//             description:
//                 'Erleichtert das Setzen von POIs durch kleine, nützliche Features',
//         },
//         overview: {
//             name: 'Übersicht',
//             description:
//                 'Gibt Informationen über alle möglichen Fahrzeug- und Gebäudetypen im Spiel.',
//             ...overview,
//         },
//         schoolingOverview: {
//             name: 'Lehrgangsübersicht',
//             description:
//                 'Fügt der Seite "Lehrgänge" eine Zusammenfassung hinzu.',
//             ...schoolingOverview,
//         },
//         releasenotes: {
//             name: 'Releasenotes',
//             ...releasenotes,
//         },
//     },
// };
