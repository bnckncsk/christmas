/**
 * @type {{what:string, who1:string, muszak1:string, who2?:string, muszak2?:string}}
 */
const arr = [
    {
        what: "Logisztika",
        who1: "Kovács Máté",
        muszak1: "Délelöttös",
        who2: "Kovács József",
        muszak2: "Délutános"
    },
    {
        what: "Könyvelés",
        who1: "Szabó Anna",
        muszak1: "Éjszakai"
    },
    {
        what: "Játékfejlesztés",
        who1: "Varga Péter",
        muszak1: "Délutános",
        who2: "Nagy Eszter",
        muszak2: "Éjszakai"
    }
];



// JS section + a táblázat létrehozása

const jsSection = document.createElement('div');
jsSection.id = 'jssection';
jsSection.classList.add('hide');
document.body.appendChild(jsSection);

const table = document.createElement('table');
jsSection.appendChild(table);

const thead = document.createElement('thead');
table.appendChild(thead);

const header = document.createElement('tr');
thead.appendChild(header);

const headerList = ["Osztály", "Manó"  ,"Műszak"];
for (let x of headerList){
    const th = document.createElement('th');
    th.innerText = x;
    header.appendChild(th);
}

const jsTbody = document.createElement('tbody');
table.appendChild(jsTbody);
jsTbody.id = 'jsTbody';


initSelect(arr);        // elkészíti a dropdown menüt
renderTbody(arr);       // kirednereli a táblázatot



// form létrehozása

const jsForm = document.createElement('form');
jsSection.appendChild(jsForm);
jsForm.id = 'jsform';


jsForm.appendChild(createInput('osztaly', 'Osztály'));
jsForm.appendChild(createInput('mano1', 'Manó 1'));

jsForm.appendChild(createDropdownList('muszak1', 'Műszak 1', ['Délelőttös', 'Délutános', 'Éjszakai']));

jsForm.appendChild(createCheckbox('masodikmano', 'Két manót veszek fel'));
jsForm.appendChild(createInput('mano2', 'Manó 2'));

jsForm.appendChild(createDropdownList('muszak2', 'Műszak 2', ['Délelőttös', 'Délutános', 'Éjszakai']));

const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.innerText = 'Hozzáadás';
jsForm.appendChild(submitButton);

const checkBox = jsForm.querySelector('#masodikmano');
initCheckbox(checkBox);



// JS form eventlistener

jsForm.addEventListener('submit', function(e) {
    e.preventDefault();

    /**
     * @type {HTMLFormElement}
     */
    const form = e.target;

    /**
     * @type {HTMLInputElement}
     */
    const osztaly = form.querySelector('#osztaly');
    /**
     * @type {HTMLInputElement}
     */
    const mano1 = form.querySelector('#mano1');
    /**
     * @type {HTMLSelectElement}
     */
    const muszak1 = form.querySelector('#muszak1');
    /**
     * @type {HTMLInputElement}
     */
    const mano2 = form.querySelector('#mano2');
    /**
     * @type {HTMLSelectElement}
     */
    const muszak2 = form.querySelector('#muszak2');


    /**
     * @type {string}
     */
    const osztalyValue = osztaly.value;
    /**
     * @type {string}
     */
    const mano1Value = mano1.value;
    /**
     * @type {string}
     */
    const muszak1Value = muszak1.value;
    /**
     * @type {string}
     */
    const mano2Value = mano2.value;
    /**
     * @type {string}
     */
    const muszak2Value = muszak2.value;


    /**
     * @type {{what:string, who1:string, muszak1:string, who2?:string, muszak2?:string}}
     */
    const obj = {};
    if (!validateFields(osztaly, mano1, muszak1)) {
        return;
    }


    obj.what = osztalyValue;
    obj.who1 = mano1Value;
    obj.muszak1 = muszak1Value;

    if (mano2Value !== "" && muszak2Value !== "") {
       obj.who2 = mano2Value;
       obj.muszak2 = muszak2Value;
    }

    createNewElement(obj, form, arr);
});



