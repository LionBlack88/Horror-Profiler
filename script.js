const questions = [

    { t: "In un film, la morte deve essere mostrata nei minimi dettagli per essere efficace?", c: "gore" },

    { t: "Ti senti affascinato dalle trasformazioni corporee grottesche e dolorose?", c: "gore" },

    { t: "Un eccesso di sangue finto ti diverte invece di disgustarti?", c: "gore" },

    { t: "Preferisci gli effetti speciali 'pratici' (lattice e trucco) rispetto alla CGI?", c: "gore" },

    { t: "Riesci a mangiare guardando una scena di chirurgia o tortura nei film?", c: "gore" },

    { t: "Ti piacciono i protagonisti che finiscono il film coperti di sangue?", c: "gore" },

    { t: "Il realismo di una ferita è per te un valore artistico importante?", c: "gore" },

    { t: "Quanto ti affascina vedere effetti speciali di ferite realistiche?", c: "gore" },

    { t: "Preferisci non vedere il killer fino agli ultimi 5 minuti del film?", c: "mystery" },

    { t: "Ti piace cercare indizi per scoprire il killer prima della fine?", c: "mystery" },

    { t: "Ti piace quando la trama ti costringe a dubitare della sanità mentale del protagonista?", c: "mystery" },

    { t: "Un horror è migliore se ti lascia con un finale aperto o ambiguo?", c: "mystery" },

    { t: "Ti appassionano le storie basate su sette segrete o simboli esoterici?", c: "mystery" },

    { t: "Preferisci il terrore psicologico di 'non sapere' rispetto a un mostro?", c: "mystery" },

    { t: "Ami le ambientazioni isolate dove chiunque può essere il colpevole?", c: "mystery" },

    { t: "Ti piace analizzare i moventi psicologici di un assassino?", c: "mystery" },

    { t: "Ti piacciono i film con un'inarrestabile macchina da guerra (tipo Jason)?", c: "monsters" },

    { t: "Sei affascinato dal design di creature aliene o animali mutati?", c: "monsters" },

    { t: "Preferisci un mostro gigante che distrugge tutto rispetto a un fantasma?", c: "monsters" },

    { t: "Sei un fan delle creature classiche (Lupi mannari, Alieni)?", c: "monsters" },

    { t: "Preferisci vedere un inseguimento brutale contro un mostro?", c: "monsters" },

    { t: "Ti piacciono i design grotteschi delle creature cinematografiche?", c: "monsters" },

    { t: "I film sui vampiri ti hanno sempre affascinato?", c: "monsters" },

    { t: "Ti piacciono gli zombie e le apocalissi mostruose?", c: "monsters" },

    { t: "Ti spaventano più le presenze invisibili che i killer mascherati?", c: "supernatural" },

    { t: "Ti interessano i documentari su case infestate e demoni?", c: "supernatural" },

    { t: "Ti affascinano le storie di possessioni demoniache ed esorcismi?", c: "supernatural" },

    { t: "Ti piacciono i film con atmosfere gotiche, cimiteri e nebbia?", c: "supernatural" },

    { t: "Riesci a percepire tensione quando un film usa il silenzio?", c: "supernatural" },

    { t: "Ti interessano i fenomeni di 'poltergeist' o voci fantasma?", c: "supernatural" },

    { t: "Ti spaventa l'idea che qualcosa di invisibile possa toccarti nel buio?", c: "supernatural" },

    { t: "Quanto ti affascina l'ignoto e ciò che non può essere spiegato?", c: "supernatural" }

];



let currentStep = 0;

let scores = { gore: 0, mystery: 0, monsters: 0, supernatural: 0 };

let counts = { gore: 0, mystery: 0, monsters: 0, supernatural: 0 };

let playerName = "";



function startQuiz() {

    const nameInput = document.getElementById('player-name');

    playerName = nameInput.value.trim() !== "" ? nameInput.value.trim() : "Ignoto";

    document.getElementById('start-screen').style.display = 'none';

    document.getElementById('quiz-container').style.display = 'flex';

    window.scrollTo(0, 0);

}



