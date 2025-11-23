const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("button");
  const fromCurr = document.querySelector("#from");
  const toCurr = document.querySelector("#to");
  const msg = document.querySelector(".msg");
  const amountInput = document.querySelector(".amount input");
  
  for(let select of dropdowns){
    for(let code in countryList){
      let newOption = document.createElement("option");
      newOption.innerText = code;
      newOption.value = code;
      if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt)=>{
   updateFlag(evt.target);
   }); 
  }

  const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


const updateFlag = (element) => {
  let code = element.value;
  let countryCode = countryList[code];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
  });


window.addEventListener("load", () => {
  updateExchangeRate();
});
  