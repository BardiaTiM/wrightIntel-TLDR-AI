const display = document.querySelector(".image-display");
const input = document.querySelector("#upload-image");
input.addEventListener("change", () => {
  let reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  reader.addEventListener("load", () => {
    display.innerHTML = `<img src=${reader.result} alt='' id="profile-image"/>`;
  });
});