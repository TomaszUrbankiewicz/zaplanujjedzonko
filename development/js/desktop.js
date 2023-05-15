//widgety
const newRecipe = document.querySelector(".widget-recipe");
const newSchedule = document.querySelector(".widget-schedule");

const infoRecipes = document.querySelector(".info-recipe p");
const infoSchedule = document.querySelector(".info-shedule");
const infoPlan = document.querySelector(".info-plan p");

const widgetClosing = document.querySelectorAll(".widget-close");
//tabela
const tableHeader = document.querySelector(".shedule-table-header");
const mondayMeals = document.querySelectorAll(".monday-meal");
const tuesdayMeals = document.querySelectorAll(".tuesday-meal");
const wednesdayMeals = document.querySelectorAll(".wednesday-meal");
const thursdayMeals = document.querySelectorAll(".thursday-meal");
const fridayMeals = document.querySelectorAll(".friday-meal");
const saturdayMeals = document.querySelectorAll(".saturday-meal");
const sundayMeals = document.querySelectorAll(".sunday-meal");

const prevButton = document.querySelector(".schedule-prev");
const nextButton = document.querySelector(".schedule-next");

//localstorage
const allPlans = JSON.parse(localStorage.allPlans);


infoRecipes.innerText = allPlans.length === 0 ? `Nie masz jeszcze żadnego planu :(` : `Masz już ${allPlans.length} przepisów, nieźle`;
infoSchedule.style.display = allPlans.length !== 0 ? infoSchedule.style.display = "none" : infoSchedule.style.display = "flex";

//widgety
widgetClosing.forEach(el => {
    el.addEventListener("click", closeWidget)
});

function closeWidget(event) {
    event.target.parentElement.style.display = "none";
}

//nowy plan, nowy przepis

newRecipe.addEventListener("click", openNewRecipe);
newSchedule.addEventListener("click", openNewSchedule);

function openNewRecipe() {
    location.assign("recipes.html")
}

function openNewSchedule() {
    location.assign("schedules.html")
}

//weeks of the year
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

//actual schedule display
const date = new Date;

tableHeader.innerText = `Twój plan na ${date.getWeek()} tydzień:`;

function weekOfTheYear(schedule) {
    return schedule.weekNumber === JSON.stringify(date.getWeek());
}

const actualSchedule = allPlans.find(weekOfTheYear);


function compareNumbers(a, b) {
    return a.weekNumber - b.weekNumber
}

allPlans.sort(compareNumbers)


// main function displaying schedules
let scheduleIndex = 0

function weekToCheck(){
    const weekArray = [];
    const numberToFind = date.getWeek();
    let filteredWeekArray
    let index
    for(let i=0; i<allPlans.length; i++) {
        weekArray.push(+allPlans[i].weekNumber);
    }
    if(weekArray.includes(numberToFind)){
        displayActualSchedule()
    }
    else {
        filteredWeekArray = weekArray.filter(el => {
            return el > numberToFind
        });
        const closestWeekToDisplay = filteredWeekArray[0]
        index = weekArray.indexOf(closestWeekToDisplay)
        tableHeader.innerText = `Twój plan na ${closestWeekToDisplay} tydzień:`;
        scheduleIndex = allPlans.indexOf(allPlans[index])
        displayClosestWeekSchedule(allPlans[index])
    }
}

weekToCheck()


function displayActualSchedule() {
    for(let i=0; i<actualSchedule.monday.length; i++) {
        mondayMeals[i].innerText = actualSchedule.monday[i];
        tuesdayMeals[i].innerText = actualSchedule.tuesday[i];
        wednesdayMeals[i].innerText = actualSchedule.wednesday[i];
        thursdayMeals[i].innerText = actualSchedule.thursday[i];
        fridayMeals[i].innerText = actualSchedule.friday[i];
        saturdayMeals[i].innerText = actualSchedule.saturday[i];
        sundayMeals[i].innerText = actualSchedule.sunday[i];
    }
}

function displayClosestWeekSchedule(week) {
    for(let i=0; i<week.monday.length; i++) {
        mondayMeals[i].innerText = week.monday[i];
        tuesdayMeals[i].innerText = week.tuesday[i];
        wednesdayMeals[i].innerText = week.wednesday[i];
        thursdayMeals[i].innerText = week.thursday[i];
        fridayMeals[i].innerText = week.friday[i];
        saturdayMeals[i].innerText = week.saturday[i];
        sundayMeals[i].innerText = week.sunday[i];
    }
}

// buttons action

prevButton.addEventListener("click", prevSchedule);
nextButton.addEventListener("click", nextSchedule);


function prevSchedule() {
        displayClosestWeekSchedule(allPlans[scheduleIndex - 1]);
        tableHeader.innerText = `Twój plan na ${allPlans[scheduleIndex - 1].weekNumber} tydzień:`;
        scheduleIndex --
}

function nextSchedule() {
        displayClosestWeekSchedule(allPlans[scheduleIndex + 1]);
        tableHeader.innerText = `Twój plan na ${allPlans[scheduleIndex + 1].weekNumber} tydzień:`;
        scheduleIndex ++;
}