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

      lanList.push(lan);
      draggableList.appendChild(listItem);
    });

  addEventListener();
}

randomizeList();

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  // dragListItems.forEach((item) => {
  //   item.addEventListener("dragenter", dragEnter);
  //   item.addEventListener("dragover", dragOver);
  //   item.addEventListener("dragleave", dragLeave);
  //   item.addEventListener("drop", dragDrop);
  // });
}
