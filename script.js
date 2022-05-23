const checkBtn = document.getElementById("check");
const draggableList = document.getElementById("draggable-list");

const popLanguages = [
  "English",
  "Mandarin",
  "Hindi",
  "Spanish",
  "French",
  "Arabic",
  "Bengali",
  "Russian",
  "Portuguese",
  "Indonesian",
];

let lanList = [];
let dragStartIndex;

function randomizeList() {
  [...popLanguages]
    .map((e) => ({ language: e, value: Math.random() }))
    .sort((a, b) => a.value - b.value)
    .map((e) => e.language)
    .forEach((lan, index) => {
      listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
         <div class="draggable" draggable="true">
           <p class="language">${lan}</p>
         </div>
      `;

      lanList.push(listItem);
      draggableList.appendChild(listItem);
    });

  addEventListener();
}

randomizeList();

function checkOrder() {
  for (let i = 0; i < popLanguages.length; i++) {
    const personName = lanList[i].querySelector(".draggable").innerText.trim();
    if (popLanguages[i] !== personName) {
      lanList[i].classList.add("wrong");
    } else {
      lanList[i].classList.add("right");
      lanList[i].classList.remove("wrong");
    }
  }
}

function swapItems(index1, index2) {
  const newItem1 = lanList[index1].querySelector(".draggable");
  const newItem2 = lanList[index2].querySelector(".draggable");

  console.log(newItem1, newItem2);

  lanList[index1].appendChild(newItem2);
  lanList[index2].appendChild(newItem1);
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  draggableList.classList.remove("wrong");
}

function dragEnter() {
  this.classList.add("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave() {
  this.classList.remove("over");
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("drop", dragDrop);
  });
}

checkBtn.addEventListener("click", checkOrder);
