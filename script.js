



const CONFIG = {
    studio: 'Project Studio',

    whatsapp: '00000000000',

    email: '000000000000',

    rates: {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        NGN: 1500
    }
};




const $ = selector => document.querySelector(selector);

const esc = text => String(text).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}[character]));




const T = {

    landing: {
        n: 'Landing page',
        d: 'One sharp page built to convert',
        p: 900,
        w: 1.5,

        o: [
            ['cms', 'CMS editing', 300, 0.5],
            ['mot', 'Motion design', 350, 0.5],
            ['seo', 'SEO and analytics', 250, 0.3],
            ['frm', 'Forms and CRM sync', 200, 0.2]
        ]
    },

    webapp: {
        n: 'Custom web app',
        d: 'Product, dashboard or internal tool',
        p: 4500,
        w: 6,

        o: [
            ['ui', 'Next.js / React front end', 700, 0.7],
            ['api', 'Node API and database', 900, 1],
            ['auth', 'Auth and user roles', 500, 0.7],
            ['pay', 'Payments (Stripe, Paystack)', 600, 0.8],
            ['ai', 'AI and LLM features', 800, 1]
        ]
    },

    brand: {
        n: 'Brand identity',
        d: 'Logo, colour and a voice that sticks',
        p: 1800,
        w: 3,

        o: [
            ['logo', 'Logo suite', 600, 0.7],
            ['gd', 'Brand guidelines PDF', 450, 0.5],
            ['soc', 'Social media kit', 350, 0.4],
            ['mo', 'Animated logo', 300, 0.3]
        ]
    },

    api: {
        n: 'API integration',
        d: 'Connect your tools and data',
        p: 1500,
        w: 2,

        o: [
            ['rest', 'REST or GraphQL endpoints', 500, 0.5],
            ['hk', 'Webhooks and queues', 400, 0.4],
            ['doc', 'OpenAPI documentation', 250, 0.3],
            ['tst', 'Automated tests', 350, 0.4]
        ]
    }

};




const SC = {

    mvp: {
        n: 'Lean MVP',
        d: 'Core flow only, shipped fast',
        m: 1,
        w: 1,
        x: '×1'
    },

    std: {
        n: 'Standard',
        d: 'Polished and production-ready',
        m: 1.5,
        w: 1.4,
        x: '×1.5'
    },

    full: {
        n: 'Full-scale',
        d: 'Every edge case, built to grow',
        m: 2.3,
        w: 2,
        x: '×2.3'
    }

};




const TM = {

    relaxed: {
        n: 'Flexible',
        d: 'More breathing room',
        m: 0.9,
        w: 1.3,
        x: '−10%'
    },

    std: {
        n: 'Standard',
        d: 'The balanced default',
        m: 1,
        w: 1,
        x: 'Base rate'
    },

    rush: {
        n: 'Fast-track',
        d: 'Priority slot in the schedule',
        m: 1.35,
        w: 0.65,
        x: '+35%'
    }

};




const MS = [

    ['Discovery and scope', 20, 'Scope document'],

    ['Design and prototype', 20, 'Interactive prototype'],

    ['Build and integrate', 30, 'Staging build'],

    ['QA and revisions', 20, 'Test report'],

    ['Launch and handover', 10, 'Live deploy and docs']

];




const IC = {

    landing:
        '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 14h6"/>',

    webapp:
        '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',

    brand:
        '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-2.9-5.3 2.9 1.2-6L3.4 9.3l6-.7z"/>',

    api:
        '<path d="M4 8h14l-3-3M20 16H6l3 3"/>'

};


const svg = path => `
<svg
viewBox="0 0 24 24"
width="22"
height="22"
fill="none"
stroke="currentColor"
stroke-width="1.7"
stroke-linecap="round"
stroke-linejoin="round"
aria-hidden="true">
${path}
</svg>
`;




const STEPS = [
    'Project',
    'Scale and timing',
    'Stack',
    'Details',
    'Review'
];




const LOC = {
    USD: 'en-US',
    EUR: 'en-IE',
    GBP: 'en-GB',
    NGN: 'en-NG'
};




const D = {
    step: 0,
    type: 'webapp',
    scale: 'std',
    time: 'std',
    x: [],
    name: '',
    contact: '',
    notes: '',
    cur: 'USD',
    th: 'dark',
    ms: 0
};

let S = { ...D };

try {
    S = {
        ...D,
        ...JSON.parse(localStorage.getItem('scope.v1') || '{}')
    };
} catch (error) {
}