// htmlForm event listener
const htmlForm = document.getElementById('htmlform');
htmlForm.addEventListener('submit', function(e) {
    e.preventDefault();

    /**
     * @type {HTMLFormElement}
     */
    const form = e.target;
    
    /**
     * @type {HTMLSelectElement}
     */
    const manoChooser = form.querySelector('#manochooser');

    /**
     * @type {HTMLInputElement}
     */
    const manotev1 = form.querySelector('#manotev1');

    /**
     * @type {HTMLSelectElement}
     */
    const manotev2 = form.querySelector('#manotev2');


    /**
     * @type {string}
     */
    const manoChooserVal = manoChooser.value;

    /**
     * @type {string}
     */
    const manotev1Val = manotev1.value;

    /**
     * @type {string}
     */
    const manotev2Val = manotev2.value;


    /**
     * @type {{who:string, task1:string, task2?:string}}
     */
    const obj = {};
    if (!validateFields(manoChooser, manotev1, manotev1)) {
        return;
    }

    obj.who = manoChooserVal;
    obj.task1 = manotev1Val;
    if (manotev2Val !== "") {
        obj.task2 = manotev2Val;
    }


    const tbody = document.getElementById('htmltbody');
    const tr = document.createElement('tr');
    tbody.appendChild(tr);

    const td1 = document.createElement('td');
    td1.innerText = obj.who;
    tr.appendChild(td1);

    const td2 = document.createElement('td');
    td2.innerText = obj.task1;
    tr.appendChild(td2);

    if (obj.task2) {
        const td3 = document.createElement('td');
        td3.innerText = obj.task2;
        tr.appendChild(td3);
    } else {
        td2.colSpan = 2;
    }

    form.reset();
});




// ---------- functionok ----------

/**
 * kirendereli a tbody tartalmát
 * @param {{what:string, who1:string, muszak1:string, who2?:string, muszak2?:string}} arr 
 */
function renderTbody(arr) {
    const tBody = document.getElementById('jsTbody');
    tBody.innerHTML = '';

    for (let row of arr){
        const tr = document.createElement('tr');
        tBody.appendChild(tr);

        const td1 = document.createElement('td');
        td1.innerText = row.what;
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerText = row.who1;
        tr.appendChild(td2);

        const td3 = document.createElement('td');
        td3.innerText = row.muszak1;
        tr.appendChild(td3);

        if (row.who2 && row.muszak2){
            td1.rowSpan = 2; 
            const tr2 = document.createElement('tr');
            tBody.appendChild(tr2);

            const td4 = document.createElement('td');
            td4.innerText = row.who2;
            tr2.appendChild(td4);

            const td5 = document.createElement('td');
            td5.innerText = row.muszak2;
            tr2.appendChild(td5);
        }
    }
}


/**
 * létrehoz egy text input elemet
 * @param {string} id 
 * @param {string} labelContent 
 * @returns {HTMLDivElement}
 */
function createInput(id, labelContent) {
    const div = document.createElement('div');

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = labelContent;
    div.appendChild(label);

    const input = document.createElement('input');
    input.id = id;
    input.type = 'text';
    div.appendChild(input);

    const error = document.createElement('span');
    error.classList.add('error');
    div.appendChild(error);

    return div;
}


/**
 * létrehoz egy checkboxot
 * @param {string} id 
 * @param {string} labelContent 
 * @returns {HTMLDivElement}
 */
function createCheckbox(id, labelContent) {
    const div = document.createElement('div');

    const input = document.createElement('input');
    input.id = id;
    input.type = 'checkbox';
    div.appendChild(input);

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = labelContent;
    div.appendChild(label);

    return div;
}


/**
 * létrehozza a lenyílő menüt
 * @param {string} id 
 * @param {string} labelContent 
 * @param {string[]} options 
 * @returns {HTMLDivElement}
 */
function createDropdownList(id, labelContent, options) {
    const div = document.createElement('div');

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = labelContent;
    div.appendChild(label);

    const dropdownList = document.createElement('select');
    dropdownList.id = id;
    div.appendChild(dropdownList);

    const error = document.createElement('span');
    error.classList.add('error');
    div.appendChild(error);

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.innerText = "Válassz műszakot!";
    dropdownList.appendChild(defaultOption);

    for (let x of options) {
        const opcio = document.createElement('option');
        opcio.value = x;
        opcio.innerText = x;
        dropdownList.appendChild(opcio);
    }

    return div;
}


/**
 * validálja a kötelező mezőket, hogy nem üresek-e
 * @param {HTMLInputElement} input1 
 * @param {HTMLInputElement} input2 
 * @param {HTMLInputElement} input3 
 * @returns {boolean}
 */
function validateFields(input1, input2, input3) {
    const form = input1.parentElement.parentElement;

    const errors = form.querySelectorAll(".error");
    for (const error of errors) {
        error.innerText = "";
    }

    let valid = true;

    if (!validateField(input1)) {
        valid = false;
    }

    if (!validateField(input2)) {
        valid = false;
    }

    if (!validateField(input3)) {
        valid = false;
    }

    return valid;
}


/**
 * külön függvény egyetlen mező validálására
 * @param {HTMLInputElement} input 
 * @returns {boolean}
 */
function validateField(input) {
    let valid = true;

    if (input.value == "") {
        const div = input.parentElement;
        const message = div.querySelector('.error');
        message.innerText = "Mező kitöltése kötelező!";
        valid = false;
    }

    return valid;
}