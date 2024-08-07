// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
        removeTask(div.firstChild.textContent);
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        updateTask(ev.target.firstChild.textContent, ev.target.classList.contains('checked'));
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
        addTask(inputValue);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
            removeTask(div.firstChild.textContent);
        }
    }
}

// Add event listener for the Enter key on the input field
document.getElementById("myInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        newElement();
    }
});

// Function to load tasks from localStorage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        var li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('checked');
        }
        document.getElementById("myUL").appendChild(li);
        
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
    });
}

// Function to add a task to localStorage
function addTask(text) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({text: text, completed: false});
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update a task's completion status in localStorage
function updateTask(text, completed) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var task = tasks.find(function(task) {
        return task.text === text;
    });
    if (task) {
        task.completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Function to remove a task from localStorage
function removeTask(text) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(function(task) {
        return task.text !== text;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}