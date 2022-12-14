let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a class="link" target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
                <button class="copy-link" data-index="${i}"><span class="material-symbols-outlined">
content_copy
</span></button>
                <button class="remove-link" data-index="${i}"><span class="material-symbols-outlined">
delete
</span></i></button>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
  addListeners();
}
// ** Add these buttons below later once Remove & Copy work
// <button class="edit-link" data-index="${i}">Edit</button>
// <button class="drag-link" data-index="${i}">Drag</button>;
// ** Add listcreator in index.html
// <button id="create-list">CREATE LIST</button>

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

function addListeners() {
  {
    const removeLinkBtn = document.querySelectorAll(".remove-link");
    removeLinkBtn.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        console.log(event.target);
        const index = event.target.dataset.index;
        removeLink(index);
      });
    });
  }

  {
    const copyLinkBtn = document.querySelectorAll(".copy-link");
    copyLinkBtn.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        console.log(event.target);
        const index = event.target.dataset.index;
        copyLink(index);
      });
    });
  }
}

function removeLink(index) {
  index = +index;
  //remove index item
  myLeads.splice(index, 1);
  // remove from Local storage (set new array)
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  //console.log index
  console.log(`The index is ${index} `);
  // then just update the page with the modified item list
  render(myLeads);
  alert("Removed Link");
}

function copyLink(index) {
  index = +index;
  const linkEl = document.querySelectorAll(".link");
  navigator.clipboard.writeText(linkEl[index].innerHTML).then(() => {
    // Alert the user that the action took place.
    //pop up copied
    alert(`Copied to clipboard`);
  });
}

//select link to copy
// copy the link from the index
//navigator.clipboard.writeText(linkEl.value);(index?)
