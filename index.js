
var conteiner = document.getElementById('conteiner');

var form = document.createElement('form');
conteiner.appendChild(form);

form.style.height = '40px';
form.style.backgroundColor = 'black';
form.style.display = 'flex';
form.style.justifyContent = 'center';
form.style.alignItems = 'center';

var input = document.createElement('input');
form.appendChild(input);
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Enter city');
input.setAttribute('size', '50%');
input.setAttribute('id', 'input');
input.style.height = '60%';

var btn = document.createElement('button');
btn.innerHTML = 'GO';
btn.setAttribute('type', 'button');
btn.style.height = '80%';
form.appendChild(btn);
btn.addEventListener('click', function(){
    console.log(document.getElementById('input').value);
});

var cityWeatherListWrapper = document.createElement('div');
conteiner.appendChild(cityWeatherListWrapper);
cityWeatherListWrapper.style.display = 'flex';
cityWeatherListWrapper.style.justifyContent = 'center';

var cityWrapper = document.createElement('div');
conteiner.appendChild(cityWrapper);
cityWrapper.style.display = 'flex';
cityWrapper.style.justifyContent = 'space-between';

var cityWeatherItem = document.createElement('div');
cityWeatherListWrapper.appendChild(cityWeatherItem);
cityWeatherItem.style.backgroundColor = 'rgba(225, 90, 50, 0.4)';
cityWeatherItem.style.borderRadius = '5%';
cityWeatherItem.style.display = 'flex';
cityWeatherItem.style.flexWrap = 'wrap';
cityWeatherItem.style.width = '80%';
cityWeatherItem.style.justifyContent = 'space-around';
cityWeatherItem.style.position = 'relative';

var cityWeatherItemTitle = document.createElement('div');
cityWeatherItem.appendChild(cityWeatherItemTitle);
cityWeatherItemTitle.innerHTML = 'cityWeatherItemTitle';
cityWeatherItemTitle.style.width = '100%';
cityWeatherItemTitle.style.margin = '5px';

var cityWeatherItemIcon = document.createElement('div');
cityWeatherItem.appendChild(cityWeatherItemIcon);
cityWeatherItemIcon.innerHTML = 'cityWeatherItemIcon';
cityWeatherItemIcon.style.margin = '5px';

var cityWeatherItemTemp = document.createElement('div');
cityWeatherItem.appendChild(cityWeatherItemTemp);
cityWeatherItemTemp.innerHTML = 'cityWeatherItemTemp';
cityWeatherItemTemp.style.margin = '5px';

var cityWeatherItemStat = document.createElement('div');
cityWeatherItem.appendChild(cityWeatherItemStat);
cityWeatherItemStat.innerHTML = 'cityWeatherItemStat';
cityWeatherItemStat.style.margin = '5px';

var cityWeatherItemBtn = document.createElement('button');
cityWeatherItem.appendChild(cityWeatherItemBtn);
cityWeatherItemBtn.innerHTML = 'Delete';

cityWeatherItemBtn.setAttribute('type', 'button');
cityWeatherItemBtn.style.margin = '5px';
cityWeatherItemBtn.style.position = 'absolute';
cityWeatherItemBtn.style.right = '0';
cityWeatherItemBtn.style.top = '50%';
cityWeatherItemBtn.style.transform = 'translateY(-70%)';

cityWeatherItemBtn.addEventListener('click', function() {
console.log('sdfdsfdsf');
});



/* 
var xhttp = new XMLHttpRequest();
xhttp.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+'dnipro'+'&APPID=debcc5608fe431b85d94f538431287a0', true);
xhttp.send();
xhttp.addEventListener('readystatechange', function() {
    if(xhttp.status === 404) {
        alert('City not found');
    }
    if(xhttp.status === 200 && xhttp.readyState === 4) {
        var response = JSON.parse(xhttp.responseText);
        var icon = ("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
        conteiner.innerHTML = icon;
        console.log(response.name);
        console.log(response);
    }
});
 */


class GetUserWeather {
    constructor(viewUserWeather) {
      this.viewUserWeather = viewUserWeather;
    }

    weather() {
        if ("geolocation" in navigator) {
            this.getPos = this.getPos.bind(this);
            navigator.geolocation.getCurrentPosition(this.getPos);
        } else {
            alert('Weather by geoposition is not aviable');
        }
    }

    getPos(position) {
        this.lat = position.coords.latitude;    
        this.lon = position.coords.longitude;
        this.getWeather(this.lat, this.lon);
    }

    getWeather() {
        this.posXhttp = new XMLHttpRequest();
        this.posXhttp.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.lat + '&lon=' + this.lon + '&APPID=debcc5608fe431b85d94f538431287a0', true);
        this.posXhttp.send();
        this.getWeatherListener = this.getWeatherListener.bind(this);
        this.posXhttp.addEventListener('readystatechange', this.getWeatherListener);
    }

    getWeatherListener() {
        if(this.posXhttp.status === 404) {
            alert('City not found');
        }
        if(this.posXhttp.status === 200 && this.posXhttp.readyState === 4) {
            this.response = JSON.parse(this.posXhttp.responseText);
            this.icon = ("<img src='http://openweathermap.org/img/w/" + this.response.weather[0].icon + ".png'>");
            this.temp = Math.round(this.response.main.temp -273.15);
            this.city = this.response.name;
            this.status = this.response.weather[0].description;
            this.viewUserWeather.createWetherBlock(this.icon, this.temp, this.city, this.status);
        }
    }
}

