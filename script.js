const inputRange = document.getElementById("inputRange");
let charCount = document.getElementById("char-count");
const checked = document.querySelectorAll(".checkbox");
const checkedSvg = document.querySelectorAll(".checked");

charCount.innerText = inputRange.value;

const activeColor = "#A4FFAF";
const inactiveColor = "#18171F";

inputRange.addEventListener("input", function () {
  const ratio = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
  charCount.innerText = this.value;
});

checked.forEach((checkbox, index) => {
  let insideIndex = index;
  checkbox.addEventListener("click", () => {
    // Assume 'element' is the DOM element you want to check
    if (checkbox.hasAttribute("style")) {
      checkbox.removeAttribute("style");
      checkedSvg.forEach((svg, index) => {
        if (index === insideIndex) {
          svg.classList.remove("show-checked");
        }
      });
    } else {
      console.log("The element does not have a style attribute.");
      checkbox.style.backgroundColor = "var(--color-neon-green)";
      checkbox.style.border = "2px solid var(--color-neon-green)";
      checkedSvg.forEach((svg, index) => {
        if (index === insideIndex) {
          svg.classList.add("show-checked");
        }
      });
    }
  });
});
