import { calcFullTime } from "./calculator.js"
import { calcRestTime } from "./calculator.js"

let activity = ["kimosni", "bevásárolni", "elmosogatni", "kitakarítani", "megbuktatni a kormányt", "füvet nyírni", "Lujzát felhívni", "megírni a házit", "Blökit sétálni vinni"]
let duration = [20, 40, 15, 60, 90, 50, 25, 90, 90];
let difficulty = [2, 2, 1, 1, 3, 2, 5, 4, 1];
let isDone = [true, true, false, false, false, false, false, false, false];
const myActivities = Array();

let createActivities = function () {
    activity.forEach((value, index) => {
        let myObject = Object();
        myObject.activity = value;
        myObject.duration = duration[index];
        myObject.difficulty = difficulty[index];
        myObject.isDone = isDone[index];

        myActivities[index] = myObject;
    })
}
createActivities();


let container = document.querySelector("#todo-tbody");

const makeTable = function (onlyNewRow = false) {
    if (onlyNewRow == false) { container.innerHTML = "" };

    myActivities.forEach((value, index) => {
        if (onlyNewRow == false || index == myActivities.length - 1) {
            container.innerHTML += `
    <tr>
    <td style="text-align:center">
    <input type="checkbox" id="inp${index}" class="my-checkbox"
    ${value.isDone == true ? "checked" : ""}
    >
    </td>
    <td
    style="color: ${value.isDone == true ? "" : "red"};
    text-decoration: ${value.isDone == true ? "line-through" : ""}
    ">
    <label for="inp${index}"
    >
    ${value.activity}
    </label>
    </td>
    <td
    style="color: ${value.isDone == true ? "" : "red"};
    text-decoration: ${value.isDone == true ? "line-through" : ""}
    ">
    ${value.duration} perc
    </td>
    <td
    style="text-align:center; color: ${value.isDone == true ? "" : "red"};
    text-decoration: ${value.isDone == true ? "line-through" : ""}
    "">
    ${value.difficulty}
    </tr>
    
    `
        };
    })

    let myCheckbox = document.querySelectorAll(".my-checkbox");
    myCheckbox.forEach(value => {
        value.addEventListener("input", function () {
            let number = this.id.split("p")[1];
            myActivities[number].isDone = this.checked == true ? true : false;
            isDone[number] = this.checked == true ? true : false;

            makeTable();
            const restTime = calcRestTime(duration, isDone, myActivities);
            showRestTime(restTime);
        })
    })
}

makeTable();



const fullTime = calcFullTime(duration);
const total = document.querySelector("#total");
const showFullTime = function (fullTime) { total.innerHTML = `${fullTime} perc` };
showFullTime(fullTime);
const restTime = calcRestTime(duration, isDone, myActivities);
const restTimePlace = document.querySelector("#rest");
function showRestTime(restTime) { restTimePlace.innerHTML = `${restTime} perc` }
showRestTime(restTime);

const myButton = document.querySelector("#newActivityButton");
myButton.addEventListener("click", function () {
    activity.push(document.querySelector("#newActivity").value)
    duration.push(parseInt(document.querySelector("#newDuration").value))
    difficulty.push(parseInt(document.querySelector("#newDifficulty").value))
    isDone.push(false)
    createActivities();
    makeTable(true);
    const fullTime = calcFullTime(duration);
    showFullTime(fullTime);
    const restTime_ = calcRestTime(duration, isDone, myActivities);
    showRestTime(restTime_);
    noRepeat = false;
    orderNow = "";
})

let maxDifficulties = 0;
difficulty.forEach((value) => {
    if (value > maxDifficulties) { maxDifficulties = value }
})

let activity_new = Array();
let duration_new = Array();
let difficulty_new = Array();
let isDone_new = Array();

const decreaseButton = document.querySelector("#decrease");
decreaseButton.addEventListener("click", decreaseFunction);

const increaseButton = document.querySelector("#increase");
increaseButton.addEventListener("click", increaseFunction);

let noRepeat = false;
let orderNow = "";

function increaseFunction() {
    if (orderNow != increase) {
        if (noRepeat == false) {
            increaseFunction_Main();
        }
        else {
            decreaseFunction_Main();
        }
        orderNow = increase;
        noRepeat = true;
        showNewOrder();
    }

}

function decreaseFunction() {
    if (orderNow != decrease) {
        if (noRepeat == false) {
            increaseFunction_Main();
            decreaseFunction_Main();
        }
        else {
            decreaseFunction_Main();
        }
        orderNow = decrease;
        noRepeat = true;
        showNewOrder();
    }

}

function increaseFunction_Main() {
    activity_new = Array();
    duration_new = Array();
    difficulty_new = Array();
    isDone_new = Array();
    for (let i = 0; i < maxDifficulties + 1; i++) {
        let goForward = false;
        while (goForward == false) {
            let myIndex = difficulty.indexOf(i);
            if (myIndex != -1) {
                difficulty_new.push(difficulty[myIndex]);
                difficulty.splice(myIndex, 1);

                duration_new.push(duration[myIndex]);
                duration.splice(myIndex, 1);

                activity_new.push(activity[myIndex]);
                activity.splice(myIndex, 1);

                isDone_new.push(isDone[myIndex]);
                isDone.splice(myIndex, 1);
            }
            else {
                goForward = true;
            }
        }
    }
    difficulty = difficulty_new.slice(0);
    duration = duration_new.slice(0);
    activity = activity_new.slice(0);
    isDone = isDone_new.slice(0);
}

function decreaseFunction_Main() {
    activity_new = Array();
    duration_new = Array();
    difficulty_new = Array();
    isDone_new = Array();
    for (let i = 0; i < activity.length; i++) {
        difficulty_new[i] = difficulty[difficulty.length - i - 1];
        duration_new[i] = duration[duration.length - i - 1];
        activity_new[i] = activity[activity.length - i - 1];
        isDone_new[i] = isDone[isDone.length - i - 1];
    }
    difficulty = difficulty_new.slice(0);
    duration = duration_new.slice(0);
    activity = activity_new.slice(0);
    isDone = isDone_new.slice(0);
}

function showNewOrder() {
    createActivities();
    makeTable();
}