class ViewUserWeather {
    constructor() {}
    createWetherBlock(icon, temp, city, status) {
        this.icon = icon;
        this.temp = temp;
        this.city = city;
        this.status = status;

        this.cityWeather = document.createElement('div');
        cityWrapper.appendChild(this.cityWeather);
        this.cityWeather.style.backgroundColor = 'rgba(255, 255, 0, 0.4)';
        this.cityWeather.style.borderRadius = '5%';
        this.cityWeather.style.margin = '10px';
        this.cityWeather.style.order = '0';

        this.cityWeatherTitle = document.createElement('div');
        this.cityWeather.appendChild(this.cityWeatherTitle);
        this.cityWeatherTitle.innerHTML = 'YOUR CITY';
        this.cityWeatherTitle.style.margin = '5px';

        this.cityWeatherStatus = document.createElement('div');
        this.cityWeather.appendChild(this.cityWeatherStatus);
        this.cityWeatherStatus.style.display = 'flex';
        this.cityWeatherStatus.style.alignItems = 'center';
        this.cityWeatherStatus.style.margin = '5px';
        this.cityWeatherStatus.style.justifyContent = 'space-around';

        this.cityWeatherStatusIcon = document.createElement('div');
        this.cityWeatherStatus.appendChild(this.cityWeatherStatusIcon);
        this.cityWeatherStatusIcon.innerHTML = this.icon;

        this.cityWeatherStatusTemp = document.createElement('div');
        this.cityWeatherStatus.appendChild(this.cityWeatherStatusTemp);
        this.cityWeatherStatus.style.display = 'flex';
        this.cityWeatherStatusTemp.innerHTML = this.temp + 'C<sup>o</sup>';

        this.cityWeatherName = document.createElement('div');
        this.cityWeather.appendChild(this.cityWeatherName);
        this.cityWeatherName.innerHTML = this.city + ' ' + this.status;
        this.cityWeatherName.style.margin = '5px';
    }
}





class Curr {
    constructor(viewCurr) {
        this.viewCurr = viewCurr;
    }
    getCurr() {
        this.xhttp = new XMLHttpRequest();
        this.xhttp.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', true);
        this.xhttp.send();
        this.getCurrLiistener = this.getCurrLiistener.bind(this);
        this.xhttp.addEventListener('readystatechange', this.getCurrLiistener);
    }

    getCurrLiistener() {
        if(this.xhttp.status === 200 && this.xhttp.readyState === 4) {
            this.response = JSON.parse(this.xhttp.responseText);
            this.usdBuy = this.response.find(
                response => response.ccy === 'USD').buy;
            this.usdSale = this.response.find(
                response => response.ccy === 'USD').sale;
            this.eurBuy = this.response.find(
                response => response.ccy === 'EUR').buy;
            this.eurSale = this.response.find(
                response => response.ccy === 'EUR').sale;
            this.rurBuy = this.response.find(
                response => response.ccy === 'RUR').buy;
            this.rurSale = this.response.find(
                response => response.ccy === 'RUR').sale;
            this.usdBuy = Math.round(this.usdBuy*100)/100;
            this.usdSale = Math.round(this.usdSale*100)/100;
            this.eurBuy = Math.round(this.eurBuy*100)/100;
            this.eurSale = Math.round(this.eurSale*100)/100;
            this.rurBuy = Math.round(this.rurBuy*100)/100;
            this.rurSale = Math.round(this.rurSale*100)/100;
            this.viewCurr.createBlock(this.usdBuy, this.usdSale, this.eurBuy,
                this.eurSale, this.rurBuy, this.rurSale);
        }
    }
}

class ViewCurr {
    constructor() {}

    createBlock(usdBuy, usdSale, eurBuy, eurSale, rurBuy, rurSale) {
        this.usdBuy = usdBuy;
        this.usdSale = usdSale;
        this.eurBuy = eurBuy;
        this.eurSale = eurSale;
        this.rurBuy = rurBuy;
        this.rurSale = rurSale;
        console.log(this.rurSale);
        this.currWrapper = document.createElement('div');
        cityWrapper.appendChild(this.currWrapper);
        this.currWrapper.style.backgroundColor = 'rgba(0, 50, 225, 0.4)';
        this.currWrapper.style.borderRadius = '5%';
        this.currWrapper.style.margin = '10px';
        this.currWrapper.style.order = '1';
        this.table = document.createElement('table');
        this.currWrapper.appendChild(this.table);
        this.table.innerHTML = "<tr><th></th><th>Покупка</th><th>Продажа</th></tr>"+
        "<tr><td>USD</td><td>" + this.usdBuy + "</td><td>" + this.usdSale + "</td></tr>"+
        "<tr><td>EUR</td><td>" + this.eurBuy + "</td><td>" + this.eurSale + "</td></tr>"+
        "<tr><td>RUR</td><td>" + this.rurBuy + "</td><td>" + this.rurSale + "</td></tr>";
    }

}




let viewCurr = new ViewCurr();
let curr = new Curr(viewCurr);
curr.getCurr();
let viewUserWeather = new ViewUserWeather();
let getUserWeather = new GetUserWeather(viewUserWeather);
getUserWeather.weather();










