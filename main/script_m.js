let todo = document.querySelector(".todo");
let columns = document.querySelectorAll(".column");
let newTask = document.getElementById("plus");

newTask.addEventListener("click", function(e) {
    e.preventDefault();    
    let card = document.createElement("div");
    card.className = "newCard"
    card.contentEditable = true;
    card.draggable = true;
    card.innerText = "New Task"
    todo.append(card)
    dragAndDrop(card)
    deleteCard(card)

});

// function saveText(card) {
//     let text = card.innerText;
//     let userInfo = localStorage.getItem(JSON.parse())
// }


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
    
    card.addEventListener("dragend", () => {        
        card.classList.remove("dragging")
    })
}
function deleteCard(card) {
    card.addEventListener("blur", () => {
        if (card.innerText == "") {
            card.remove()
        }
    })
}
