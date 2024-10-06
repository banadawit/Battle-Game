// document.addEventListener("DOMContentLoaded", function () {
//   const button = document.querySelector(".help-section");
//   const helpContent = document.querySelector("#help-content");

//   button.addEventListener("click", function () {
//     if (
//       helpContent.style.display === "none" ||
//       helpContent.style.display === ""
//     ) {
//       helpContent.style.display = "block";
//     } else {
//       helpContent.style.display = "none";
//     }
//   });
// });
const srategy = Math.trunc(Math.random() * 3) + 1;

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".help-section");
  const helpContent = document.querySelector("#help-content");
  let helpContentVisible = false;

  button.addEventListener("click", function () {
    helpContentVisible = !helpContentVisible;
    helpContent.style.display = helpContentVisible ? "flex" : "none";
  });
});

if ()