if (!T[S.type]) S.type = D.type;

if (!SC[S.scale]) S.scale = D.scale;

if (!TM[S.time]) S.time = D.time;

if (!CONFIG.rates[S.cur]) S.cur = 'USD';

S.step = Math.min(4, Math.max(0, S.step | 0));

S.ms = Math.min(5, Math.max(0, S.ms | 0));

S.x = (
    Array.isArray(S.x) ? S.x : []
).filter(id => T[S.type].o.some(option => option[0] === id));




const save = () => {
    try {
        localStorage.setItem('scope.v1', JSON.stringify(S));
    } catch (error) {
    }
};




function calc() {

    const t = T[S.type];

    const sc = SC[S.scale];

    const tm = TM[S.time];

    const ex = t.o.filter(option => S.x.includes(option[0]));

    const base = t.p * sc.m;

    const add = ex.reduce(
        (total, option) => total + option[2],
        0
    );

    const adj = (base + add) * (tm.m - 1);

    const tot = base + add + adj;

    const wk = (
        t.w * sc.w +
        ex.reduce((total, option) => total + option[3], 0)
    ) * tm.w;

    const wl = Math.max(1, Math.round(wk * 0.9));

    return {
        t,
        sc,
        tm,
        ex,
        base,
        add,
        adj,
        tot,
        lo: tot * 0.92,
        hi: tot * 1.12,
        wl,
        wh: Math.max(wl + 1, Math.ceil(wk * 1.15))
    };

}




let NF;

let shown = null;

let tk = 0;

const RM = matchMedia(
    '(prefers-reduced-motion:reduce)'
).matches;


const setCur = () => {

    NF = new Intl.NumberFormat(
        LOC[S.cur] || 'en',
        {
            style: 'currency',
            currency: S.cur,
            maximumFractionDigits: 0
        }
    );

    shown = null;

};


const fmtC = number => NF.format(number);

const R = () => CONFIG.rates[S.cur];

const stp = () => S.cur === 'NGN' ? 10000 : 50;


const nice = value => (
    Math.round(value * R() / stp()) * stp()
);


const money = (value, step = stp()) => (
    fmtC(Math.round(value * R() / step) * step)
);


const wks = calculation => (
    calculation.wl + '–' + calculation.wh + ' weeks'
);


const range = calculation => (
    fmtC(nice(calculation.lo)) +
    ' – ' +
    fmtC(nice(calculation.hi))
);




function tween(a, b, element) {

    const id = ++tk;

    const t0 = performance.now();

    (function animate(time) {

        if (id !== tk) return;

        const k = Math.min(1, (time - t0) / 400);

        const e = 1 - Math.pow(1 - k, 3);

        element.textContent =
            fmtC(a[0] + (b[0] - a[0]) * e) +
            ' – ' +
            fmtC(a[1] + (b[1] - a[1]) * e);

        if (k < 1) {
            requestAnimationFrame(animate);
        }

    })(t0);

}




function updateEst() {

    const c = calc();

    const to = [
        nice(c.lo),
        nice(c.hi)
    ];

    const el = $('#eR');

    if (!shown || RM) {

        tk++;

        el.textContent =
            fmtC(to[0]) + ' – ' + fmtC(to[1]);

    } else {

        tween(shown, to, el);

    }

    shown = to;

    $('#eW').textContent =
        'Delivery in about ' + wks(c);

    $('#eB').innerHTML =

        `<div>
            <span>${c.t.n} × ${c.sc.n}</span>
            <b>${money(c.base, 1)}</b>
        </div>`

        +

        (
            c.ex.length
                ? `<div>
                    <span>Extras (${c.ex.length})</span>
                    <b>+${money(c.add, 1)}</b>
                   </div>`
                : ''
        )

        +

        (
            c.adj
                ? `<div>
                    <span>${c.tm.n} timing</span>
                    <b>${c.adj < 0 ? '−' : '+'}${money(Math.abs(c.adj), 1)}</b>
                   </div>`
                : ''
        );

}




const head = (title, description) => `
<p class="lbl">Step ${S.step + 1} of 5</p>
<h2>${title}</h2>
<p class="sub">${description}</p>
`;


const foot = () => `

<div class="nav">

    ${
        S.step
            ? '<button class="btn" data-a="back" type="button">Back</button>'
            : '<span></span>'
    }

    ${
        S.step < 4
            ? '<button class="btn pri" data-a="next" type="button">Continue</button>'
            : '<button class="btn" data-a="reset" type="button">Start over</button>'
    }

</div>

`;


