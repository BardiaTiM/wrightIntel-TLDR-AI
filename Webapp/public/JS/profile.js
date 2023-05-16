const display = document.querySelector(".image-display");
const input = document.querySelector("#upload-image");

input.addEventListener("change", () => {
  let reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  reader.addEventListener("load", () => {
    display.innerHTML = `<img src=${reader.result} alt='' id="profile-image"/>`;
  });
});

const editButton = function (id) {
  for (let i = 0; i < id.length; i++) {
    document.getElementById(id[i]).style.display = "none";
  }
};

const cancelEditButton = function (id) {
  for (let i = 0; i < id.length; i++) {
    document.getElementById(id[i]).style.display = "block";
  }
};

const createInput = function (id, value, name, id2, value2, name2, id3, value3, name3) {
  
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", id);
  input.setAttribute("value", value);
  input.setAttribute("name", name);
  document.getElementsByClassName("card-header")[0].appendChild(input);

  let input2 = document.createElement("input");
  input2.setAttribute("type", "email");
  input2.setAttribute("id", id2);
  input2.setAttribute("value", value2);
  input2.setAttribute("name", name2);
  document.getElementsByClassName("info")[0].appendChild(input2);

  let input3 = document.createElement("input");
  input3.setAttribute("type", "text");
  input3.setAttribute("id", id3);
  input3.setAttribute("value", value3);
  input3.setAttribute("name", name3);
  document.getElementsByClassName("info")[0].appendChild(input3);
};

const removeInput = function (id) {
  for (let i = 0; i < id.length; i++) {
    document.getElementById(id[i]).remove();
  }
};

const createSaveButton = function (id, value) {
  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("id", id);
  button.innerHTML = value;
  document.getElementsByClassName("save")[0].appendChild(button);
};

let editButtonClicked = true;
let username = document.getElementById("username").innerHTML;
let email = document.getElementById("email").innerHTML;
let phoneNum = document.getElementById("phoneNum").innerHTML;

document.getElementById("edit-button").addEventListener("click", function () {
  if (editButtonClicked) {
    editButtonClicked = false;
    editButton(["username", "email", "phoneNum"]);

    createInput("usernameInput", username, "usernameInput", "emailInput", email, "emailInput", "phoneNumInput", phoneNum, "phoneNumInput");

    createSaveButton("save-button", "Save");
    document.getElementById("save-button").addEventListener("click", function () {
      editButtonClicked = true;
      cancelEditButton(["username", "email", "phoneNum"]);
      removeInput(["usernameInput", "emailInput", "phoneNumInput", "save-button"]);
    });
  }
});
