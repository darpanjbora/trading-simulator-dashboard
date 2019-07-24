var basecurrency = "";
var quotecurrency = "";
var rate = "";
var quantity = "";
var type = "";
var id = 100;
var url = "";

function getData() {

    basecurrency = document.getElementById("base-currency").value;
    quotecurrency = document.getElementById("quote-currency").value;

    url = 'https://api.exchangeratesapi.io/latest?base=';
    url = url + basecurrency + "&symbols=" + quotecurrency;

    console.log(url);

    var request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onload = function () {

        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {

            var card1 = document.getElementById('base');
            var p = document.getElementById('heading')
            p.textContent = data.base;
            p.setAttribute('align', 'center');

            for (let [key, value] of Object.entries(data.rates)) {
                console.log(`key=${key} value=${value}`)
                rate = value;
                p.textContent = value;
                p.setAttribute('align', 'center');

            }
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
        }
    }
    request.send();
}


function storeData() {

    quantity = document.getElementById("quantity").value;

    type = document.getElementById('buy').checked === true ? "buy" : "sell";

    var data = JSON.stringify({
        "id": id,
        "price": rate,
        "baseCurr": basecurrency,
        "tradeCurr": quotecurrency,
        "quantity": quantity
    });

    console.log(data);

    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
              id = id + 1;
              console.log(this.responseText);
              console.log(id);
              alert("Thank you for using our service!");
        }
    });

    url = type === "buy" ? "http://localhost:8082/trade/add/buy" : "http://localhost:8082/trade/add/sell";

    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);

}
    // const app = document.getElementById('root');

    // const container = document.getElementById('cont');
    // container.innerHTML = "";

    // var request = new XMLHttpRequest();

    // request.open('GET', url, true);
    // request.onload = function () {

    //   // Begin accessing JSON data here
    //   var data = JSON.parse(this.response);
    //   if (request.status >= 200 && request.status < 400) {

    //     var card1 = document.getElementById('base');
    //     var p = document.getElementById('heading')
    //     p.textContent = data.base;
    //     p.setAttribute('align', 'center');

    //     var date = document.getElementById('date');
    //     var datep = document.getElementById('date_time');
    //     datep.textContent = new Date();

    //     var x = document.getElementById("cont")
    //     x.innerHTML = "";

    //     for (let [key, value] of Object.entries(data.rates)) {
    //       console.log(`key=${key} value=${value}`)

    //       var card = document.createElement('div');
    //       card.setAttribute('class', 'card');

    //       var h1 = document.createElement('h1');
    //       h1.textContent = key;

    //       var p = document.createElement('p');
    //       p.textContent = value;
    //       p.setAttribute('align', 'center');

    //       container.appendChild(card);
    //       card.appendChild(h1);
    //       card.appendChild(p);

    //     }
    //   } else {
    //     const errorMessage = document.createElement('marquee');
    //     errorMessage.textContent = `Gah, it's not working!`;
    //     app.appendChild(errorMessage);
    //   }
    // }
    // request.send();
    // window.setInterval('refresh()',5000);