const card = (action, value, active, icon, title, description, extra) => `

<button
class="opt${active ? ' on' : ''}"
data-a="${action}"
data-v="${value}"
aria-pressed="${active}"
type="button">

${icon}

<b>${title}</b>

<span>${description}</span>

${extra ? `<i>${extra}</i>` : ''}

</button>

`;


const lab = () => (
    S.type === 'brand' ? 'Deliverables' : 'Stack'
);




const sType = () =>

    head(
        'What are we building?',
        'Pick the closest fit. You can refine everything on the next steps.'
    )

    +

    '<div class="opts">'

    +

    Object.entries(T).map(([key, project]) =>

        card(
            'type',
            key,
            S.type === key,
            svg(IC[key]),
            project.n,
            project.d,
            'from ' + money(project.p)
        )

    ).join('')

    +

    '</div>'

    +

    foot();




const sScale = () =>

    head(
        'Scale and timing',
        'Bigger scope means more screens, edge cases and polish. Faster delivery means a priority slot.'
    )

    +

    '<p class="grp">How big?</p>'

    +

    '<div class="opts">'

    +

    Object.entries(SC).map(([key, scale]) =>

        card(
            'scale',
            key,
            S.scale === key,
            '',
            scale.n,
            scale.d,
            scale.x
        )

    ).join('')

    +

    '</div>'

    +

    '<p class="grp">How soon?</p>'

    +

    '<div class="opts">'

    +

    Object.entries(TM).map(([key, timing]) =>

        card(
            'time',
            key,
            S.time === key,
            '',
            timing.n,
            timing.d,
            timing.x
        )

    ).join('')

    +

    '</div>'

    +

    foot();




const sStack = () =>

    head(
        S.type === 'brand'
            ? 'Pick your deliverables'
            : 'Stack and extras',

        'Optional. Select anything that applies and skip the rest.'
    )

    +

    '<div class="opts">'

    +

    T[S.type].o.map(option =>

        card(
            'x',
            option[0],
            S.x.includes(option[0]),
            '',
            option[1],
            '+' + option[3] + ' wk',
            '+' + money(option[2])
        )

    ).join('')

    +

    '</div>'

    +

    foot();




const sDetails = () =>

    head(
        'Who’s it for?',
        'Optional, but it pre-fills your booking message.'
    )

    +

    `

    <label for="f-name">Name or company</label>

    <input
        id="f-name"
        data-f="name"
        value="${esc(S.name)}"
        autocomplete="name"
    >

    <label for="f-contact">Email or WhatsApp</label>

    <input
        id="f-contact"
        data-f="contact"
        value="${esc(S.contact)}"
        autocomplete="email"
    >

    <label for="f-notes">Anything else we should know?</label>

    <textarea
        id="f-notes"
        data-f="notes"
        placeholder="Goals, deadlines, links for inspiration"
    >${esc(S.notes)}</textarea>

    `

    +

    foot();




function brief() {

    const c = calc();

    return [

        `Hi ${CONFIG.studio}, I’d like to lock in this project scope:`,

        `• Project: ${c.t.n} (${c.sc.n})`,

        `• ${lab()}: ${c.ex.map(option => option[1]).join(', ') || 'Core only'}`,

        `• Timeline: ${c.tm.n}, about ${wks(c)}`,

        `• Estimated budget: ${range(c)}`,

        S.name && `• Name: ${S.name}`,

        S.contact && `• Contact: ${S.contact}`,

        S.notes && `• Notes: ${S.notes}`,

        'Can we book a consultation?'

    ].filter(Boolean).join('\n');

}




function sReview() {

    const c = calc();

    const m = encodeURIComponent(brief());

    return head(
        'Review and book',
        'This is your brief. One tap sends it, ready to discuss.'
    )

    +

    `

    <div class="rows">

        <div>
            <span>Project</span>
            <b>${c.t.n}, ${c.sc.n}</b>
        </div>

        <div>
            <span>${lab()}</span>
            <b>${c.ex.map(option => option[1]).join(', ') || 'Core only'}</b>
        </div>

        <div>
            <span>Timeline</span>
            <b>${c.tm.n}, ${wks(c)}</b>
        </div>

        <div>
            <span>Budget</span>
            <b>${range(c)}</b>
        </div>

        <div>
            <span>Client</span>
            <b>${esc(S.name || 'Not provided')}${S.contact ? ' · ' + esc(S.contact) : ''}</b>
        </div>

        ${
            S.notes
                ? `<div>
                    <span>Notes</span>
                    <b>${esc(S.notes)}</b>
                   </div>`
                : ''
        }

    </div>

    <div class="cta">

        <a
            class="btn pri"
            target="_blank"
            rel="noopener"
            href="https://wa.me/${CONFIG.whatsapp}?text=${m}"
        >
            Lock in scope and book consultation
        </a>

        <a
            class="btn"
            href="mailto:${CONFIG.email}?subject=${encodeURIComponent('Project scope: ' + c.t.n)}&body=${m}"
        >
            Send by email instead
        </a>

        <button class="btn" data-a="copy" type="button">
            Copy brief
        </button>

        <a class="btn" href="#portal">
            Preview the client portal
        </a>

    </div>

    `

    +

    foot();

}




