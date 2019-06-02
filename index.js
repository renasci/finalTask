
document.addEventListener('DOMContentLoaded', function() {
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
        this.posXhttp.open('GET', 
        'http://api.openweathermap.org/data/2.5/weather?lat=' 
        + this.lat + '&lon=' + this.lon + 
        '&APPID=debcc5608fe431b85d94f538431287a0', true);
        this.posXhttp.send();
        this.getWeatherListener = this.getWeatherListener.bind(this);
        this.posXhttp.addEventListener('readystatechange',
            this.getWeatherListener);
    }

    getWeatherListener() {
        if(this.posXhttp.status === 404) {
            alert('City not found');
        }
        if(this.posXhttp.status === 200 && this.posXhttp.readyState === 4) {
            this.response = JSON.parse(this.posXhttp.responseText);
            this.icon = ("<img src='http://openweathermap.org/img/w/" +
                this.response.weather[0].icon + ".png'>");
            this.temp = Math.round(this.response.main.temp -273.15);
            this.city = this.response.name;
            this.status = this.response.weather[0].description;
            this.viewUserWeather.createWetherBlock(this.icon, this.temp, 
                this.city, this.status);
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
        this.xhttp.open('GET', 
            'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', true);
        this.xhttp.send();
        this.getCurrLiistener = this.getCurrLiistener.bind(this);
        this.xhttp.addEventListener('readystatechange', this.getCurrLiistener);
        setInterval(this.getCurr.bind(this), 1000*60*60);
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
            this.viewCurr.createBlock();
            this.viewCurr.addCurr(this.usdBuy, this.usdSale, this.eurBuy,
                this.eurSale, this.rurBuy, this.rurSale);
        }
    }
}

class ViewCurr {
    constructor() {}

    createBlock () {
        currWrapper.innerHTML = '';
        currWrapper = document.createElement('div');
        cityWrapper.appendChild(currWrapper);
        currWrapper.style.backgroundColor = 'rgba(0, 50, 225, 0.4)';
        currWrapper.style.borderRadius = '5%';
        currWrapper.style.margin = '10px';
        currWrapper.style.order = '1';
        this.table = document.createElement('table');
        currWrapper.appendChild(this.table);
    }

    addCurr(usdBuy, usdSale, eurBuy, eurSale, rurBuy, rurSale) {
        this.usdBuy = usdBuy;
        this.usdSale = usdSale;
        this.eurBuy = eurBuy;
        this.eurSale = eurSale;
        this.rurBuy = rurBuy;
        this.rurSale = rurSale;
        this.table.innerHTML = "<tr><th></th><th>Покупка</th>" + 
        "<th>Продажа</th></tr>"+ "<tr><td>USD</td><td>" + this.usdBuy +
        "</td><td>" + this.usdSale + "</td></tr>"+ "<tr><td>EUR</td><td>"
        + this.eurBuy + "</td><td>" + this.eurSale + "</td></tr>"+
        "<tr><td>RUR</td><td>" + this.rurBuy + "</td><td>" + this.rurSale
        + "</td></tr>";
    }
}

class CreateForm {
    constructor() {}
    create() {
        this.form = document.createElement('form');
        conteiner.appendChild(this.form);
        this.form.style.height = '40px';
        this.form.style.display = 'flex';
        this.form.style.justifyContent = 'center';
        this.form.style.alignItems = 'center';
        
        this.input = document.createElement('input');
        this.form.appendChild(this.input);
        this.input.setAttribute('type', 'text');
        this. input.setAttribute('placeholder', 'Enter city');
        this.input.setAttribute('size', '50%');
        this.input.setAttribute('id', 'input');
        this.input.style.height = '60%';
        this.input.setAttribute('id', 'form-input');

        this.btn = document.createElement('button');
        this.btn.innerHTML = 'Add';
        this.btn.setAttribute('type', 'button');
        this.btn.style.height = '80%';
        this.form.appendChild(this.btn);
        this.btn.setAttribute('id', 'form-btn');
    }
}

class CreateWeatherItem {
    constructor() {}
    
    getCityWeather(city) {
        this.city = city;
        this.weatherList = localStorage.getItem('weatherList');
        this.weatherList = JSON.parse(this.weatherList);
        this.check = this.weatherList.findIndex(cityName => 
            cityName.name.toLowerCase() === this.city.toLowerCase());
        if (this.city === "") {
            alert('Enter city');
        } else if (this.check > -1) {
            alert('City already in the list');
        } else {
            this.xhttp = new XMLHttpRequest();
            this.xhttp.open('GET', 
                'https://api.openweathermap.org/data/2.5/weather?q=' 
                + this.city + '&APPID=debcc5608fe431b85d94f538431287a0', true);
            this.xhttp.send();
            this.getCityWeatherListener = this.getCityWeatherListener.bind(this,);
            this.xhttp.addEventListener('readystatechange', 
                this.getCityWeatherListener);
        }
    }

    getCityWeatherListener() {
        if(this.xhttp.status === 404 && this.xhttp.readyState === 4) {
            alert('City not found');
        }
        if(this.xhttp.status === 200 && this.xhttp.readyState === 4) {
            this.response = JSON.parse(this.xhttp.responseText);
            this.addWeatherToList(this.response);
        }
    }

    addWeatherToList(response) {
        this.response = response;
        this.weatherList = localStorage.getItem('weatherList');
        this.weatherList = JSON.parse(this.weatherList);
        this.weatherList.push(this.response);
        this.weatherList = JSON.stringify(this.weatherList);
        localStorage.setItem('weatherList', this.weatherList);
        this.getListWeather();
    }

