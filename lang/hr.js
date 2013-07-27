// moment.js language configuration
// language : croatian (hr)

var pluralRules = [
    function (n) { return (n % 10 === 1) && (n % 100 !== 11); },
    function (n) { return (n % 10) >= 2 && (n % 10) <= 4 && ((n % 100) < 12 || (n % 100) > 14); },
    function (n) { return true; }
];

function plural(word, num) {
    var forms = word.split('_'),
    minCount = Math.min(pluralRules.length, forms.length),
    i = -1;

    while (++i < minCount) {
        if (pluralRules[i](num)) {
            return forms[i];
        }
    }
    return forms[minCount - 1];
}

function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
	'mm': 'minuta_minute_minuta',
	'hh': 'sat_sata_sati',
	'dd': 'dan_dana_dana',
	'MM': 'mjesec_mjeseca_mjeseci',
	'yy': 'godina_godine_godina'
    };

    return number + ' ' + plural(format[key], +number);
}

function monthsCaseReplace(m, format) {
    var months = {
        'nominative': 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_'),
	'genitive': 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenog_prosinca'.split('_')
    },

    nounCase = (/D[oD]? *MMMM?/).test(format) ?
        'genitive' :
        'nominative';

    return months[nounCase][m.month()];
}

function weekdaysCaseReplace(m, format) {
    var weekdays = {
        'nominative': 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        'genitive': 'nedjelje_ponedjeljka_utorka_srijede_četvrtka_petka_subote'.split('_')
    },

    nounCase = (/\[ ?(?:Prošle|Sljedeće)? ?\] ?dddd/).test(format) ?
        'genitive' :
        'nominative';

    return weekdays[nounCase][m.day()];
}

require('../moment').lang('hr', {
    months : monthsCaseReplace,
    monthsShort : "siječ._velj._ožuj._trav._svib._lip._srp._kol._ruj._list._stud._pros.".split("_"),
    weekdays : weekdaysCaseReplace,
    weekdaysShort : "ned._pon._uto._sri._čet._pet._sub.".split("_"),
    weekdaysMin : "ne_po_ut_sr_če_pe_su".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD. MM. YYYY.",
        LL : "D. MMMM YYYY.",
        LLL : "D. MMMM YYYY., LT",
        LLLL : "dddd, D. MMMM YYYY., LT"
    },
    calendar : {
        sameDay : '[Danas u] LT',
        nextDay : '[Sutra u] LT',
        nextWeek : 'dddd [u] LT',
        lastDay : '[Jučer u] LT',
        lastWeek : function () {
            switch (this.day()) {
            case 0:
            case 3:
            case 6:
                return '[Prošle] dddd [u] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[Prošli] dddd [u] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : "za %s",
        past : "prije %s",
        s : "nekoliko sekundi",
        m : "minutu",
        mm : relativeTimeWithPlural,
        h : "sat vremena",
        hh : relativeTimeWithPlural,
        d : "jedan dan",
        dd : relativeTimeWithPlural,
        M : "mjesec dana",
        MM : relativeTimeWithPlural,
        y : "godinu dana",
        yy : relativeTimeWithPlural
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
