// =====================================
// String Art Assistant V1
// Engine
// =====================================

let sequence = [];
let currentStep = 0;

const fileInput = document.getElementById("fileInput");
const fromPin = document.getElementById("fromPin");
const toPin = document.getElementById("toPin");
const step = document.getElementById("step");
const progressBar = document.getElementById("progressBar");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

// ===============================
// Load file
// ===============================

fileInput.addEventListener("change", loadFile);

function loadFile(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        parseSequence(event.target.result);

    };

    reader.readAsText(file);

}

// ===============================
// Parse
// ===============================

function parseSequence(text){

    sequence = text
        .replace(/\n/g,",")
        .split(",")
        .map(v=>parseInt(v.trim()))
        .filter(v=>!isNaN(v));

    currentStep = 0;

    restoreProgress();

    render();

}

// ===============================
// Render
// ===============================

function render(){

    if(sequence.length<2){

        fromPin.innerHTML="--";
        toPin.innerHTML="--";
        step.innerHTML="0 / 0";

        progressBar.style.width="0%";

        return;

    }

    const total = sequence.length/2;

    if(currentStep<0)
        currentStep=0;

    if(currentStep>=total)
        currentStep=total-1;

    const i=currentStep*2;

    fromPin.innerHTML=sequence[i];

    toPin.innerHTML=sequence[i+1];

    step.innerHTML=(currentStep+1)+" / "+total;

    progressBar.style.width=
        ((currentStep+1)/total*100)+"%";

    saveProgress();

}

// ===============================
// Save
// ===============================

function saveProgress(){

    localStorage.setItem(
        "stringart_step",
        currentStep
    );

}

function restoreProgress(){

    let s=parseInt(
        localStorage.getItem(
            "stringart_step"
        )
    );

    if(!isNaN(s))
        currentStep=s;

}
