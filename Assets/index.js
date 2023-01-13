//set up variables for use in the file
const strtbtn = document.querySelector(".strtbtn button");
const strtdiv = document.querySelector(".strtbtn");
const resultBox = document.querySelector(".result_box");
const rules = document.querySelector(".rules");
const exit_btn = document.querySelector(".quit");
const continue_btn = document.querySelector(".restart");
const quiz_box = document.querySelector(".quiz_box");
const options_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer_sec");
const timeLine = quiz_box.querySelector(".timer_line");

//set up question count variable and timer variable

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
    document.getElementById("buttons").style.display = "none";
    que_numb = 1;
    document.getElementById('quiz_box').style.display = "block";


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
let correctanswer = 0;

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

continue_btn.addEventListener('click', function (event) {

})


//getting questions and options from array//
function showQuestions(index) {
    document.querySelector(".que_text").innerHTML = ""
    const que_text = document.querySelector(".que_text");

    console.log(questions);
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '</div>'
        + '<div class="option">' + questions[index].options[1] + '</div>'
        + '<div class="option">' + questions[index].options[2] + '</div>'
        + '<div class="option">' + questions[index].options[3] + '</div>';
    que_text.innerHTML = que_tag;
    options_list.innerHTML = option_tag;
    const option = options_list.querySelectorAll(".option");
    console.log(options_list);
    for (let i = 0; i < questions[index].options.length; i++) {
        console.log(option[i]);
        option[i].addEventListener("click", function (event) {
            event.preventDefault();
            console.log(event.target.innerHTML);
            if (event.target.innerHTML === questions[index].answer) {

                correctanswer++;
            } else {
                timeValue--;
            }
        })

    }
}

var score = 0;
var questionIndex = 0;

var que_text = document.querySelector("#que_text");


// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    que_text.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in questions array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].options;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var option_button = document.createElement("button");
        option_button.textContent = newItem;
        question_text.appendChild(ulCreate);
        ulCreate.appendChild(option_button);
        option_button.addEventListener("click", compare);
    })
}

// Event to compare choices with answer
function compare(event) {
    var element = event.target;
    console.log(element);

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            console.log("Inside correct" + score);
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will display correct answer
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
}

function showResultBox() {

    quiz_box.classList.remove("activeQuiz"); //hide the quiz box
    result_box.classList.add("activeResult"); //show the result box
    let quitbtn = document.querySelector("#quit");
    let saveScoreBtn = document.querySelector('#savescore')
    let finalQuitBtn = document.querySelector('#finalQuit')
    let clear = document.querySelector("#clear");
    document.getElementById("final_score").innerHTML = correctanswer;
    document.getElementById("total_questions").innerHTML = questions.length
//add event listener to final quit button 
    finalQuitBtn.addEventListener('click', function (event) {
        console.log("quitquizbtn");
        event.preventDefault();
        que_count = 0;
        que_numb = 1;
        document.getElementById('finalPage').style.display = "none";
        strtdiv.style.display = "block";

    })


    
//add event listener to quit quiz button 
    quitbtn.addEventListener('click', function (event) {
        console.log("quitquizbtn");
        event.preventDefault();
        que_count = 0;
        que_numb = 1;
        resultBox.style.display = "none";
        strtdiv.style.display = "block";


    })
//add event listener to the save score button 
    saveScoreBtn.addEventListener('click', function (event) {
        event.preventDefault();
//store initials/ name in local storage
        let submitInitalsBtn = document.querySelector("#submit_initials");
       
        let finaObj = {
            name: submitInitalsBtn.value,
            score: correctanswer
        }
        let localStorageData = JSON.parse(localStorage.getItem('quiz_score'))
        if (localStorageData != null) {
            localStorageData.push(finaObj)
        } else {
            localStorageData = []
            localStorageData.push(finaObj)
        }
//access quiz score from local storage
        localStorage.setItem('quiz_score', JSON.stringify(localStorageData))

//call function to display final result
        showFinalPage()
    })
}
function showFinalPage() {
    resultBox.style.display = "none";
    strtdiv.style.display = "none";
    document.getElementById('finalPage').style.display = "block"

    let localStorageScore = JSON.parse(localStorage.getItem('quiz_score'))

//display data from local storage including name and score

    if (localStorageScore != null) {
        localStorageScore.reverse();
        let tableEl = document.createElement('table')
        let tr = document.createElement('tr')
        let th1 = document.createElement('th')
        th1.innerHTML = "Name"
        let th2 = document.createElement('th')
        th2.innerHTML = "Score"
        tr.appendChild(th1, th2)
        tableEl.append(tr)
        console.log(tableEl);
        let tablesize;
        if (localStorageScore.length > 5) {
            tablesize = 5

        } else {
            tablesize = localStorageScore.length;
        }
        for (let i = 0; i < tablesize; i++) {
            let tr = document.createElement('tr')
            let name_td = document.createElement('td')
            name_td.innerHTML = localStorageScore[i].name
            let score_td = document.createElement('td')
            score_td.innerHTML = localStorageScore[i].score

            tr.append(name_td, score_td)
            tableEl.append(tr)

        }
        console.log(tableEl);
        document.getElementById('resultTable').append(tableEl)
    }
}


//function to set the timer for the quiz and reset every question

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


//function to display the current question number 
function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + que_count + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}


