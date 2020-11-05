import './characters'

// Create checkboxes
for (const charset in hiragana) {
    const cb = $(`
    <div>
    <label for="${charset}">${charset}</label>
    <input type="checkbox" id="${charset}" name="${charset}" checked >
    </div>
    `)
    .on('keyup', function(evt){evt.preventDefault();});


    $('.checkboxes').append(cb);
}

const checkboxes = $('input[type="checkbox"]');
let inverted = false;

function invertObj(obj) {
    return Object.keys(obj).reduce((acc,k) => {
        acc[[obj[k]]] = k;
        return acc;
    }, {});
}

function getPool() {
    let pool = {};
    for(const cb of checkboxes) {
        if (cb.checked) {
            Object.assign(pool, hiragana[cb.id]);
        }
    }

    if (inverted) return invertObj(pool);
    else return pool;
}

// Exercise logic
let length = 1

function choose(choices, n=1) {
    let ret = [];
    for(let i=0; i<n; i++){ 
        let index = Math.floor(Math.random() * choices.length);
        ret.push(choices[index]);
    }

    return ret;
}

const previous = document.getElementById('previous');
const answer = document.getElementById('answer');
const current = document.getElementById('current');

let chars = choose(Object.keys(getPool()), length);
current.innerHTML = chars.join('');

document.addEventListener('keydown', () => {
    const pool = getPool();

    answer.innerHTML = `${
        chars.map((x) => pool[x]).join('')
    } &nbsp; ${chars.join('')}`;

    chars = choose(Object.keys(pool), length);
    current.innerHTML = chars.join('');
})

// Select Buttons
$('#select-all').on('click', function(){
    checkboxes.each(function(){this.checked = true});
});
$('#select-none').on('click', function(){
    checkboxes.each(function(){this.checked = false});
});

// Manage Length
$('#length-plus').on('click', function() {
    length = Math.min(length+1, 9);
    $('#length-indicator').text(length);
}).on('keyup', function(evt){evt.preventDefault();});

$('#length-minus').on('click', function() {
    length = Math.max(length-1, 1);
    $('#length-indicator').text(length);
}).on('keyup', function(evt){evt.preventDefault();});

// Invert 
$('#invert').on('click', function(){
    inverted = !inverted;
    this.innerHTML = `${inverted ? 'Reading' : 'Hiragana'} Training`; 
}).on('keyup', function(evt){evt.preventDefault();});