// catching the input
var input = document.querySelector(".form_control input");
var add_button = document.querySelector(".form_control button");

// catching every todo container

var containers = document.querySelectorAll(".todo_space");
// add event on the button
var index = 0; // distinguesh each task
var tasks = [];

var g_items = {
    0: [],
    1: [],
    2: [],
    3: [],
};

// add teh local storage once
if (!localStorage.getItem("items")) {
    localStorage.setItem("items", JSON.stringify(g_items));
}

// creat element (task to append in the containers)
function createElement(text) {
    var task = document.createElement("div");
    task.setAttribute("draggable", true);
    task.classList.add("task");

    task.innerHTML = text;
    task.ondragstart = dragstartFun;
    return task;
}

// add task on click
add_button.addEventListener("click", function() {
    // take the input value if existed and create element
    if (input.value) {
        containers[0].append(createElement(input.value));
    }
});

containers.forEach(function(ele, index) {
    ele.addEventListener("dragover", dragoverFun);
});
containers.forEach(function(ele, index) {
    ele.addEventListener("drop", dropFun);
});

function dragstartFun(e) {
    console.log(this);
    this.classList.add("dragging");
}

function dragoverFun(e) {
    e.preventDefault();
}

function dropFun(e) {
    // var dragged = e.dataTransfer.getData("text");
    var dragged = document.querySelector(".dragging");
    dragged.classList.remove("dragging");

    console.log(dragged);
    this.append(dragged);
}

// create event to fire before unload
window.addEventListener("beforeunload", function(e) {
    updateStorage();
});

renderItems();

function updateStorage() {
    var items = JSON.parse(localStorage.getItem("items"));

    console.log(items);
    for (var i = 0; i < 4; i++) {
        console.log(containers[i].children);
        Array.from(containers[i].children).forEach(function(ele, index) {
            items[i][index] = ele.innerHTML;
        });
    }
    console.log(JSON.parse(localStorage.getItem("items")));
    localStorage.setItem("items", JSON.stringify(items));
}

// render the element onunload
function renderItems() {
    // debugger;
    var items = JSON.parse(localStorage.getItem("items"));

    for (var i = 0; i < containers.length; i++) {
        items[i].forEach(function(ele, index) {
            var task = createElement(ele);
            // debugger;
            console.log(containers[i]);
            containers[i].append(task);
        });
    }
    localStorage.setItem("items", JSON.stringify(g_items));
}