// ==========================
// String Art Assistant v1.0
// ==========================

let pins = [];
let current = 0;

// ===== Lấy phần tử =====

const fileInput = document.getElementById("fileInput");
const fromPin = document.getElementById("fromPin");
const toPin = document.getElementById("toPin");
const step = document.getElementById("step");
const progressBar = document.getElementById("progressBar");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

// ==========================
// Đọc file
// ==========================

fileInput.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        let txt = event.target.result;

        pins = txt
            .split(",")
            .map(x=>parseInt(x.trim()))
            .filter(x=>!isNaN(x));

        current = 0;

        showStep();

    };

    reader.readAsText(file);

});

// ==========================
// Hiển thị
// ==========================

function showStep(){

    if(pins.length<2)
        return;

    let total = pins.length/2;

    if(current<0)
        current=0;

    if(current>=total)
        current=total-1;

    let i=current*2;

    fromPin.innerHTML=pins[i];
    toPin.innerHTML=pins[i+1];

    step.innerHTML=
        (current+1)
        +" / "+
        total;

    progressBar.style.width=
        (((current+1)/total)*100)
        +"%";

}
