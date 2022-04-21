let count = Number(window.localStorage.getItem("count"));

if (!count) {
    window.localStorage.setItem("count", "0");
}

function createNote(noteTitle, noteBody) {

    document.getElementById("no-notes").classList.add("hidden");
    let li = document.createElement("li");
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let xbutton = document.createElement("button");
    let p = document.createElement("p");

    xbutton.classList.add("delete");

    xbutton.setAttribute("id", "delete");


    let xText = document.createTextNode("X");
    let h2TN = document.createTextNode(noteTitle);
    let pTN = document.createTextNode(noteBody);

    xbutton.appendChild(xText);
    h2.appendChild(h2TN);
    p.appendChild(pTN);

    div.appendChild(h2);
    div.appendChild(xbutton);

    li.appendChild(div);
    li.appendChild(p);

    document.getElementById("notes").appendChild(li);
}


function createNoteFromInput(e) {
    e.preventDefault();
    let noteTitle = document.getElementById("new-note-title-id").value;
    let noteBody = document.getElementById("new-note-body-id").value;

    document.getElementById("new-note-title-id").value = "";
    document.getElementById("new-note-body-id").value = "";

    count += 1;
    window.localStorage.setItem("count", count);

    window.localStorage.setItem(noteTitle, noteBody);



    createNote(noteTitle, noteBody);
}

function removeItem(e) {
    if (confirm("Are you sure, you wanna delete this note?")) {
        window.localStorage.removeItem(e.target.value)
        let li = e.target.parentElement.parentElement;


        let ul = document.getElementById("notes");
        ul.removeChild(li);
        count -= 1;
        window.localStorage.setItem("count", count);
        window.localStorage.removeItem(e.target.previousElementSibling.innerText);

        if (count < 1) {
            document.getElementById("no-notes").className = "";
        }
    }



}

for (let i = 0; i < count + 1; i++) {
    let noteTitle = window.localStorage.key(i);
    if (noteTitle !== "count" && noteTitle) {
        let noteBody = window.localStorage.getItem(noteTitle);

        createNote(noteTitle, noteBody);
    }
}



// Grabbing the submit button and assign a function to it.
let btn = document.getElementById('inputform');
btn.addEventListener("submit", createNoteFromInput, false);

// Grabbing the delete button and assign a function to it.
document.getElementById('notes').addEventListener("click", removeItem);