function updateQuestion() {

    const wrapper = document.getElementById('question-wrapper');

    const box = document.getElementById('horror-quiz-box');

    wrapper.classList.add('fade-out');

    box.classList.add('blood-flash');



    setTimeout(() => {

        box.classList.remove('blood-flash');

        if (currentStep < questions.length) {

            document.getElementById('question-text').innerText = questions[currentStep].t;

            document.getElementById('question-number').innerText = `Domanda ${currentStep + 1} di 32`;

            document.getElementById('progress-fill').style.width = `${(currentStep / 32) * 100}%`;

            document.getElementById('current_val').value = 5;

            wrapper.classList.remove('fade-out');

            wrapper.classList.add('fade-in');

            setTimeout(() => wrapper.classList.remove('fade-in'), 50);

        } else showResults();

    }, 300);

}



function nextQuestion() {

    scores[questions[currentStep].c] += parseInt(document.getElementById('current_val').value);

    counts[questions[currentStep].c]++;

    currentStep++;

    updateQuestion();

}



function showResults() {

    document.getElementById('quiz-container').style.display = 'none';

    document.getElementById('result-area').style.display = 'block';

    document.getElementById('header-title').innerText = "Profilo di " + playerName;

    

    const vG = scores.gore / 8, vMy = scores.mystery / 8, vMo = scores.monsters / 8, vS = scores.supernatural / 8;

    disegnaRadar(vG, vMy, vMo, vS);

    generaDescrizione(vG, vMy, vMo, vS);

}


function generaDescrizione(g, my, mo, s) {

    const list = [

        { name: "Gore", val: g, txt: "del gore estremo: apprezzi la fisicità e il realismo degli effetti speciali." },

        { name: "Mistero", val: my, txt: "del mistero: l'orrore per te è una sfida intellettuale e psicologica." },

        { name: "Mostri", val: mo, txt: "di mostri e slasher: ami l'azione, le icone horror e le creature leggendarie." },

        { name: "Paranormale", val: s, txt: "del soprannaturale: cerchi il brivido dell'ignoto e delle atmosfere inquietanti." }

    ];

    list.sort((a, b) => b.val - a.val);

    const max = list[0].val, min = list[3].val;

    let finalDesc = "";



    if (max === min) {

        finalDesc = "Sei un fan dell'orrore a 360 gradi: non hai una preferenza specifica, apprezzi ogni sfumatura del terrore in modo equilibrato.";

    } else if (max - list[1].val < 0.5) {

        finalDesc = `Sei un profilo ibrido: il tuo gusto oscilla tra l'amore per ${list[0].txt.split(':')[0]} e quello per ${list[1].txt.split(':')[0]}.`;

    } else {

        finalDesc = `Sei un amante ${list[0].txt}`;

    }

    document.getElementById('descrizione-horror').innerHTML = finalDesc;

}



function resetQuiz() {

    currentStep = 0; scores = { gore: 0, mystery: 0, monsters: 0, supernatural: 0 };

    counts = { gore: 0, mystery: 0, monsters: 0, supernatural: 0 };

    playerName = ""; 

    document.getElementById('player-name').value = ""; 

    document.getElementById('header-title').innerText = "Horror Profiler"; 

    

    document.getElementById('start-screen').style.display = 'flex';

    document.getElementById('quiz-container').style.display = 'none';

    document.getElementById('result-area').style.display = 'none';

    updateQuestion();

}



updateQuestion();

