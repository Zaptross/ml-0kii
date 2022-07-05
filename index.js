if (!localStorage.getItem('last-tab')) {
    localStorage.setItem('last-tab', 'tab-background');
}

const KRONOS_VARIANTS = ['kronos', 'chronos', 'cronos'];
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

const abilities = {
    'Technical Knock':
        'With a honeyed whisper and ritual motion, you can awaken sleeping gun-spirits into furious action once more. You may unjam any gun as a Half Action. You must touch the gun in question to enact this rite. You may only perform this rite on one weapon per Round—any more would be disrespectful',
    'Rapid Reload':
        'You have spent so long practising weapons drills that you can reload a gun in an instant. All reload times are reduced by half (round down)—so a Half Action reload become a Free Action, a Full Action reload becomes a Half Action and so on.',
    'Binary Chatter':
        'You are adept at controlling servitors. Gain a +10 bonus to any attempt to instruct, program or question servitors.',
    'Luminen Charge': `You have learnt how to lend your life force to technology.
    On a successful Toughness Test you may use your bio-electrical field to recharge or power machinery.
    This takes one minute of meditation and ritual incantation to activate.
    Note that at the GM's discretion, some technology is simply too arcane, broken or power-hungry for you to be able to activate.
    Each time you use this Talent, you gain a level of Fatigue.
    The Difficulty of the Toughness Test varies depending on the nature of the technology, as follows:
        <table>
            <thead>
                <tr><th>Difficulty</th><th>Example</th></tr>
            </thead>
            <tr><td>Ordinary (+10)</td><td>Chemical battery, glow globe</td></tr>
            <tr><td>Challenging (+0)</td><td>Las gun charge pack, data-slate, personal heater</td></tr>
            <tr><td>Difficult (-10)</td><td>Overcharge pack, air conditioning unit, servoskull</td></tr>
            <tr><td>Hard (-20)</td><td>Land speeder engine, lascannon charge pack, servitor</td></tr>
            <tr><td>Very Hard (-30)</td><td>Industrial press, cogitator engine, xenos tech</td></tr>
        </table>`,
};

const skillsEnum = {
    ws: 'Weapon Skill',
    bs: 'Ballistic Skill',
    str: 'Strength',
    t: 'Toughness',
    ag: 'Agility',
    int: 'Intelligence',
    per: 'Perception',
    wp: 'Willpower',
    fel: 'Fellowship',
};

let skills = {};

const calcStat = (stat, skilled = 0, bonus10s = 0) =>
    Math.floor((skilled ? 1 : 0.5) * (skills.stats[stat] + 10 * bonus10s));

// Fill out stats object
skills.stats = {
    [skillsEnum.ws]: 34,
    [skillsEnum.bs]: 39,
    [skillsEnum.str]: 29,
    [skillsEnum.t]: 40,
    [skillsEnum.ag]: 32,
    [skillsEnum.int]: 37,
    [skillsEnum.per]: 39,
    [skillsEnum.wp]: 36,
    [skillsEnum.fel]: 25,
};
skills.skills = {
    Awareness: calcStat(skillsEnum.per, 0, 1),
    Barter: calcStat(skillsEnum.fel),
    Carouse: calcStat(skillsEnum.t),
    Charm: calcStat(skillsEnum.fel),
    Climb: calcStat(skillsEnum.str),
    Concealment: calcStat(skillsEnum.ag),
    Contortionist: calcStat(skillsEnum.ag),
    Deceive: calcStat(skillsEnum.fel),
    Disguise: calcStat(skillsEnum.fel),
    Dodge: calcStat(skillsEnum.ag),
    Evaluate: calcStat(skillsEnum.int),
    Gamble: calcStat(skillsEnum.int),
    Inquiry: calcStat(skillsEnum.fel),
    Intimidate: calcStat(skillsEnum.fel),
    Logic: calcStat(skillsEnum.int, 1, 1),
    Scrutiny: calcStat(skillsEnum.per, 0, 1),
    Search: calcStat(skillsEnum.per, 0, 1),
    'Silent Move': calcStat(skillsEnum.ag),
    Swim: calcStat(skillsEnum.str),
    Literacy: calcStat(skillsEnum.int),
    'Speak Language (Low Gothic)': calcStat(skillsEnum.fel, 1),
    'Speak Language (Hive Dialect)': calcStat(skillsEnum.fel, 1),
    'Secret Tongue (Tech)': calcStat(skillsEnum.int, 1),
    'Trade (Scrimshawer)': calcStat(skillsEnum.ag, 1),
    'Common Lore (Machine Cult)': calcStat(skillsEnum.int, 1),
    'Common Lore (Tech)': calcStat(skillsEnum.int, 1),
    'Tech Use': calcStat(skillsEnum.int, 1, 2),
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
    const classes = `section-tab ${
        localStorage.getItem('last-tab') === tabId ? 'selected' : ''
    }`;

    tabsSelector.innerHTML += `<button class="${classes}" onclick="tabOnClick('${tabId}');">${tabName}</button>`;

    if (localStorage.getItem('last-tab') !== tabId) {
        document.getElementById(tabId).classList.add('if-false');
    }
}

