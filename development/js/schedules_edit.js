const tocloneTable = document.querySelector(".newPlan-table");
const cloneTable = tocloneTable.cloneNode(true);

const putCloneTable = document.querySelector(".cloneTable");
putCloneTable.appendChild(cloneTable);


const editPlanButton = document.querySelector(".edit-button");
editPlanButton.addEventListener("click", () =>{
    
    const localPlans = JSON.parse(localStorage.allPlans);
    // console.log(localPlans);
    const indexToEdit = Number(localStorage.getItem("editingNow"));
    // console.log(indexToEdit);
    localStorage.removeItem("allPlans");
    console.log(localPlans[indexToEdit].title, document.querySelector("#edit-name").value);

    localPlans[indexToEdit].title = document.querySelector("#edit-name").value;
    localPlans[indexToEdit].description = document.querySelector("#plan-description").value;
    localPlans[indexToEdit].weekNumber = document.querySelector("#edit-weeks").value;

    localStorage.setItem("allPlans", JSON.stringify(localPlans))
    
    
    // console.log(event)console.log(event.target.parentElement.parentElement.children)
    
    document.querySelector(".plan-list").classList.remove("d-none")
    document.querySelector(".edit-plan").classList.add("d-none")

    window.location.reload()
})


// const localPlans = JSON.parse(localStorage.allPlans);
//     const names = []
//         localPlans.forEach((el) => {
//             names.push(el.title)
//         })
//         if (names.includes(document.querySelector("#edit-name").value)) {
//             alert("Plan o takiej nazwie istnieje, zmień nazwę planu")
//         }
