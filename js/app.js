console.log('welcome to Notes App');
showNotes();

// If user adds a note, add it to local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }

  let myObj={
    title: addTitle.value,
    text: addTxt.value
  }
  if (addTxt.value.length > 0) noteObj.push(myObj);
  addTxt.value = "";
  addTitle.value = "";
  localStorage.setItem("notes", JSON.stringify(noteObj));

  showNotes();
});

// Function to show notes from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let html = "";
  noteObj.forEach(function (element, index) {
    html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <h5 class="card-title">${index+1}. ${element.title}</h5>
            <p class="mb-3"> ${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
            `;
  });

  let noteEle = document.getElementById("notes");
  if (noteObj.length != 0) {
    noteEle.innerHTML = html;
  } else {
    noteEle.innerHTML = `nothing to show here. Use above box to put notes here.`;
  }
}

function deleteNote(index){
    // console.log(`deleting note ${index}`);
    let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.splice(index,1);
  localStorage.setItem('notes', JSON.stringify(noteObj));
  showNotes();
}

let search= document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputVal= search.value.toLowerCase();
    // console.log('Input event fired', inputVal);

    let noteCards= document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function(element){
        let cardTxt= element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display= 'block';
        }
        else{
            element.style.display= 'none';
        }

    })
})