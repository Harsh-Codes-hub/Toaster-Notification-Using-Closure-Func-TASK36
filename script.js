// CONTAINER
const generator = document.querySelector(".toaster-generator");

// ALL INPUTS
const inputs = generator.querySelectorAll(".input");

// SPECIFIC input
const toasterTextInput = generator.querySelector("#toaster-text");

const positionXSelect = generator.querySelector("#positionX");
const positionYSelect = generator.querySelector("#positionY");

const bgColorInput = generator.querySelector("#bg-color");
const textColorInput = generator.querySelector("#text-color");

const timeoutInput = generator.querySelector("#timeout");
const delayInput = generator.querySelector("#delay");

// BUTTON
const generateBtn = generator.querySelector(".gen-btn");

// Toaster Stack
const toasterStack = document.querySelector(".toaster-stack");

// Functions

function getData() {
  // default values if input felt empty
  const conditions = {
    positionX: "left",
    positionY: "top",
    "bg-color": "#000000",
    "text-color": "#ffffff",
    timeout: 3,
    delay: 1,
  };
  let data = {};
  let message = "";
  inputs.forEach((input) => {
    let value = input.value.trim();
    if (input.name === "toaster-text") {
      message = value === "" ? "I am Toaster" : value;
      return;
    }
    if (value === "") {
      value = conditions[`${input.name}`];
      data[`${input.name}`] = value;
    } else if (input.name === "timeout" || input.name === "delay") {
      value = Number(value);
    }
    data[`${input.name}`] = value;
  });
  return { message, config: data };
}

function setPosition(config) {
  const map = {
    top: "start",
    bottom: "end",
    left: "start",
    right: "end",
  };
  toasterStack.style.alignContent = map[config.positionY];
  toasterStack.style.justifyContent = map[config.positionX];
}

function toaster() {
  const { message, config } = getData();
  setPosition(config)
  setTimeout(() => {
      const newToaster = createToaster(config)
      newToaster(message);
  }, config['delay'] * 1000);
}

function createToaster(config) {   
    return function(message) {
        let div = document.createElement("div");
        div.classList.add("toaster");
        div.textContent = message;
        toasterStack.appendChild(div);
        Object.assign(div.style, {
            backgroundColor: `${config['bg-color']}`,
            color: `${config['text-color']}`,
        })
            setTimeout( () => {
                toasterStack.removeChild(div)
            }, config['timeout'] * 1000)
    }
}

// Event evoker
generateBtn.addEventListener("click", toaster);
