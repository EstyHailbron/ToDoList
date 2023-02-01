const url = "/MyUser";
let tasks = [];
let Token = sessionStorage.getItem("token");
getUsers();
//users//
function getUsers() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(`${url}/GetAll`, requestOptions)
    .then((response) => response.json())
    .then((data) => displayUsers(data))
    .catch((error) => console.log("error", error));
}
function displayUsers(data) {
  document.getElementById("blockUsersTable").style.display = 'block';
  const tBody = document.getElementById("result");
  tBody.innerHTML = "";
  console.log(data);
  const button = document.createElement("button");
  data.forEach((user) => {
    console.log(user.name);
    let isDoneCheckbox = document.createElement("input");
    isDoneCheckbox.type = "checkbox";
    isDoneCheckbox.disabled = true;
    isDoneCheckbox.checked = user.isAdmin;

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = "❌";
    deleteButton.setAttribute("onclick", `deleteUser(${user.id})`);

    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    td1.appendChild(isDoneCheckbox);

    let td2 = tr.insertCell(1);
    let textName = document.createTextNode(user.name);
    td2.appendChild(textName);
    let td3 = tr.insertCell(2);
    let textPassord = document.createTextNode(encode(user.password));
    td3.appendChild(textPassord);

    let td4 = tr.insertCell(3);
    td4.appendChild(deleteButton);
  });
  users = data;
}
function encode(password) {
  let encoding = "";
  for (let index = 0; index < password.length; index++)
    encoding += "* ";
  return encoding;

}
function addUser() {
  let newUserName = document.getElementById("new-user");
  let newUserPassword = document.getElementById("new-password");
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);
  myHeaders.append("Content-Type", "application/json");
  var user = JSON.stringify({
    name: newUserName.value.trim(),
    isAdmin: false,
    password: newUserPassword.value.trim(),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: user,
    redirect: "follow",
  };
  fetch(`${url}`, requestOptions)
    .then((response) => response.text())
    .then(() => {
      newUserName.value = "";
      newUserPassword.value = "";
      getUsers();
    })
    .catch((error) => console.log("error", error));
}
function deleteUser(id) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);
  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(`${url}/${id}`, requestOptions)
    .then((response) => getUsers())
    .catch((error) => console.log("error", error));
}

//items///
const urlItems = "/MyTask";
getItems();
function getItems() {
  fetch(`${urlItems}?token=${Token}`)
    .then((response) => response.json())
    .then((data) => _displayItems(data))
    .catch((error) => alert("Unable to get items.", error));
}

function addItem() {
  debugger
  const addNameTextbox = document.getElementById("new-task");
  const item = {
    isDone: false,
    name: addNameTextbox.value.trim(),
  };

  fetch(`${urlItems}?token=${Token}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = "";
    })
    .catch((error) => console.error("Unable to add item.", error));
}

function deleteItem(id) {
  fetch(`${urlItems}/${id}`, {
    method: "DELETE",
  })
    .then(() => getItems())
    .catch((error) => console.error("Unable to delete item.", error));
}

function displayEditForm(id) {
  debugger
  const item = tasks.find((item) => item.id === id);

  document.getElementById("edit-name").value = item.name;
  document.getElementById("edit-id").value = item.id;
  document.getElementById("edit-isDone").checked = item.isDone;
  document.getElementById("editForm").style.display = "block";
}

function updateItem() {
  const itemId = document.getElementById("edit-id").value;
  const item = {
    id: parseInt(itemId, 10),
    isdone: document.getElementById("edit-isDone").checked,
    name: document.getElementById("edit-name").value.trim(),
  };

  fetch(`${urlItems}/${itemId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(() => getItems())
    .catch((error) => console.error("Unable to update item.", error));

  closeInput();
  return false;
}

function closeInput() {
  document.getElementById("editForm").style.display = "none";
}

function _displayCount(itemCount) {
  const name = itemCount <= 1 ? "task" : "tasks";

  document.getElementById(
    "counter"
  ).innerText = `you have now ${itemCount} ${name}`;
}

function _displayItems(data) {
  debugger;
  const tBody = document.getElementById("tasks");
  tBody.innerHTML = "";

  _displayCount(data.length);

  const button = document.createElement("button");

  data.forEach((item) => {
    let isDoneCheckbox = document.createElement("input");
    isDoneCheckbox.type = "checkbox";
    isDoneCheckbox.disabled = true;
    isDoneCheckbox.checked = item.isDone;

    let editButton = button.cloneNode(false);
    editButton.innerText = "📝";
    debugger
    editButton.setAttribute("onclick", `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = "❌";
    deleteButton.setAttribute("onclick", `deleteItem(${item.id})`);

    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    td1.appendChild(isDoneCheckbox);

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.name);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    td3.appendChild(editButton);

    let td4 = tr.insertCell(3);
    td4.appendChild(deleteButton);
  });

  tasks = data;
}
//////////////////////////////////////////////////////////////////////////////////////

///theme//
function showAddUserBlock() {
  const button = document.getElementById("addNewUserBlock");
  button.style.display = "block";
}

