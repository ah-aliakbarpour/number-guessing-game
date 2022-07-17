let randomNumber;
(generateRandomNumber = function (){
    // generate randomNumber between 1 and 100 (including 1 and 100)
    randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log("Random number:", randomNumber);
})();

const guessButton = document.getElementById("guessButton");
const playAgainButton = document.getElementById("playAgainButton");
const inputBox = document.getElementById("inputBox");
const timer = document.getElementById("timer");
const second = document.getElementById("second");
const minute = document.getElementById("minute");
const warnAboutInput = document.getElementById("warnAboutInput");
const chances = document.getElementsByClassName("chances");
const result = document.getElementById("result");
const massage = document.getElementById("massage");
let timerChanger, remainingSeconds, userInputCounter = 0;

guessButton.addEventListener("click", startTimer);
guessButton.addEventListener("click", handleUserInput);

// set Enter key as click GuessButton
inputBox.onkeyup = function (event){
    event.preventDefault();
    if (event.key === "Enter")
        guessButton.click();
};

function startTimer(){
    guessButton.removeEventListener("click", startTimer);

    timer.style.color = "#04AA6D";
    timer.style.fontWeight = "bold";
    second.innerText = "30";
    minute.innerText = "00";
    remainingSeconds = 30;

    timerChanger = setInterval(function (){
        remainingSeconds -= 1;
        if(remainingSeconds === 0){
            second.innerText = "00";
            finish(false, true);
            return;
        }
        let remainingSecondsString = String(remainingSeconds);
        if(remainingSeconds < 20 && remainingSeconds >= 10)
            timer.style.color = "#d6620f";
        else if(remainingSeconds < 10){
            timer.style.color = "#d93030";
            remainingSecondsString = "0" + remainingSecondsString;
        }
        second.innerText = remainingSecondsString;
    }, 1000);
}

function handleUserInput(){
    let inputValue = Number(inputBox.value);
    inputBox.value = '';
    if(inputValue === 0){
        warnAboutInput.innerText = "Empty!";
        return;
    }
    if(inputValue < 1 || inputValue > 100){
        warnAboutInput.innerText = "Out of range!";
        return;
    }
    console.log("User input:", inputValue);
    userInputCounter += 1;
    let chance = chances[userInputCounter - 1]
    chance.style.backgroundColor = "#228ce2";
    chance.style.fontSize = "5px";
    if(inputValue === randomNumber){
        finish(true)
        return;
    }
    if (userInputCounter === 6){
        finish(false);
        return;
    }
    let nextChance = chances[userInputCounter]
    nextChance.style.backgroundColor = "rgba(34,140,226,0.3)";
    nextChance.style.fontSize = "8px";
    if(inputValue > randomNumber)
        warnAboutInput.innerText = "Too high!";
    else
        warnAboutInput.innerText = "Too low!";
}

function finish(win, timeOut = false){
    clearInterval(timerChanger);

    warnAboutInput.innerText = '';
    inputBox.value = '';

    if (win){
        result.style.color = "#04AA6D";
        result.innerText = "You won!";
        massage.innerText = "Well done!";
    }
    else {
        result.style.color = "#d93030";
        if (timeOut)
            result.innerText = "Time out!";
        else
            result.innerText = "You lost!";
        massage.innerText = "The number was " + String(randomNumber) + "!";
    }
    result.style.visibility = "visible";
    massage.style.visibility = "visible";
    inputBox.disabled = true;
    guessButton.style.visibility = "hidden";
    playAgainButton.style.visibility = "visible";
}

playAgainButton.onclick = function playAgain(){
    window.location.reload();
};