function scope() {

    $('#stepper').innerHTML = STEPS.map((name, index) => `

        <button
            type="button"
            ${index > S.step ? 'disabled' : ''}
            class="${index < S.step ? 'done' : index === S.step ? 'cur' : ''}"
            data-a="go"
            data-v="${index}"
            aria-label="${name}"
        >
            <span>${name}</span>
        </button>

    `).join('');


    const panel = $('#panel');

    panel.innerHTML = [
        sType,
        sScale,
        sStack,
        sDetails,
        sReview
    ][S.step]();


    panel.classList.remove('enter');

    void panel.offsetWidth;

    panel.classList.add('enter');

    updateEst();

}




function portal() {

    const c = calc();

    const tot = nice(c.tot);

    const mid = (c.wl + c.wh) / 2;

    const cum = [
        0.15,
        0.35,
        0.7,
        0.85,
        1
    ];

    const t0 = Date.now();

    const f = value => fmtC(Math.round(value));


    const amt = index => (
        tot * MS[index][1] / 100
    );


    const dt = index => new Date(
        t0 + cum[index] * mid * 7 * 864e5
    ).toLocaleDateString(
        'en',
        {
            month: 'short',
            day: 'numeric'
        }
    );


    const rel = MS.reduce(
        (total, milestone, index) => (
            index < S.ms ? total + amt(index) : total
        ),
        0
    );


    const held = S.ms < 5 ? amt(S.ms) : 0;

    const pct = S.ms < 5 ? S.ms * 20 + 10 : 100;


    

    const rows = MS.map((milestone, index) => {

        const status =
            index < S.ms
                ? 'done'
                : index === S.ms
                    ? 'act'
                    : '';

        return `

        <div class="ms ${status}">

            <span class="dot">
                ${status === 'done' ? '✓' : ''}
            </span>

            <div>

                <b>${milestone[0]}</b>

                <span class="lbl">
                    Due ${dt(index)} · ${milestone[2]}
                </span>

            </div>

            <div class="r">

                <b>${f(amt(index))}</b>

                <span class="tag ${
                    status === 'done'
                        ? 'ok'
                        : status
                            ? 'hot'
                            : ''
                }">

                    ${
                        status === 'done'
                            ? 'Marked complete'
                            : status
                                ? 'In review'
                                : 'Scheduled'
                    }

                </span>

            </div>

        </div>

        `;

    }).join('');


    

    const dl = MS.map((milestone, index) => `

        <li>

            <span>${milestone[2]}</span>

            <span class="tag ${
                index < S.ms
                    ? 'ok'
                    : index === S.ms
                        ? 'hot'
                        : ''
            }">

                ${
                    index < S.ms
                        ? 'Delivered'
                        : index === S.ms
                            ? 'In review'
                            : 'Pending'
                }

            </span>

        </li>

    `).join('');


    

    const act = S.ms < 5

        ? `

        <button class="btn pri" data-a="approve" type="button">

            Approve “${MS[S.ms][0]}” and release ${f(amt(S.ms))}

        </button>

        `

        : `

        <span class="tag ok">
            Project delivered. All milestones released.
        </span>

        `;


    

    $('#v-portal').innerHTML = `

    <h1>Your project, <span>at a glance.</span></h1>

    <p class="lead">
        Explore a sample client workspace with milestones and delivery status.
        This preview uses demonstration data only.
    </p>


    <div class="card">

        <div class="spread">

            <div>

                <p class="lbl">
                    ${esc(S.name || 'Your client')} · portal preview
                </p>

                <h2>${c.t.n}</h2>

            </div>

            <span class="tag hot">Simulation</span>

        </div>


        <div class="bar">
            <b style="width:${pct}%"></b>
        </div>

        <p class="lbl">
            ${pct}% complete · estimated launch ${dt(4)}
        </p>

    </div>


    <div class="dash">

        <div class="card">

            <h3>Milestones</h3>

            ${rows}

            <div class="cta">

                ${act}

                <button class="btn" data-a="rst" type="button">
                    Reset demo
                </button>

            </div>

        </div>


        <div class="col">


            <div class="card">

                <h3>Milestone value overview</h3>

                <div class="bd">

                    <div>
                        <span>Contract value</span>
                        <b>${f(tot)}</b>
                    </div>

                    <div>
                        <span>Marked complete</span>
                        <b>${f(rel)}</b>
                    </div>

                    <div>
                        <span>Held in escrow</span>
                        <b>${f(held)}</b>
                    </div>

                    <div>
                        <span>Scheduled</span>
                        <b>${f(tot - rel - held)}</b>
                    </div>

                </div>

                <p class="fine">
                    Demonstration only. No funds are collected, held or released by this preview.
                </p>

            </div>


            <div class="card">

                <h3>Deliverables</h3>

                <ul class="dl">
                    ${dl}
                </ul>

            </div>


        </div>

    </div>

    `;

}




