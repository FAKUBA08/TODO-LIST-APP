const acc = document.getElementsByClassName('accordion');
const accordion = document.querySelector('.accordion');
const container = document.querySelector('.container');
const containerTodo = document.querySelector('.container-2');
const display = document.querySelector('.display');
const textBox = document.getElementById("textBox");
textBox.classList.add('no-select'); // Add this line to disable text selection
const checkBox = document.querySelector(".checkBox");
const checking = document.querySelectorAll('.checking');
const deleteBtn = document.querySelector('.deleteBtn');
const underIt = document.querySelector('.underIt');
const panel = document.querySelector('.panel');
const underline = document.querySelector('.underline');
const checkRead = document.querySelector('.checkedRead');
const read = document.querySelector('.read');
let data = '';
let newStorage = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
copiedTest(newStorage);

for (let index = 0; index < acc.length; index++) {
    acc[index].addEventListener('click', function () {
        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = 'none';
            accordion.innerHTML = '<img src="images/icon-sun.svg" alt="">';
            container.classList.remove('containerB');
            containerTodo.classList.remove('containerTod');
            display.style.backgroundColor = "#181824";
            textBox.style.backgroundColor = "#181824";
            underIt.style.backgroundColor = "#181824";
            display.classList.remove("readAdd");
            checkRead.style.color = 'rgba(255, 255, 255, 0.415)';
            textBox.style.color = "white";
        } else {
            panel.style.display = 'block';
            accordion.innerHTML = '<img src="images/icon-moon.svg" alt="">';
            container.classList.add('containerB');
            containerTodo.style.display.backgroundColor = "white";
            containerTodo.classList.add('containerTod');
            accordion.classList.add("accordionRotate");
            display.style.backgroundColor = "white";
            textBox.style.backgroundColor = "white";
            underIt.style.backgroundColor = "white";
            display.classList.add("readAdd");
            checkRead.style.color = 'black';
            textBox.style.color = "black";
        }
    });
}

textBox.addEventListener('input', function () {
    if (textBox.value.length > 0) {
        checkBox.style.display = 'block';
    } else {
        checkBox.style.display = 'none';
    }
});

checkBox.addEventListener('click', function () {
    if (textBox.value.trim() !== '') {
        newStorage.push({ text: textBox.value, read: false, deleteBtnVisible: false });
        textBox.value = '';
        checkBox.style.display = 'none';
        copiedTest(newStorage);
        localStorage.setItem('data', JSON.stringify(newStorage));
        newStorage = JSON.parse(localStorage.getItem('data'));
    }
});

// Add drag event listeners
textBox.addEventListener('dragstart', handleDragStart);
textBox.addEventListener('dragend', handleDragEnd);
display.addEventListener('dragover', handleDragOver);
display.addEventListener('drop', handleDrop);

function handleDragStart(event) {
    if (textBox.value.trim() !== '') {
        event.dataTransfer.setData('text/plain', textBox.value);
        event.target.classList.add('dragging');
    } else {
        event.preventDefault(); // Prevent drag if text box is empty
    }
}

function handleDragEnd(event) {
    event.target.classList.remove('dragging');
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function handleDrop(event) {
    event.preventDefault();
    const droppedText = event.dataTransfer.getData('text/plain');
    if (droppedText.trim() !== '') {
        newStorage.push({ text: droppedText, read: false, deleteBtnVisible: false });
        textBox.value = '';
        checkBox.style.display = 'none';
        copiedTest(newStorage);
        localStorage.setItem('data', JSON.stringify(newStorage));
        newStorage = JSON.parse(localStorage.getItem('data'));
    }
}

function copiedTest(arr) {
    display.innerHTML = '';
    arr.forEach(function (el, i) {
        display.innerHTML += `<div class="items">
            <div class="checking" id="checking-${i}" style="background-color: ${el.read ? '#733BAC' : 'transparent'};">
                <img src="images/icon-check.svg" alt="" style="display: ${el.read ? 'block' : 'none'};">
            </div>
            <div class="read ${el.read ? 'readBtn' : ''}" id="read-${i}"><p>${el.text}</p></div>
            <div class="deleteBtn" id="delB-${i}" style="display: ${el.deleteBtnVisible ? 'block' : 'none'};" onclick="delBtn(${i})"><img src="images/icon-cross.svg" alt=""></div>
        </div><div class="underBtn"></div>`;
    });
    if (arr.length > 3) {
        display.classList.add('scrollAdd');
        container.style.height = '30vh';
    } else {
        display.classList.remove('scrollAdd');
        container.style.height = '50vh';
    }
    addCheckingEventListeners();
}

function addCheckingEventListeners() {
    const checkingElements = document.querySelectorAll(".checking");
    checkingElements.forEach(function (el, index) {
        el.addEventListener('click', function () {
            highBtn(index);
        });
    });
}

function highBtn(index) {
    const readElement = document.getElementById(`read-${index}`);
    const showElement = document.getElementById(`delB-${index}`);
    const checkingElement = document.getElementById(`checking-${index}`);
    const dCheck = checkingElement.querySelector("img");

    readElement.classList.toggle('readBtn');
    const isRead = readElement.classList.contains('readBtn');
    showElement.style.display = isRead ? 'block' : 'none';

    if (isRead) {
        checkingElement.style.backgroundColor = "#733BAC";
        dCheck.style.display = "block";
        newStorage[index].read = true;
        newStorage[index].deleteBtnVisible = true;
    } else {
        checkingElement.style.backgroundColor = "transparent";
        dCheck.style.display = "none";
        newStorage[index].read = false;
        newStorage[index].deleteBtnVisible = false;
    }

    localStorage.setItem('data', JSON.stringify(newStorage));
}

function delBtn(index) {
    newStorage.splice(index, 1);
    copiedTest(newStorage);
    localStorage.setItem('data', JSON.stringify(newStorage));
    newStorage = JSON.parse(localStorage.getItem('data'));
}

copiedTest(newStorage);
