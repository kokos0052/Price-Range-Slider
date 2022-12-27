const rangeInput = document.querySelectorAll(".range input");
const priceInput = document.querySelectorAll(".price input");
const range = document.querySelector(".slider .progress");
const sendButton = document.querySelector(".sender button");

let priceGap = 1000;

async function sendData(url, data, config) {
    const domain = "http://127.0.0.1:8080";
  
    const request = await fetch(`${domain}/${url}`, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    });
  
    return request.json();
}

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value);
        let maxPrice = parseInt(priceInput[1].value);
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);
        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

sendButton.addEventListener("click", (e) => {
    e.preventDefault();

    const data = {
        minPrice: parseInt(rangeInput[0].value),
        maxPrice: parseInt(rangeInput[1].value),
    }

    sendData("send", data);
})