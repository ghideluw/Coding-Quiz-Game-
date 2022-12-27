
const strtbtn = document.querySelector(".strtbtn button");
const rules = document.querySelector(".rules");
const exit_btn = document.querySelector(".quit");
const continue_btn = document.querySelector(".restart");
const quiz_box = document.querySelector(".quiz_box");
const options_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer_sec");
const timeLine = quiz_box.querySelector(".timer_line");


let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let widthValue = 0;
/* Add click event for start quiz button */

strtbtn.onclick = () => {
    rules.classList.add("activeInfo"); //sahow info box
}

/* Add click event for exit quiz button */

exit_btn.addEventListener('click', () => {
    document.getElementById("buttons").style.display = "none"
    que_numb = 1;
    document.getElementById('quiz_box').style.display = "block"

    // document.classList.remove("activeInfo"); //hide info box
})

/* Add click event for continue quiz button */

continue_btn.onclick = () => {
    rules.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);

}


const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = document.querySelector(".restart");
const quit_quiz = document.querySelector(".quit");

//add click event for next button//
next_btn.addEventListener('click', () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "block";
    } else {
        console.log("Questions completed");
        showResultBox();
    }

})



//getting questions and options from array//
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    //  fetch('./questions.json').then(response => response.json()).then(data => {
    //     console.log(data);
    //  })
    console.log(questions);
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + ' <span></span></div>';
    que_text.innerHTML = que_tag;
    options_list.innerHTML = option_tag;
    const option = options_list.querySelectorAll(".option");
    for (let i = 0; i < options_list.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");

    }
}

let tickIcon = '<div class= "icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class= "icon cross"><i class="fas fa-times"></i></div>';



function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickIcon)
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon)
    }

    //if answer is incorrect then automatically select the correct answer//

    for (i = 0; i < allOptions; i++) {
        if (options_list.children[i].textContent == correctAns) {
            option_list.children[i].setAttribute("class", "option correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
        }
    }



    //once user selected disable all options
    for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}
function showResultBox() {
    // info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.remove("activeQuiz"); //hide the quiz box
    result_box.classList.add("activeResult"); //show the result box
}


function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
        }

    }


}

function startTimerLine(time) {
    counterLine = setInterval(timer, 1000);
    function timer() {
        time += 1;
        timeLine.style.width = time + "sec";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}



function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + que_count + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}


function renderGames() {
    for (var i = 0; i < games.length; i++) {
        console.log(games[i]);
        var highScore = document.createElement("li");
        highScore.textContent = games[i].initials + " " + games[i].score;
        highscores.append(highScore);
    }
    console.log(games.length);

}

function storeGames() {
    console.log(games);
    localStorage.setItem("games", JSON.stringify(games));
}
function init() {
    var storeGames = JSON.parse(localStorage.getItem("games"));
    if (storeGames !== null) {
        games = storeGames;
    }
}

init();



