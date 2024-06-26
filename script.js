// Select DOM elements
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
const colors = [
  document.getElementById("strength-color1"),
  document.getElementById("strength-color2"),
  document.getElementById("strength-color3"),
  document.getElementById("strength-color4"),
];

let tobeCopied;

// Event listener for copying the generated password to the clipboard
icons.addEventListener("click", async () => {
  try {
    if (!tobeCopied) {
      setGeneratedPassElementText("Please generate first...");
      return;
    }
    await navigator.clipboard.writeText(tobeCopied);
    // Show the copied message
    showCopiedMessage();
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
});

// Event listeners for mouseover and mouseout to change icon display
icons.addEventListener("mouseover", () => toggleCopyIcons(false));
icons.addEventListener("mouseout", () => toggleCopyIcons(true));

// Update character count display and range input background
charCount.innerText = rangeInput.value;
let lengthInput = rangeInput.value;

const activeColor = "#A4FFAF";
const inactiveColor = "#18171F";

rangeInput.addEventListener("input", function () {
  const ratio = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
  charCount.innerText = this.value;
  lengthInput = this.value;
});

// Event listener for checkboxes to update their styles
checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("click", () => toggleCheckbox(checkbox, index));
});

// Event listeners for generate button hover effect
generateBtn.addEventListener("mouseover", () => updateGenerateButton(true));
generateBtn.addEventListener("mouseout", () => updateGenerateButton(false));

// Character pools for password generation
const charTypes = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

// Function to generate password based on selected options and length
function generatePassword() {
  let characterPool = "";
  let password = "";
  const length = parseInt(lengthInput);

  if (length <= 0) {
    setGeneratedPassElementText("Please increase character length");
    return;
  }

  Object.keys(charTypes).forEach((type, i) => {
    if (checkboxes[i].classList.contains("checked-box")) {
      characterPool += charTypes[type];
    }
  });

  if (!characterPool) {
    setGeneratedPassElementText("Select at least one option");
    return;
  }

  for (let i = 0; i < length; i++) {
    password += characterPool.charAt(
      Math.floor(Math.random() * characterPool.length)
    );
  }

  setGeneratedPassElementText(password, true);
  tobeCopied = password;
  updateStrength();
}

// Function to update the strength indicator based on selected options
function updateStrength() {
  const selectedOptions = Array.from(checkboxes).filter((checkbox) =>
    checkbox.classList.contains("checked-box")
  ).length;
  const percentage = (selectedOptions / checkboxes.length) * 100;

  let strength = "TOO WEAK!";
  let colorValue = "--color-red";
  if (percentage > 75) {
    strength = "STRONG";
    colorValue = "--color-neon-green";
  } else if (percentage > 50) {
    strength = "MEDIUM";
    colorValue = "--color-yellow";
  } else if (percentage > 25) {
    strength = "WEAK";
    colorValue = "--color-orange";
  }

  colors.forEach((color, i) => {
    color.style.backgroundColor =
      i < selectedOptions
        ? getComputedStyle(document.documentElement).getPropertyValue(
            colorValue
          )
        : "";
  });
  strengthIndicator.innerText = strength;
}

// Event listener to generate password when button is clicked
generateBtn.addEventListener("click", generatePassword);

// Helper functions
function toggleCopyIcons(showBefore) {
  beforeCopy.style.display = showBefore ? "block" : "none";
  afterCopy.style.display = showBefore ? "none" : "block";
}

function toggleCheckbox(checkbox, index) {
  const checked = checkbox.classList.toggle("checked-box");
  checkbox.style.backgroundColor = checked ? "var(--color-neon-green)" : "";
  checkbox.style.border = checked ? "2px solid var(--color-neon-green)" : "";
  checkedSvg[index].classList.toggle("show-checked", checked);
}

function updateGenerateButton(hover) {
  generateInside.innerHTML = `<p>GENERATE</p><img src="./assets/images/icon-arrow-right${
    hover ? "-neon-green" : ""
  }.svg" class="icon-right"/>`;
}

function setGeneratedPassElementText(text, reset = false) {
  generatedPassElement.textContent = text;
  if (reset) {
    generatedPassElement.style.fontSize = "2rem";
    generatedPassElement.style.opacity = "1";
  } else {
    generatedPassElement.style.fontSize = text.length > 20 ? "12px" : "";
    generatedPassElement.style.opacity = ".25";
  }
}

function showCopiedMessage() {
  copied.style.visibility = "visible";
  setTimeout(() => {
    copied.style.visibility = "hidden";
  }, 3000);
}