function disegnaRadar(vG, vMy, vMo, vS) {
    const svg = document.getElementById('radarSVG');
    const c = 200; 
    const s = 12; 
    
    const pG = { x: c, y: c - (vG * s) };
    const pMy = { x: c + (vMy * s), y: c };
    const pMo = { x: c, y: c + (vMo * s) };
    const pS = { x: c - (vS * s), y: c };

    // MODIFICA QUI: viewBox parte da -80 (più spazio a sinistra)
    // Larghezza aumentata a 560 per mantenere la proporzione
    svg.setAttribute("viewBox", "-80 -50 560 500");
    svg.style.overflow = "visible"; 

    // Font leggermente più grande e definito
    const fontStyle = 'font-family: "Arial", sans-serif; font-weight: bold; font-size: 18px;';

    svg.innerHTML = `
        <style>
            .radar-text { ${fontStyle} fill: #ff3333; }
        </style>
        <circle cx="${c}" cy="${c}" r="120" stroke="#444" fill="none" />
        <line x1="${c}" y1="80" x2="${c}" y2="320" stroke="#333" />
        <line x1="80" y1="${c}" x2="320" y2="${c}" stroke="#333" />
        
        <polygon points="${pG.x},${pG.y} ${pMy.x},${pMy.y} ${pMo.x},${pMo.y} ${pS.x},${pS.y}" 
                 fill="rgba(255, 0, 0, 0.8)" stroke="#ff0000" stroke-width="3" />

        <text x="${c}" y="40" class="radar-text" text-anchor="middle">GORE</text>
        <text x="340" y="${c+5}" class="radar-text" text-anchor="start">MISTERO</text>
        <text x="${c}" y="370" class="radar-text" text-anchor="middle">MOSTRI</text>
        
        <text x="60" y="${c+5}" class="radar-text" text-anchor="end">PARANORMALE</text>`;
}

async function saveScreenshot() {
    window.scrollTo(0, 0);
    const element = document.getElementById('horror-quiz-box');
    const btns = document.querySelector('.result-buttons');
    
    // 1. PREPARAZIONE: Nascondi bottoni e blocca animazioni
    btns.style.display = 'none';
    
    // Salviamo lo stile originale per ripristinarlo dopo
    const originalOverflow = element.style.overflow;
    const originalAnimation = element.style.animation;
    const originalTransition = element.style.transition;

    // FORZATURA: Diciamo al box di mostrare tutto (anche ciò che esce dai bordi)
    // e di spegnere qualsiasi movimento.
    element.style.overflow = "visible";
    element.style.animation = "none";
    element.style.transition = "none";

    // 2. CONVERSIONE SVG -> IMMAGINE
    const svg = document.getElementById('radarSVG');
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const image64 = 'data:image/svg+xml;base64,' + svg64;

    const tempImg = new Image();
    
    tempImg.onload = function() {
        const originalParent = svg.parentNode;
        const originalNextSibling = svg.nextSibling;
        
        svg.remove();
        if (originalNextSibling) originalParent.insertBefore(tempImg, originalNextSibling);
        else originalParent.appendChild(tempImg);

        // 3. SCATTO
        html2canvas(element, {
            backgroundColor: '#1a1a1a',
            scale: 2,
            useCORS: true,
            logging: false,
            // scrollX/Y aiutano a catturare parti nascoste
            scrollX: 0,
            scrollY: 0,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight
        }).then(canvas => {
            // 4. RIPRISTINO
            tempImg.remove();
            if (originalNextSibling) originalParent.insertBefore(svg, originalNextSibling);
            else originalParent.appendChild(svg);
            
            // Ripristina stili originali
            btns.style.display = 'flex';
            element.style.overflow = originalOverflow;
            element.style.animation = originalAnimation;
            element.style.transition = originalTransition;

            // 5. DOWNLOAD
            const link = document.createElement('a');
            link.download = `HorrorProfiler_${playerName || 'Ignoto'}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    };

    tempImg.src = image64;
    // Dimensioni fisse per evitare che l'immagine si rimpicciolisca nel box
    tempImg.style.width = "400px"; 
    tempImg.style.height = "400px"; 
    tempImg.style.display = "block";
    tempImg.style.margin = "0 auto";
}
