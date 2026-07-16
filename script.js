// ======================================
// String Art Viewer V1
// ======================================

// ===== Cấu hình =====

const SEQUENCE_FILE = "pin-sequence.txt";

let steps = [];
let currentStep = 0;


// ===== Lấy phần tử HTML =====

const stepText = document.getElementById("stepText");
const pinText = document.getElementById("pinText");
const progressBar = document.getElementById("progressBar");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");


// ===== Load pin sequence =====

async function loadSequence() {

    try {

        const response = await fetch(SEQUENCE_FILE);

        const text = await response.text();


        // bỏ khoảng trắng
        let numbers = text
            .replace(/\s/g, "")
            .split(",")
            .map(Number);


        // tạo cặp pin
        for(let i = 0; i < numbers.length - 1; i += 2){

            steps.push({
                from: numbers[i],
                to: numbers[i+1]
            });

        }


        console.log(
            "Đã load:",
            steps.length,
            "bước"
        );


        // khôi phục bước cũ

        let saved =
            localStorage.getItem(
                "stringArtStep"
            );


        if(saved !== null){

            currentStep = Number(saved);

        }


        updateDisplay();


    }
    catch(error){

        console.error(
            "Không đọc được pin sequence",
            error
        );

        if(pinText){
            pinText.innerHTML =
            "Lỗi đọc pin-sequence.txt";
        }

    }

}



// ===== Hiển thị =====

function updateDisplay(){

    if(steps.length === 0)
        return;


    if(currentStep < 0)
        currentStep = 0;


    if(currentStep >= steps.length)
        currentStep = steps.length - 1;



    let step =
        steps[currentStep];



    // text bước

    if(stepText){

        stepText.innerHTML =
        `Bước ${currentStep + 1} / ${steps.length}`;

    }



    // pin

    if(pinText){

        pinText.innerHTML =
        `${step.from} ↓ ${step.to}`;

    }



    // progress

    if(progressBar){

        let percent =
        ((currentStep + 1)
        /
        steps.length)
        * 100;


        progressBar.style.width =
        percent + "%";

    }



    // lưu

    localStorage.setItem(
        "stringArtStep",
        currentStep
    );


}



// ===== Next =====

function nextStep(){

    if(currentStep < steps.length - 1){

        currentStep++;

        updateDisplay();

    }

}



// ===== Back =====

function backStep(){

    if(currentStep > 0){

        currentStep--;

        updateDisplay();

    }

}



// ===== Button =====

if(nextBtn){

    nextBtn.addEventListener(
        "click",
        nextStep
    );

}


if(backBtn){

    backBtn.addEventListener(
        "click",
        backStep
    );

}



// ===== Chạm màn hình Next =====

document.addEventListener(
"click",
function(e){


    // tránh bấm nút bị chạy 2 lần

    if(
        e.target === nextBtn ||
        e.target === backBtn
    )
    return;


    nextStep();


});



// ===== Vuốt điện thoại =====

let touchStartX = 0;


document.addEventListener(
"touchstart",
function(e){

    touchStartX =
    e.changedTouches[0].screenX;

});



document.addEventListener(
"touchend",
function(e){

    let touchEndX =
    e.changedTouches[0].screenX;


    let distance =
    touchEndX - touchStartX;



    if(Math.abs(distance) < 50)
        return;



    // vuốt trái

    if(distance < 0){

        nextStep();

    }



    // vuốt phải

    else{

        backStep();

    }


});



// ===== Bắt đầu =====

loadSequence();