    deleteCityWeather(target) {
        this.target = target;
        this.weatherList = localStorage.getItem('weatherList');
        this.weatherList = JSON.parse(this.weatherList);
        this.weatherList = this.weatherList.filter(city => 
            city.name !== this.target);
        this.weatherList = JSON.stringify(this.weatherList);
        localStorage.setItem('weatherList', this.weatherList);
        this.getListWeather();
    }

    getListWeather() {
        cityWeatherListWrapper.innerHTML = '';
        this.weatherList = localStorage.getItem('weatherList');
        this.weatherList = JSON.parse(this.weatherList);
        this.weatherList.forEach(element => {
            this.cityName = element.name;
            this.country = element.sys.country;
            this.icon = "<img src='http://openweathermap.org/img/w/" 
                + element.weather[0].icon + ".png'>";
            this.temp = Math.round(element.main.temp -273.15);
            this.stat = element.weather[0].description;
            this.wind = element.wind.speed;
            this.hum = element.main.humidity;
            this.create(this.cityName, this.country, this.icon, 
                this.temp, this.stat, this.wind, this.hum);
        });
    }

    create(cityName, country, icon, temp, stat, wind, hum) {
        this.cityName = cityName;
        this.country = country;
        this.icon = icon;
        this.temp = temp;
        this.stat = stat;
        this.wind = wind;
        this.hum = hum;

        this.cityWeatherItem = document.createElement('div');
        cityWeatherListWrapper.appendChild(this.cityWeatherItem);
        this.cityWeatherItem.style.backgroundColor = 'rgba(225, 90, 50, 0.4)';
        this.cityWeatherItem.style.borderRadius = '5%';
        this.cityWeatherItem.style.display = 'flex';
        this.cityWeatherItem.style.flexWrap = 'wrap';
        this.cityWeatherItem.style.width = '80%';
        this.cityWeatherItem.style.justifyContent = 'space-around';
        this.cityWeatherItem.style.position = 'relative';
        this.cityWeatherItem.style.margin = '5px';
        
        this.cityWeatherItemTitle = document.createElement('div');
        this.cityWeatherItem.appendChild(this.cityWeatherItemTitle);
        this.cityWeatherItemTitle.innerHTML = this.cityName + ', ' 
            + this.country;
        this.cityWeatherItemTitle.style.width = '100%';
        this.cityWeatherItemTitle.style.margin = '5px';
        
        this.cityWeatherItemIcon = document.createElement('div');
        this.cityWeatherItem.appendChild(this.cityWeatherItemIcon);
        this.cityWeatherItemIcon.innerHTML = this.icon;
        this.cityWeatherItemIcon.style.margin = '5px';
        
        this.cityWeatherItemTemp = document.createElement('div');
        this.cityWeatherItem.appendChild(this.cityWeatherItemTemp);
        this.cityWeatherItemTemp.innerHTML = this.temp + 'C<sup>o</sup>';
        this.cityWeatherItemTemp.style.margin = '5px';
        
        this.cityWeatherItemStat = document.createElement('div');
        this.cityWeatherItem.appendChild(this.cityWeatherItemStat);
        this.cityWeatherItemStat.innerHTML = this.stat + '</br>Wind: ' 
        + this.wind + 'm/s' + '</br>Humidity: ' + this.hum + '%';
        this.cityWeatherItemStat.style.margin = '5px';
        
        this.cityWeatherItemBtn = document.createElement('button');
        this.cityWeatherItem.appendChild(this.cityWeatherItemBtn);
        this.cityWeatherItemBtn.innerHTML = 'Delete';
        this.cityWeatherItemBtn.setAttribute('type', 'button');
        this.cityWeatherItemBtn.style.margin = '5px';
        this.cityWeatherItemBtn.style.position = 'absolute';
        this.cityWeatherItemBtn.style.right = '0';
        this.cityWeatherItemBtn.style.top = '50%';
        this.cityWeatherItemBtn.style.transform = 'translateY(-70%)';
        this.cityWeatherItemBtn.className = this.cityName;
        this.deleteCityListener = this.deleteCityListener.bind(this,);
        this.cityWeatherItemBtn.addEventListener('click', 
            this.deleteCityListener);
    }

    deleteCityListener() {
        this.deleteCityWeather(event.target.className);
    }
}

class FormListener {
    constructor(model) {
        this.model = model;
    }

    setListener() {
        this.btn = document.getElementById('form-btn');
        this.input = document.getElementById('form-input');
        this.listener = this.listener.bind(this,);
        this.btn.addEventListener('click', this.listener);
    }

    listener() {
        this.model.getCityWeather(this.input.value);
    }
}

let conteiner = document.getElementById('conteiner');

let createForm = new CreateForm();
createForm.create();

let cityWeatherListWrapper = document.createElement('div');
conteiner.appendChild(cityWeatherListWrapper);
cityWeatherListWrapper.style.display = 'flex';
cityWeatherListWrapper.style.flexDirection = 'column';
cityWeatherListWrapper.style.alignItems = 'center';

let cityWrapper = document.createElement('div');
conteiner.appendChild(cityWrapper);
cityWrapper.style.display = 'flex';
cityWrapper.style.justifyContent = 'space-between';

if(localStorage.getItem('weatherList') === null) {
    weatherList = [];
    weatherList = JSON.stringify(weatherList);
    localStorage.setItem('weatherList', weatherList);
}

let createWeatherItem = new CreateWeatherItem();
createWeatherItem.getListWeather();

let formListener = new FormListener(createWeatherItem);
formListener.setListener();

let viewCurr = new ViewCurr();
let curr = new Curr(viewCurr);
curr.getCurr();

let currWrapper = {};
let viewUserWeather = new ViewUserWeather();
let getUserWeather = new GetUserWeather(viewUserWeather);
getUserWeather.weather();
});












