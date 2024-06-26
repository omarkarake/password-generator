const generatedPassElement = document.querySelector(".generated-pass");
const rangeInput = document.getElementById("inputRange");
let charCount = document.getElementById("char-count");
const checkboxes = document.querySelectorAll(".checkbox");
const percentElement = document.querySelector(".percent");
const checkedSvg = document.querySelectorAll(".checked");
const generateBtn = document.querySelector(".generate-btn");
const generateInside = document.querySelector(".generate");

charCount.innerText = rangeInput.value;
let lengthInput;

const activeColor = "#A4FFAF";
const inactiveColor = "#18171F";

rangeInput.addEventListener("input", function () {
  const ratio = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
  charCount.innerText = this.value;
  lengthInput = rangeInput.value;
  console.log(lengthInput);
});

checkboxes.forEach((checkbox, index) => {
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

generateBtn.addEventListener("mouseover", () => {
  console.log("mouse over generate");
  generateInside.innerHTML = `<p>GENERATE</p><img
                 src="./assets/images/icon-arrow-right-neon-green.svg"
                 class="icon-right"
             />`;
});

generateBtn.addEventListener("mouseout", () => {
  console.log("mouse out generate");
  generateInside.innerHTML = `<p>GENERATE</p><img src="./assets/images/icon-arrow-right.svg" class="icon-right"/>`;
});
