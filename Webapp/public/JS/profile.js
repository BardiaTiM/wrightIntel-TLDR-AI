/* client side */
const display = document.querySelector(".image-display");
const input = document.querySelector("#upload-image");

input.addEventListener("change", () => {
  let reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  reader.addEventListener("load", () => {
    display.innerHTML = `<img src=${reader.result} alt='' id="profile-image"/>`;
  });
});

const toggleElements = (ids, displayValue) => {
  ids.forEach((id) => {
    const element = document.getElementById(id);
    element.style.display = displayValue;
  });
};

const createInput = (id, value, name, parentClass) => {
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", id);
  input.setAttribute("value", value);
  input.setAttribute("name", name);
  document.querySelector(parentClass).appendChild(input);
};

const removeElements = (ids) => {
  ids.forEach((id) => {
    const element = document.getElementById(id);
    element.remove();
  });
};

const createSaveButton = (id, value, parentClass) => {
  let button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("id", id);
  button.innerHTML = value;
  document.querySelector(parentClass).appendChild(button);
};

let editButtonClicked = true;
let username = document.getElementById("username").innerHTML;
let email = document.getElementById("email").innerHTML;
let phoneNum = document.getElementById("phoneNum").innerHTML;

document.getElementById("edit-button").addEventListener("click", (event) => {
  event.preventDefault();
  if (editButtonClicked) {
    editButtonClicked = false;

    toggleElements(["username", "email", "phoneNum"], "none");
    createInput("usernameInput", username, "usernameInput", ".card-header");
    createInput("emailInput", email, "emailInput", ".info");
    createInput("phoneNumInput", phoneNum, "phoneNumInput", ".info");
    createSaveButton("save-button", "Save", ".submit-container");

    document.getElementById("save-button").addEventListener("click", () => {
      console.log("save button clicked");
      editButtonClicked = true;
      toggleElements(["username", "email", "phoneNum"], "block");
      removeElements(["usernameInput", "emailInput", "phoneNumInput", "save-button"]);
    });
  }
});
