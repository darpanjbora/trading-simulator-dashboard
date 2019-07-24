window.onload = function () {
    console.log("LOADED");
    getBuyData();
    getSellData();
};


function getBuyData() {

    var request = new XMLHttpRequest();

    request.open('GET', "http://localhost:8082/trade/findallbuy", true);

    request.onload = function () {

        var data = JSON.parse(this.response);

        console.log(data);

        var table = document.getElementsByTagName("table")[0];

        if (request.status >= 200 && request.status < 400) {

            for (let [key, value] of Object.entries(data)) {

                var newRow = table.insertRow(1);

                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                var cell3 = newRow.insertCell(2);
                var cell4 = newRow.insertCell(3);

                cell1.innerHTML = value.baseCurr;
                cell2.innerHTML = value.tradeCurr;
                cell3.innerHTML = value.quantity;
                cell4.innerHTML = value.price;

                console.log(value.price);
            }
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
        }
    }
    request.send();
}

function getSellData() {

    var request = new XMLHttpRequest();

    request.open('GET', "http://localhost:8082/trade/findallsell", true);

    request.onload = function () {

        var data = JSON.parse(this.response);

        console.log(data);

        var table = document.getElementsByTagName("table")[1];

        if (request.status >= 200 && request.status < 400) {

            for (let [key, value] of Object.entries(data)) {

                var newRow = table.insertRow(1);

                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                var cell3 = newRow.insertCell(2);
                var cell4 = newRow.insertCell(3);

                cell1.innerHTML = value.baseCurr;
                cell2.innerHTML = value.tradeCurr;
                cell3.innerHTML = value.quantity;
                cell4.innerHTML = value.price;

                console.log(value.price);
            }
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
        }
    }
    request.send();
}

