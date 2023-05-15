const loginName = document.querySelector(".user-name");
loginName.innerText = localStorage.getItem("loggedUser");

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const weeks = document.querySelector("#weeks");

    weeks.addEventListener("change", function () {
        if (weeks.value > 52 || weeks.length > 2) {
            alert("Liczba tygodni nie może być większa od 52");
            weeks.value = "";
        }
        return
    });

    const addNewPlanButton = document.querySelector(".plan-list-button");
    addNewPlanButton.addEventListener("click", function () {
        document.querySelector(".plan-list").classList.add("d-none")
        document.querySelector(".newPlan").classList.remove("d-none")
    })

    const planTitle = document.querySelector("#planName");
    const planDescription = document.querySelector("#planDescription");
    const weeksNumber = document.querySelector("#weeks");


    const mondayPlan = document.querySelector(".newPlan-table").querySelectorAll(".monday")
    const tuesdayPlan = document.querySelector(".newPlan-table").querySelectorAll(".tuesday")
    const wednesdayPlan = document.querySelector(".newPlan-table").querySelectorAll(".wednesday")
    const thursdayPlan = document.querySelector(".newPlan-table").querySelectorAll(".thursday")
    const fridayPlan = document.querySelector(".newPlan-table").querySelectorAll(".friday")
    const saturdayPlan = document.querySelector(".newPlan-table").querySelectorAll(".saturday")
    const sundayPlan = document.querySelector(".newPlan-table").querySelectorAll(".sunday")

    const planTableAdd = document.querySelector(".plan-table");

    function Schedule(id, weekNumber, title, description) {
        this.id = id; // id przepisu
        this.title = title; // nazwa planu
        this.description = description; // opis planu
        this.weekNumber = weekNumber; // numer tygodnia do którego przypisany jest plan
        this.monday = []; // plan na poniedzialek
        this.tuesday = []; // plan na wtorek
        this.wednesday = []; // plan na środę
        this.thursday = []; // plan na czwartek
        this.friday = []; // plan na piątek
        this.saturday = []; // plan na sobotę
        this.sunday = []; // plan na niedzielę	
    }

    // Metoda `.saveToLocalStorage()` 
    // zapisująca do localStorage informacje o przepisie
    Schedule.prototype.saveToLocalStorage = function (el) {
        const addingPlan = JSON.parse(localStorage.allPlans);
        console.log(addingPlan);
        addingPlan.push(el);
        console.log(addingPlan);
        localStorage.setItem("allPlans", JSON.stringify(addingPlan))
        this.printOnList(el);
    }

    Schedule.prototype.printOnList = function (el) {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${el.id}.</td><td>${el.title}</td><td>${el.description}</td><td>${el.weekNumber}</td><td><i class="fas fa-pencil-alt iconEdit-plan"><i class="far fa-trash-alt iconTrash-plan"></td>`;
        planTableAdd.appendChild(newRow);

    }

    window.addEventListener("load", (event) => {
        if (!localStorage.allPlans) {
            localStorage.setItem("allPlans", JSON.stringify([]))
        }
        console.log("reload");
        const planListFromLocal = JSON.parse(localStorage.allPlans);
        planListFromLocal.forEach((el, i) => {
            let newRow = document.createElement("tr");
            newRow.innerHTML = `<td>${[i + 1]}.</td><td>${el.title}</td><td>${el.description}</td><td>${el.weekNumber}</td><td><i class="fas fa-pencil-alt iconEdit-plan"><i class="far fa-trash-alt iconTrash-plan"></td>`;
            planTableAdd.appendChild(newRow);
        })

        const editPlanIcons = document.querySelectorAll(".iconEdit-plan");
        editPlanIcons.forEach((el, i) => {
            el.addEventListener("click", (event) => {
                // console.log(event.target.parentElement.parentElement.children)
                // console.log(event.target.parentElement.parentElement)
                const row = event.target.parentElement.parentElement;
                document.querySelector("#edit-name").addEventListener("change", () => {
                    console.log("dupa zbita")
                });
                document.querySelector("#edit-name").value = row.children[1].innerText;
                document.querySelector("#plan-description").value = row.children[2].innerText;
                document.querySelector("#edit-weeks").value = row.children[3].innerText;

                document.querySelector(".plan-list").classList.add("d-none")
                document.querySelector(".edit-plan").classList.remove("d-none")

                const localPlans = JSON.parse(localStorage.allPlans);
                localPlans.forEach((el, i) => {
                    // console.log(document.querySelector("#edit-name").value, el.title)
                    if (document.querySelector("#edit-name").value === el.title) {
                        // console.log(i)
                        const edit = i
                        localStorage.setItem("editingNow", edit)
                    }

                })

            })
        })


        const trashPlan = document.querySelectorAll(".iconTrash-plan");
        trashPlan.forEach((el, i) => {
            el.addEventListener("click", (event) => {
                const toDelete = event.target.parentElement.parentElement.parentElement;
                console.log(toDelete)
                const out = prompt("Chcesz usunąć plan? Y/N");
                if (out === "Y" || out === "y") {
                    const list = JSON.parse(localStorage.allPlans);
                    console.log(list);
                    list.splice(i, 1);
                    toDelete.parentElement.removeChild(toDelete);
                    localStorage.setItem("allPlans", JSON.stringify(list))
                    console.log(list);

                    window.location.reload()

                    // console.log(planListFromLocal)
                } else {
                    return
                }
            })
        })

    })
    // ZAMYKANIE EDYCJI
    const editPlanButton = document.querySelector(".edit-button");
    editPlanButton.addEventListener("click", () => {
        // console.log(event)console.log(event.target.parentElement.parentElement.children)

        document.querySelector(".plan-list").classList.remove("d-none")
        document.querySelector(".edit-plan").classList.add("d-none")
    })

    const planCloseButton = document.querySelector(".newPlan-button");
    planCloseButton.addEventListener("click", storePlan);

    function storePlan() {
        const local = JSON.parse(localStorage.allPlans)

        // WERYFIKACJA pustych inputów
        if (weeksNumber.value === "" || planTitle.value === "" || planDescription.value === "") {
            alert("Wypełnij wszystkie pola")
            return
        }

        // WERYFIKACJA nazwy
        const names = []
        local.forEach((el) => {
            names.push(el.title)
        })

        if (names.includes(planTitle.value)) {
            alert("Plan o takiej nazwie istnieje, zmień nazwę planu")
            return
        }

        const plan = new Schedule(local.length + 1, weeksNumber.value, planTitle.value, planDescription.value);
        
        mondayPlan.forEach(el => plan.monday.push(el.value))
        tuesdayPlan.forEach(el => plan.tuesday.push(el.value))
        wednesdayPlan.forEach(el => plan.wednesday.push(el.value))
        thursdayPlan.forEach(el => plan.thursday.push(el.value))
        fridayPlan.forEach(el => plan.friday.push(el.value))
        saturdayPlan.forEach(el => plan.saturday.push(el.value))
        sundayPlan.forEach(el => plan.sunday.push(el.value))

        document.querySelector(".plan-list").classList.remove("d-none")
        document.querySelector(".newPlan").classList.add("d-none")

        plan.saveToLocalStorage(plan);
        window.location.reload()

    }

    // localStorage.clear()
    console.log(localStorage)

});