let view = 'scope';


function render() {

    view = location.hash === '#portal'
        ? 'portal'
        : 'scope';


    $('#v-scope').hidden = view !== 'scope';

    $('#v-portal').hidden = view !== 'portal';


    document.querySelectorAll('nav a').forEach(link => {

        link.setAttribute(
            'aria-current',
            link.getAttribute('href') === '#' + view
                ? 'page'
                : 'false'
        );

    });


    view === 'scope'
        ? scope()
        : portal();

}




addEventListener('hashchange', () => {

    render();

    const section = $('#v-' + view);

    section.classList.remove('enter');

    void section.offsetWidth;

    section.classList.add('enter');

    scrollTo(0, 0);

});




const sel = button => {

    button.parentElement
        .querySelectorAll('.opt')
        .forEach(option => {

            option.classList.remove('on');

            option.setAttribute('aria-pressed', 'false');

        });


    button.classList.add('on');

    button.setAttribute('aria-pressed', 'true');

};




document.addEventListener('click', event => {

    const button = event.target.closest('[data-a]');

    if (!button) return;


    const action = button.dataset.a;

    const value = button.dataset.v;


    

    if (action === 'type') {

        S.type = value;

        S.x = [];

        sel(button);

    }


    

    else if (action === 'scale' || action === 'time') {

        S[action] = value;

        sel(button);

    }


    

    else if (action === 'x') {

        S.x = S.x.includes(value)

            ? S.x.filter(item => item !== value)

            : [...S.x, value];


        button.classList.toggle('on');

        button.setAttribute(
            'aria-pressed',
            String(button.classList.contains('on'))
        );

    }


    

    else if (
        action === 'next' ||
        action === 'back' ||
        action === 'go'
    ) {

        S.step = action === 'go'

            ? +value

            : S.step + (action === 'next' ? 1 : -1);


        save();

        render();

        scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        return;

    }


    

    else if (action === 'reset') {

        S = {
            ...D,
            cur: S.cur,
            th: S.th
        };

        save();

        render();

        return;

    }


    

    else if (action === 'approve') {

        S.ms = Math.min(5, S.ms + 1);

        save();

        portal();

        return;

    }


    

    else if (action === 'rst') {

        S.ms = 0;

        save();

        portal();

        return;

    }


    

    else if (action === 'copy') {

        navigator.clipboard.writeText(brief()).then(

            () => button.textContent = 'Copied',

            () => button.textContent = 'Copy blocked by browser'

        );

        return;

    }


    save();

    updateEst();

});




document.addEventListener('input', event => {

    const field = event.target.dataset.f;

    if (field) {

        S[field] = event.target.value;

        save();

    }

});




const applyTheme = () => {

    document.documentElement.dataset.theme = S.th;

};


$('#th').onclick = () => {

    S.th = S.th === 'dark'
        ? 'light'
        : 'dark';

    applyTheme();

    save();

};




$('#cur').innerHTML = Object.keys(CONFIG.rates).map(currency => `

    <option>${currency}</option>

`).join('');


$('#cur').value = S.cur;


$('#cur').onchange = event => {

    S.cur = event.target.value;

    setCur();

    save();

    render();

};




$('#studio').textContent = CONFIG.studio;




applyTheme();

setCur();

render();