const onInputSearch = (inputId, listId) => () => {
    const input = document.getElementById(inputId);
    const skillList = document.getElementById(listId);

    let search = input.value.toLowerCase();
    const incl = (text) => text.toLowerCase().includes(search.toLowerCase());

    if (KRONOS_VARIANTS.some((x) => search.toLowerCase().includes(x))) {
        touchOfTheWarp(50);
        input.value = '';
        search = '';
    }

    for (const item of skillList.children) {
        if (incl(item.innerHTML)) {
            item.classList.remove('if-false');
        } else {
            item.classList.add('if-false');
        }
    }
};

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

registerOnLoad('tab-abilities', (element) => {
    registerTab('tab-abilities', element);
});

registerOnLoad('abilities-list', (element) => {
    for (const [name, description] of Object.entries(abilities).sort((a, b) => {
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

registerOnLoad('tab-abilities-search', (element) => {
    element.addEventListener(
        'input',
        onInputSearch('tab-abilities-search', 'abilities-list')
    );
    element.focus();
});

registerOnLoad('tab-skills', (element) => {
    registerTab('tab-skills', element);
});

registerOnLoad('tab-notes', async (element) => {
    registerTab('tab-notes', element);

    const notesData = await (await fetch('notes.md')).text();

    element.innerHTML = notesData
        .split(/[\n\r]+/)
        .map(markdownToHTML)
        .join('');
});

registerOnLoad('skills-list', (element) => {
    for (const [name, description] of Object.entries({
        ...skills.stats,
        ...skills.skills,
    }).sort((a, b) => {
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
        element.innerHTML += `<p><strong>${name}: ${description}</strong></p>`;
    }
});

/**
 * @param {string} raw
 */
function markdownToHTML(raw) {
    /**
     * @param {string} raw
     */
    const preprocess = (str) => {
        let out = str;

        if (['<', '>'].some((x) => out.includes(x))) {
            out = out.replace(
                /\\<(.*?)\\>/gim,
                '<span style="color: magenta;" class="angleBraced">$1</span>'
            );
        }

        const split = out.split(':');

        if (split.length > 1) {
            out = `<strong>${split[0]}</strong>${split.slice(1)}`;
        }

        if (KRONOS_VARIANTS.some((x) => new RegExp(x, 'gmi'))) {
            for (const variant of KRONOS_VARIANTS) {
                for (const varCase of [
                    variant.toLowerCase(),
                    variant.toUpperCase(),
                ]) {
                    out = out.replace(
                        varCase,
                        `<span class="redacted">REDACTED</span>`
                    );
                }
            }
        }

        return out;
    };

    if (raw.startsWith('##')) {
        return `<h3>${preprocess(raw.slice(3))}</h3>`;
    }
    if (raw.startsWith('#')) {
        return `<h2>${preprocess(raw.slice(2))}</h2>`;
    }
    if (raw.startsWith('-')) {
        return `<li>${preprocess(raw.slice(2))}</li>`;
    }
    return `<p>${preprocess(raw)}</p>`;
}

registerOnLoad('tab-skills-search', (element) => {
    element.addEventListener(
        'input',
        onInputSearch('tab-skills-search', 'skills-list')
    );
    element.focus();
});

const arrayifyCollection = (collection) =>
    Array.prototype.slice.call(collection);

function depthFirstFlatten(array) {
    const outElements = [];
    for (const element of array) {
        if (element.children?.length) {
            outElements.push(
                ...depthFirstFlatten(arrayifyCollection(element.children))
            );
        }
        outElements.push(element);
    }
    return outElements;
}

async function touchOfTheWarp(delayMs) {
    const nodes = depthFirstFlatten(arrayifyCollection(document.body.children));

    setPrettyReWrite('pageTitle', 'HERETEK DETECTED: EXCOMMUNICATUS');
    setPrettyReWrite(
        'pageSubtitle',
        'STANDBY FOR PURGE PROTOCOL COMPLETION IN T-15 SECONDS'
    );

    for (const node of nodes) {
        node.classList.add('red');
        if (node.classList.contains('filter-green')) {
            node.classList.add('filter-red');
        }
        if (!node.classList.contains('if-false')) {
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }

        if (
            [
                'h2',
                'p',
                'strong',
                'em',
                'h3',
                'button',
                'span',
                'blockquote',
            ].includes(node.nodeName.toLowerCase()) &&
            !['pageTitle', 'pageSubtitle'].includes(node.id)
        ) {
            node.innerHTML = cheekyLilHash(node.innerHTML);
        }
    }

    for (const node of nodes) {
        if (
            !(
                ['aquila', 'archives-text'].some((x) =>
                    node.classList.contains(x)
                ) ||
                ['footer', 'aquila-container', 'pageTitle', 'header'].includes(
                    node.id
                )
            )
        ) {
            node.style = 'display: none;';
            if (!node.classList.contains('if-false')) {
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
        } else {
            node.style = 'width: 100%; height:100%; text-align: center';
        }
    }
}

let prettyInterval = null;
const counters = {};
function setPrettyReWrite(id, newText) {
    if (!counters[id] && !!document.getElementById(id)) {
        counters[id] = {
            element: document.getElementById(id),
            index: 0,
            newText,
            originalLength: document.getElementById(id).innerHTML.length,
        };
        if (!prettyInterval) {
            prettyInterval = setInterval(doPrettyReWrite, 50);
        }
    }
}

function doPrettyReWrite() {
    for (const [id, pretty] of Object.entries(counters)) {
        if (pretty.index < pretty.originalLength) {
            const { element, index, newText } = pretty;
            let outStr = element.innerHTML;
            if (index - 2 >= 0 && index - 2 < element.innerHTML.length) {
                outStr = modifyString(
                    outStr,
                    index - 2,
                    index - 2 > newText.length ? '' : newText[index - 2]
                );
            }
            if (index - 1 >= 0 && index - 1 < element.innerHTML.length) {
                outStr = modifyString(
                    outStr,
                    index - 1,
                    String.fromCharCode(Math.floor(Math.random() * 100))
                );
            }
            if (index < element.innerHTML.length) {
                outStr = modifyString(
                    outStr,
                    index,
                    String.fromCharCode(Math.floor(Math.random() * 100))
                );
                element.innerHTML = outStr;
                pretty.index += 1;
            }
        } else {
            pretty.element.innerHTML = pretty.newText;
            delete counters[id];
        }
    }

    if (!Object.keys(counters).length) {
        clearInterval(prettyInterval);
    }
}

function randomChar() {
    return randomFrom(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+,./\\|?`~'
    );
}

function modifyString(str, index, char) {
    if (index > str.length && char !== '') {
        return str + char;
    }
    return str.slice(0, index) + char + str.slice(index + 1);
}

function cheekyLilHash(input) {
    let raw = input.split('');

    for (let i = 0; i < raw.length; i++) {
        const rawChar = raw[i].charCodeAt(0);
        const mulCharIndex = Math.round(i + raw.length / 2) % raw.length;
        const mulChar =
            typeof raw[mulCharIndex] === 'number'
                ? raw[mulCharIndex]
                : raw[mulCharIndex].charCodeAt(0);

        raw[i] = (((rawChar << 5) - rawChar) & Date.now()) << mulChar;
    }

    return raw.map((x) => String.fromCharCode(x % 1001)).join('');
}
