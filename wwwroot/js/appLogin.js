const url = "/MyUser";
const users = [];
let userName = document.getElementById("Name").value;
let userPassword = document.getElementById("Password").value;
var myToken = "";
////////////////////////////////

///////////////////////////////
//function to show all users

function encodePassword(password) { }

////////////////////////////////
const checkUser = () => {
  debugger;
  userName = document.getElementById("Name");
  userPassword = document.getElementById("Password");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    Name: userName.value.trim(),
    Password: userPassword.value.trim(),
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch(`${url}/Login`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      if (result.includes("401")) {
        alert(userName.value + " is not logged in");
        userName.value = "";
        userPassword.value = "";
      } else {
        debugger;
        myToken = result.toString();
        sessionStorage.setItem("token", myToken);
        // getUsers(result);
        location.href = "/list.html";
      }
    })
    .catch((error) => alert("error"));
};
///////////////////////////////////////
// function getUsers(token) {
//   var myHeaders = new Headers();
//   debugger;
//   myHeaders.append("Authorization", `Bearer ${token}`);
//   myHeaders.append("Content-Type", "application/json");

//   var requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   fetch("https://localhost:7054/MyUser/GetAll", requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result);
//       // alert(result);
//       debugger;
//       GoToListPage();
//       // result.forEach((user) => {
//       //   if (user.isAdmin == true && user.name == userName.value) displayUsers(result);
//       // });
//     })
//     .catch((error) => console.log("error", error));
// }
displayUsers(result);
