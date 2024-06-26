const beforeCopy = document.querySelector(".before-copy");
const afterCopy = document.querySelector(".after-copy");
const copied = document.querySelector("#copied");
const icons = document.querySelector(".icons");
let generatedPassElement = document.querySelector(".generated-pass");
const rangeInput = document.getElementById("inputRange");
let charCount = document.getElementById("char-count");
const checkboxes = document.querySelectorAll(".checkbox");
const checkedSvg = document.querySelectorAll(".checked");
const generateBtn = document.querySelector(".generate-btn");
const generateInside = document.querySelector(".generate");
const strengthIndicator = document.querySelector(".medium-text");
const color1 = document.getElementById("strength-color1");
const color2 = document.getElementById("strength-color2");
const color3 = document.getElementById("strength-color3");
const color4 = document.getElementById("strength-color4");

let tobeCopied;

icons.addEventListener("click", async () => {
  try {
    if (tobeCopied === undefined) {
      generatedPassElement.textContent = "Please generate first...";
      if (generatedPassElement.textContent.length > 20)
        generatedPassElement.style.fontSize = "12px";
      generatedPassElement.style.opacity = ".25";
      return;
    }
    await navigator.clipboard.writeText(tobeCopied);
    // Show the copied message
    copied.style.visibility = "visible";
    setTimeout(() => {
      copied.style.visibility = "hidden";
    }, 3000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
});

icons.addEventListener("mouseover", () => {
  beforeCopy.style.display = "none";
  afterCopy.style.display = "block";
});

icons.addEventListener("mouseout", () => {
  beforeCopy.style.display = "block";
  afterCopy.style.display = "none";
});

charCount.innerText = rangeInput.value;
let lengthInput = rangeInput.value;
let percent = 0;

const activeColor = "#A4FFAF";
const inactiveColor = "#18171F";

rangeInput.addEventListener("input", function () {
  const ratio = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
  charCount.innerText = this.value;
  lengthInput = rangeInput.value;
});

checkboxes.forEach((checkbox, index) => {
  let insideIndex = index;
  checkbox.addEventListener("click", () => {
    if (checkbox.hasAttribute("style")) {
      checkbox.removeAttribute("style");
      checkedSvg.forEach((svg, index) => {
        if (index === insideIndex) {
          svg.classList.remove("show-checked");
          checkbox.classList.remove("checked-box");
        }
      });
    } else {
      checkbox.style.backgroundColor = "var(--color-neon-green)";
      checkbox.style.border = "2px solid var(--color-neon-green)";
      checkbox.classList.add("checked-box");
      checkedSvg.forEach((svg, index) => {
        if (index === insideIndex) {
          svg.classList.add("show-checked");
        }
      });
    }
  });
});

generateBtn.addEventListener("mouseover", () => {
  generateInside.innerHTML = `<p>GENERATE</p><img
                 src="./assets/images/icon-arrow-right-neon-green.svg"
                 class="icon-right"
             />`;
});

generateBtn.addEventListener("mouseout", () => {
  generateInside.innerHTML = `<p>GENERATE</p><img src="./assets/images/icon-arrow-right.svg" class="icon-right"/>`;
});

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

function generatePassword() {
  let characterPool = "";
  let password = "";
  const length = parseInt(lengthInput);
  if (length <= 0) {
    generatedPassElement.textContent = "Please increase character length";
    if (generatedPassElement.textContent.length > 20)
      generatedPassElement.style.fontSize = "12px";
    generatedPassElement.style.opacity = ".25";
    return;
  }

  if (document.querySelector(".checkbox1").classList.contains("checked-box")) {
    characterPool += uppercaseLetters;
  }

  if (document.querySelector(".checkbox2").classList.contains("checked-box")) {
    characterPool += lowercaseLetters;
  }
  if (document.querySelector(".checkbox3").classList.contains("checked-box")) {
    characterPool += numbers;
  }
  if (document.querySelector(".checkbox4").classList.contains("checked-box")) {
    characterPool += symbols;
  }

  if (characterPool === "") {
    generatedPassElement.textContent = "Select at least one option";
    if (generatedPassElement.textContent.length > 20)
      generatedPassElement.style.fontSize = "12px";
    generatedPassElement.style.opacity = ".25";
    return;
  }

  for (let i = 0; i < length; i++) {
    password += characterPool.charAt(
      Math.floor(Math.random() * characterPool.length)
    );
  }

  generatedPassElement.textContent = password;
  generatedPassElement.style.fontSize = "2rem";
  generatedPassElement.style.opacity = "1";
  tobeCopied = generatedPassElement.textContent;
  updateStrength();
}

function updateStrength() {
  const selectedOptions = Array.from(checkboxes).filter((checkbox) =>
    checkbox.classList.contains("checked-box")
  ).length;
  const percentage = (selectedOptions / checkboxes.length) * 100;
  percent = percentage;
  // Correctly assign the value of the custom property
  //   if password strength is below 100 and up 75
  if (percent > 75 && percent >= 100) {
    color1.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-neon-green");
    color2.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-neon-green");
    color3.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-neon-green");
    color4.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-neon-green");
    strengthIndicator.innerText = "STRONG";
    //   if password strength is below 75 and up 50
  } else if (percent > 50 && percent >= 75) {
    color1.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-yellow");
    color2.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-yellow");
    color3.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-yellow");
    color4.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("");
    strengthIndicator.innerText = "MEDIUM";
    //   if password strength is below 50 and up 25
  } else if (percent > 25 && percent >= 50) {
    color1.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-orange");
    color2.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-orange");
    color3.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("");
    color4.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("");
    strengthIndicator.innerText = "WEAK";
    //   if password strength is below or equal to 25
  } else if (percent <= 25) {
    console.log(color1);
    color1.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-red");
    color2.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("");
    color3.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("");
    color4.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("");
    strengthIndicator.innerText = "TOO WEAK!";
  }
}

generateBtn.addEventListener("click", generatePassword);
