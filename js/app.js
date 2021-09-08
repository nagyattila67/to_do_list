import { calcFullTime } from "./calculator.js"
import { calcRestTime } from "./calculator.js"
import { calcProgress } from "./calculator.js"

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

export const makeTable = function (onlyNewRow = false) {
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
    <td>
    ${index + 1}.
    </td>
    <td>
    <label for="inp${index}"
    >
    <span class=${value.isDone == true ? "line-through" : "red"}>${value.activity}</span>
    </label>
    </td>
    <td>
    <span class=${value.isDone == true ? "line-through" : "red"}>${value.duration} perc</span>
    </td>
    <td style="text-align:center">
    <span class=${value.isDone == true ? "line-through" : "red"}>${value.difficulty}</span>
    </td>
   
    <td>
    <button type="button" class="del-button">töröl</button>
    </td>
    </tr>
    
    `
        };
    })

    let myCheckbox = document.querySelectorAll(".my-checkbox");
    // myCheckbox.forEach(value => {
    //     value.addEventListener("input", function () {
    //         let number = this.id.split("p")[1];
    //         myActivities[number].isDone = this.checked == true ? true : false;
    //         isDone[number] = this.checked == true ? true : false;

    //         makeTable();
    //         const restTime = calcRestTime(duration, isDone, myActivities);
    //         showRestTime(restTime);
    //     })
    // })

    //egyszerűbb így és akkor id-t sem kell definiálni; function helyett arrow function,
    //ahol a this a global objectre mutatna

    myCheckbox.forEach((value, index) => {
        value.addEventListener("change", () => {
            myActivities[index].isDone = value.checked == true ? true : false;
            isDone[index] = value.checked == true ? true : false;



            // ez itt lusta megoldás, mert újratölti a teljes táblázatot
            makeTable();
            showProgress();
            showTimes();
        })
    })

    let myButtons = document.querySelectorAll(".del-button");
    myButtons.forEach((value, index) => {
        value.addEventListener("click", () => {
            activity.splice(index, 1);
            duration.splice(index, 1);
            difficulty.splice(index, 1);
            isDone.splice(index, 1);
            myActivities.splice(index, 1);
            let area = document.querySelector("#todo-tbody");
            let sector = document.querySelector("#todo-tbody").children[index];
            area.removeChild(sector)
            for (let i = index; i <activity.length; i++) {
                area.children[i].children[1].innerHTML=i+1
            }
            showTimes();
            showProgress();
        })
    })
}

function showTimes() {
    const fullTime = calcFullTime(duration);
    const total = document.querySelector("#total");
    const showFullTime = function (fullTime) { total.innerHTML = `${fullTime} perc` };
    showFullTime(fullTime);
    const restTime = calcRestTime(duration, isDone, myActivities);
    const restTimePlace = document.querySelector("#rest");
    function showRestTime(restTime) { restTimePlace.innerHTML = `${restTime} perc` }
    showRestTime(restTime);
}
showTimes();

const myButton = document.querySelector("#newActivityButton");
myButton.addEventListener("click", function () {
    activity.push(document.querySelector("#newActivity").value)
    duration.push(parseInt(document.querySelector("#newDuration").value))
    difficulty.push(parseInt(document.querySelector("#newDifficulty").value))
    isDone.push(false);
    let index = activity.length - 1;

    let newActivity = {
        activity: activity[index],
        duration: duration[index],
        difficulty: difficulty[index],
        isDone: false
    }

    myActivities.push(newActivity);

    //createActivities();
    makeTable(true);
    showTimes();
    noRepeat = false;
    orderNow = "";
    showProgress();
})

function calcMaxDifficulty() {
    let maxDifficulties = 0;
    difficulty.forEach((value) => {
        if (value > maxDifficulties) { maxDifficulties = value }
    });
    return maxDifficulties;
}


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
    increaseFunction_Main();
    makeTable();
};
function decreaseFunction() {
    decreaseFunction_Main();
    makeTable();
};

// function increaseFunction() {
//     if (orderNow != increase) {
//         if (noRepeat == false) {
//             increaseFunction_Main();
//         }
//         else {
//             decreaseFunction_Main();
//         }
//         orderNow = increase;
//         noRepeat = true;
//         showNewOrder();
//     }
// }

// function decreaseFunction() {
//     if (orderNow != decrease) {
//         if (noRepeat == false) {
//             increaseFunction_Main();
//             decreaseFunction_Main();
//         }
//         else {
//             decreaseFunction_Main();
//         }
//         orderNow = decrease;
//         noRepeat = true;
//         showNewOrder();
//     }
// }

// function increaseFunction_Main() {
//     activity_new = Array();
//     duration_new = Array();
//     difficulty_new = Array();
//     isDone_new = Array();
//     let maxDifficulties = calcMaxDifficulty();
//     for (let i = 0; i < maxDifficulties + 1; i++) {
//         let goForward = false;
//         while (goForward == false) {
//             let myIndex = difficulty.indexOf(i);
//             if (myIndex != -1) {
//                 difficulty_new.push(difficulty[myIndex]);
//                 difficulty.splice(myIndex, 1);

//                 duration_new.push(duration[myIndex]);
//                 duration.splice(myIndex, 1);

//                 activity_new.push(activity[myIndex]);
//                 activity.splice(myIndex, 1);

//                 isDone_new.push(isDone[myIndex]);
//                 isDone.splice(myIndex, 1);
//             }
//             else {
//                 goForward = true;
//             }
//         }
//     }
//     difficulty = difficulty_new.slice(0);
//     duration = duration_new.slice(0);
//     activity = activity_new.slice(0);
//     isDone = isDone_new.slice(0);
// }

//ugyanez a fgv rövidebben sort() metódussal

function increaseFunction_Main() {
    myActivities.sort((v1, v2) => {
        if (v1.difficulty < v2.difficulty) { return -1 }
        if (v1.difficulty == v2.difficulty) { return 0 }
        if (v1.difficulty > v2.difficulty) { return 1 }
    })
    activity = myActivities.map(value => value.activity)
    duration = myActivities.map(value => value.duration)
    difficulty = myActivities.map(value => value.difficulty)
    isDone = myActivities.map(value => value.isDone)
}

// function decreaseFunction_Main() {
//     activity_new = Array();
//     duration_new = Array();
//     difficulty_new = Array();
//     isDone_new = Array();
//     for (let i = 0; i < activity.length; i++) {
//         difficulty_new[i] = difficulty[difficulty.length - i - 1];
//         duration_new[i] = duration[duration.length - i - 1];
//         activity_new[i] = activity[activity.length - i - 1];
//         isDone_new[i] = isDone[isDone.length - i - 1];
//     }
//     difficulty = difficulty_new.slice(0);
//     duration = duration_new.slice(0);
//     activity = activity_new.slice(0);
//     isDone = isDone_new.slice(0);
// }

//ugyanez még rövidebben ternary-k egymásba ágyazásával

function decreaseFunction_Main() {
    myActivities.sort((v1, v2) =>
        v1.difficulty < v2.difficulty ? 1 : (v1.difficulty > v2.difficulty ? -1 : 0)
    )
    activity = myActivities.map(value => value.activity)
    duration = myActivities.map(value => value.duration)
    difficulty = myActivities.map(value => value.difficulty)
    isDone = myActivities.map(value => value.isDone)
}

function showNewOrder() {
    createActivities();
    makeTable();
}

const progress = document.querySelector("#progress");
function showProgress() {
    progress.textContent = `${calcProgress(isDone)} %`
}
showProgress();

