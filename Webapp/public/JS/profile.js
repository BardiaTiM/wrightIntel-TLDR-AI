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

const listImages = (images) => {
  images.forEach((image) => {
    let img = document.createElement("img");
    img.setAttribute("src", image);
    img.setAttribute("class", "profile-image");
    img.setAttribute("height", "200");
    img.setAttribute("width", "200");
    document.querySelector(".profile-image-container").appendChild(img);
  });
};

const createSaveButton = () => {
  let saveButton = document.createElement("button");
  saveButton.setAttribute("id", "save-button");
  saveButton.setAttribute("type", "submit");
  saveButton.innerHTML = "save";
  document.querySelector(".modal-footer").appendChild(saveButton);
};

const profileImageTitle = () => {
  const html = `
  <div class="profile-image-container">
    <h5 id="profileImageTitle">Pick your profile image</h5>
  </div>
`;
  document.querySelector(".modal-body").insertAdjacentHTML("beforeend", html);
};

const createTitle = (title, parentClass) => {
  let titleElement = document.createElement("h5");
  titleElement.setAttribute("id", title);
  titleElement.innerHTML = title;
  document.querySelector(parentClass).appendChild(titleElement);
};

const createLine = (id, parentClass) => {
  let divider = document.createElement("div");
  divider.setAttribute("id", id);
  document.querySelector(parentClass).appendChild(divider);
};

let editButtonClicked = true;
let username = document.getElementById("username").innerHTML;
let email = document.getElementById("email").innerHTML;
let phoneNum = document.getElementById("phoneNum").innerHTML;

document.getElementById("edit-button").addEventListener("click", async (event) => {
  event.preventDefault();
  if (editButtonClicked) {

    editButtonClicked = false;

    createTitle("Username", ".modal-body");
    createInput("usernameInput", username, "usernameInput", ".modal-body");
    createTitle("Email", ".modal-body");
    createInput("emailInput", email, "emailInput", ".modal-body");
    createTitle("Phone Number", ".modal-body");
    createInput("phoneNumInput", phoneNum, "phoneNumInput", ".modal-body");
    createLine("line", ".modal-body");
    profileImageTitle();
    listImages(["/profile_images/cat.png", "/profile_images/front-plane.png", "/profile_images/minions.png"
      , "/profile_images/pilot-black.png", "/profile_images/pilot-blue.png", "/profile_images/pilot-pink.png"
      , "/profile_images/side-plane.png", "/profile_images/lebron.png"]);
    createSaveButton();

    let selectedImage = null; // Track the currently selected image
    var selectedImageName = ""; // Store the name of the selected image
    
    const profileImages = document.getElementsByClassName("profile-image");
    Array.from(profileImages).forEach((image) => {
      image.addEventListener("click", (event) => {
        const clickedImage = event.target;
    
        // Remove border from previously selected image (if any)
        if (selectedImage) {
          selectedImage.style.border = "none";
        }
    
        // Add border to the newly selected image
        clickedImage.style.border = "2px solid black"; // Modify the border style as desired
    
        selectedImage = clickedImage; // Update the selected image
    
        // Extract the filename from the full path
        const imagePath = clickedImage.getAttribute("src");
        selectedImageName = imagePath.substring(imagePath.lastIndexOf("/") + 1);
      });
    });
    
    document.getElementById("save-button").addEventListener("click", async (event) => {
      event.preventDefault();
    
      // Get the updated values
      const updatedUsername = document.getElementById("usernameInput").value;
      const updatedEmail = document.getElementById("emailInput").value;
      const updatedPhoneNum = document.getElementById("phoneNumInput").value;
    
      // Create the JSON object
      const data = {
        username: updatedUsername,
        email: updatedEmail,
        phoneNum: updatedPhoneNum,
        image: selectedImageName
      };
      try {
        const response = await fetch("/profileUpdate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
    
        if (response.ok) {
          // Request successful, handle the response here
          console.log("Profile update successful");
        } else {
          // Request failed, handle the error here
          console.log("Profile update failed");
        }
      } catch (error) {
        // Error occurred, handle the error here
        console.log("An error occurred:", error);
      }
    });
  }
});
