if (!localStorage.getItem('last-tab')) {
    localStorage.setItem('last-tab', 'tab-background');
}

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

const skills = {
    'Technical Knock':
        'With a honeyed whisper and ritual motion, you can awaken sleeping gun-spirits into furious action once more. You may unjam any gun as a Half Action. You must touch the gun in question to enact this rite. You may only perform this rite on one weapon per Round—any more would be disrespectful',
    'Rapid Reload':
        'You have spent so long practising weapons drills that you can reload a gun in an instant. All reload times are reduced by half (round down)—so a Half Action reload become a Free Action, a Full Action reload becomes a Half Action and so on.',
    'Binary Chatter':
        'You are adept at controlling servitors. Gain a +10 bonus to any attempt to instruct, program or question servitors.',
    'Luminen Charge': `You have learnt how to lend your life force to technology. On a successful Toughness Test you may use your bio-electrical field to recharge or power machinery. This takes one minute of meditation and ritual incantation to activate. The Difficulty of the Toughness Test varies depending on the nature of the technology, as follows:
        <table>
        <thead>
            <tr><th>Difficulty</th><th>Example</th></tr></thead>
            <tr><td>Ordinary (+10)</td><td>Chemical battery, glow globe</td></tr>
            <tr><td>Challenging (+0)</td><td>Las gun charge pack, data-slate, personal heater</td></tr>
            <tr><td>Difficult (-10)</td><td>Overcharge pack, air conditioning unit, servoskull</td></tr>
            <tr><td>Hard (-20)</td><td>Land speeder engine, lascannon charge pack, servitor</td></tr>
            <tr><td>Very Hard (-30)</td><td>Industrial press, cogitator engine, xenos tech</td></tr>
        </table>
        Note that at the GM's discretion,
        some technology is simply too
        arcane, broken or power-hungry for
        you to be able to activate. Each time
        you use this Talent, you gain a level
        of Fatigue.`,
};

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

function registerTab(tabId, element) {
    const tabsSelector = document.getElementById('tabs-selector');

    const tabName = tabId.replace('tab-', '').toUpperCase();

    tabsSelector.innerHTML += `<button class="section-tab" onclick="tabOnClick('${tabId}');">${tabName}</button>`;

    if (localStorage.getItem('last-tab') !== tabId) {
        element.classList.add('if-false');
    } else {
        element.classList.add('selected');
    }
}

function onSkillInputSearch() {
    const input = document.getElementById('tab-skills-search');
    const tabsContainer = document.getElementById('tabs-container');
}

function tabOnClick(tabId) {
    localStorage.setItem('last-tab', tabId);

    const tabsContainer = document.getElementById('tabs-container');
    const tabsSelector = document.getElementById('tabs-selector');
    const tabName = tabId.replace('tab-', '').toUpperCase();

    for (const tab of tabsContainer.children) {
        if (tab.id === tabId) {
            tab.classList.remove('if-false');
        } else {
            tab.classList.add('if-false');
        }
    }

    for (const tab of tabsSelector.children) {
        if (tab.innerHTML === tabName) {
            tab.classList.add('selected');
        } else {
            tab.classList.remove('selected');
        }
    }
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

registerOnLoad('tab-background', (element) => {
    registerTab('tab-background', element);
});

registerOnLoad('tab-skills', (element) => {
    registerTab('tab-skills', element);
});

registerOnLoad('skills-list', (element) => {
    for (const [name, description] of Object.entries(skills).sort((a, b) => {
        const upperA = a[0].toUpperCase();
        const upperB = b[0].toUpperCase();
        if (upperA < upperB) {
            return -1;
        } else if (upperA > upperB) {
            return 1;
        } else {
            return 0;
        }
    })) {
        element.innerHTML += `<li><p><strong>${name}</strong></p><p>${description}</p></li>`;
    }
});

registerOnLoad('lowest-element', () => {});
