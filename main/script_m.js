let todo = document.querySelector(".todo");
let columns = document.querySelectorAll(".column");
let newTask = document.getElementById("plus");

let user = localStorage.getItem('userID')


newTask.addEventListener("click", function (e) {
    e.preventDefault();
    let card = document.createElement("div");
    card.className = "newCard"
    card.contentEditable = true;
    card.draggable = true;
    card.innerText = "New Task"
    todo.append(card)
    dragAndDrop(card)
    deleteCard(card)
    instantEditSave(card)
    saveInStorage()
});


function instantEditSave(card) {
    card.addEventListener("input", () => {
        saveInStorage()
    })
}
function dragAndDrop(card) {
    card.addEventListener("dragstart", (e) => {
        card.classList.add("dragging")
        // console.log(card);

    })
    columns.forEach(col => {
        col.addEventListener("dragover", (e) => {
            e.preventDefault()
            const draggingTask = document.querySelector(".dragging");
            col.append(draggingTask);
        })
    });

    card.addEventListener("dragend", (e) => {
        // console.log(card.parentNode);
        card.classList.remove("dragging")
        saveInStorage()
    })
}
function deleteCard(card) {
    card.addEventListener("blur", () => {
        if (card.innerText == "") {
            card.remove()
        }
        saveInStorage()
    })
}
function saveInStorage() {
    let taskObj = {}
    columns.forEach(col => {
        col.querySelectorAll(".newCard").forEach(card => {
            if (col.classList.contains("todo")) {
                taskObj.todo = taskObj.todo || []
                taskObj.todo.push(card.innerText);
            } else if (col.classList.contains("inProgress")) {
                taskObj.inProgress = taskObj.inProgress || []
                taskObj.inProgress.push(card.innerText)
            } else if (col.classList.contains("done")) {
                taskObj.done = taskObj.done || []
                taskObj.done.push(card.innerText)
            }
        });
    });
    // localStorage.setItem('cards', JSON.stringify(taskObj));
    let userData = localStorage.getItem(user);
    userData = JSON.parse(userData);
    userData.cards = taskObj;
    localStorage.setItem(user, JSON.stringify(userData));

}

function loadCardsfromStorage() {
    ///create content editable cards and load cardtext from storage////////////////////////////////
    if (localStorage.getItem(user)) {
        let taskObj = JSON.parse(localStorage.getItem(user))
        // console.log(taskObj);
        
        
        taskObj.cards.todo.forEach(task => {
            let card = document.createElement("div");
            card.className = "newCard"
            card.contentEditable = true;
            card.draggable = true;
            card.innerText = task
            todo.append(card)
            dragAndDrop(card)
            deleteCard(card)
            instantEditSave(card)
        })
        taskObj.cards.inProgress.forEach(task => {
            let card = document.createElement("div");
            card.className = "newCard"
            card.contentEditable = true;
            card.draggable = true;
            card.innerText = task
            columns[1].append(card)
            dragAndDrop(card)
            deleteCard(card)
            instantEditSave(card)
        })
        taskObj.cards.done.forEach(task => {
            let card = document.createElement("div");
            card.className = "newCard"
            card.contentEditable = true;
            card.draggable = true;
            card.innerText = task
            columns[2].append(card)
            dragAndDrop(card)
            deleteCard(card)
            instantEditSave(card)
        })
    }
}
window.addEventListener('load', loadCardsfromStorage);

let logout = document.getElementById('logout')

logout.addEventListener('click', function() {
    localStorage.removeItem('userID')
    window.location.href = '../index.html'
})