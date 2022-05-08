const intervals = {};
const checkAllInterval = setInterval(checkAllWaitingIntervals, 5);

function checkAllWaitingIntervals() {
    if (Object.keys(intervals).length) {
        for (const [id, func] of Object.entries(intervals)) {
            const element = document.getElementById(id);
            if (element) {
                delete intervals[id];
                func(element);
            }
        }
    } else {
        clearInterval(checkAllInterval);
    }
}

function registerOnLoad(id, func) {
    intervals[id] = func;
}

const ML0KII = {
    id: 'ML-0KII',
    aliases: {
        born: 'Mauger Lavars',
        previous: 'Sergeant Lavars',
        current: 'Malachi',
    },
    citizenship: {
        registration: '3.377.980.M40',
        world: 'Arcadia',
        locality: 'Subsector 835.A',
    },
    career: {
        'schola-progenium': {
            registration: '2.147.998.M40',
            status: 'Graduated',
            collegiate: 'Reconnaissance Corps',
            note: 'Recommended for command training, aptitude for tech',
        },
        'astra-militarum': {
            registration: '2.931.001.M41',
            status: 'Terminated - Unfit for Service',
            note: 'Severe wounds',
        },
        'adeptus-mechanicus': {
            registration: '2.219.009.M41',
            status: 'Active Service',
            note: 'Second recruitment attempt',
        },
        REDACTED: {
            registration: 'REDACTED',
            status: 'REDACTED',
            note: 'REDACTED',
        },
    },
};

const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 `~!@#$%^&*()_-+= ,.?/:;\'"\\|[]{}'.split(
        ''
    );

const NOTES = {
    'SURVEILLANCE NOTES': [
        "pictographs show he was previously a charismatic leader, guess it's hard to charm with a vox-caster",
        'appears to have received life-sustaining augmetics, deeper than just a few old battle wounds',
        'estranged from family after dismissal from Astra Militarum',
        'augmetics show signs of manual repair, and are of varying quality, wonder if he performed all the rites himself?',
        'presenting unusual activity, leaving home at irregular hours, and long return times',
        'has been seen with a chaplain, and with an older man, maybe an old instructor?',
        randomFrom(chars, Math.floor(Math.random() * 120)).join(''),
        randomFrom(chars, Math.floor(Math.random() * 120)).join(''),
        randomFrom(chars, Math.floor(Math.random() * 120)).join(''),
        'Someone has corrupted my notes, must remember to speak to a tech-priest',
    ],
};

const emperorQuotes = [
    'There is only the Emperor, and he is our shield and protector.',
    'No world shall be beyond my rule; no enemy shall be beyond my wrath.',
    'The Emperor protects.',
];

const quotes = [
    ['"We determine the guilty. We decide the punishment."', 'Lex Imperialis'],
    [
        '"To serve the Emperor. To protect His domains. To judge and stand guard over His subjects. To carry the Emperor\'s law to all worlds under His blessed protection. To pursue and punish those who trespassed against His word."',
        "Cadet's Oath",
    ],
    [
        '"Claims of innocence mean nothing; they serve only to prove a foolish lack of caution."',
        'Judge Traggat',
    ],
];
function randomFrom(array, length = 1) {
    const out = Array(length).fill(null);

    for (let i = 0; i < length; i++) {
        out[i] = array[Math.floor(Math.random() * array.length)];
    }

    if (length === 1) {
        return out[0];
    }

    return out;
}
function formatQuote(quote) {
    const [quoteText, quoteAuthor] = quote;
    return `${quoteText} - <em>${quoteAuthor}</em>`;
}

function jsonToDivsRecursive(jsonObject, depth = 0) {
    const indent = depth > 0 ? ` style="margin-left: ${depth}rem;"` : '';
    const divs = [];
    for (const [keyRaw, valueRaw] of Object.entries(jsonObject)) {
        const key = `<strong>${keyRaw.toUpperCase()}</strong>`;
        const value = valueRaw;

        if (typeof value === 'object') {
            divs.push(
                `<div${indent}>${key}:</div>`,
                jsonToDivsRecursive(value, depth + 1)
            );
        } else {
            divs.push(
                `<div${indent}>${depth > 0 ? '- ' : ''}${key}:\t${value}</div>`
            );
        }
    }
    return divs.join('\r\n');
}

registerOnLoad('character', (element) => {
    element.innerHTML = jsonToDivsRecursive(ML0KII);
});

registerOnLoad('quote', (element) => {
    element.innerHTML = formatQuote(randomFrom(quotes));
});

registerOnLoad('file', (element) => {
    element.innerHTML = `CITIZEN FILE: ${ML0KII.id.toUpperCase()}`;
});

registerOnLoad('emperor-quote', (element) => {
    element.innerHTML = `<em>${randomFrom(emperorQuotes)}</em>`;
});

registerOnLoad('character-notes', (element) => {
    element.innerHTML = jsonToDivsRecursive(NOTES);
});
