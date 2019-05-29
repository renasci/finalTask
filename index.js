
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

var cityWeather = document.createElement('div');
cityWrapper.appendChild(cityWeather);
cityWeather.style.backgroundColor = 'rgba(255, 255, 0, 0.4)';
cityWeather.style.borderRadius = '5%';
cityWeather.style.margin = '10px';

var cityWeatherTitle = document.createElement('div');
cityWeather.appendChild(cityWeatherTitle);
cityWeatherTitle.innerHTML = 'YOUR CITY';
cityWeatherTitle.style.margin = '5px'

var cityWeatherStatus = document.createElement('div');
cityWeather.appendChild(cityWeatherStatus);
cityWeatherStatus.style.display = 'flex';
cityWeatherStatus.style.margin = '5px'
cityWeatherStatus.style.justifyContent = 'space-around';

var cityWeatherStatusIcon = document.createElement('div');
cityWeatherStatus.appendChild(cityWeatherStatusIcon);
cityWeatherStatusIcon.innerHTML = '-\\-';

var cityWeatherStatusTemp = document.createElement('div');
cityWeatherStatus.appendChild(cityWeatherStatusTemp);
cityWeatherStatusTemp.innerHTML = '-\\-';

var cityWeatherName = document.createElement('div');
cityWeather.appendChild(cityWeatherName);
cityWeatherName.innerHTML = '-\\-';
cityWeatherName.style.margin = '5px'

var currWrapper = document.createElement('div');
cityWrapper.appendChild(currWrapper);
currWrapper.style.display = 'flex';
currWrapper.style.backgroundColor = 'rgba(0, 50, 225, 0.4)';
currWrapper.style.borderRadius = '5%';
currWrapper.style.margin = '10px';

var currUsd = document.createElement('div');
currWrapper.appendChild(currUsd);
currUsd.innerHTML = 'USD</br>-\\-';
currUsd.style.margin = '5px';
currUsd.style.display = 'flex';
currUsd.style.alignItems = 'center';

var currEur = document.createElement('div');
currWrapper.appendChild(currEur);
currEur.innerHTML = 'EUR</br>-\\-';
currEur.style.margin = '5px';
currEur.style.display = 'flex';
currEur.style.alignItems = 'center';

var currRur = document.createElement('div');
currWrapper.appendChild(currRur);
currRur.innerHTML = 'RUR</br>-\\-';
currRur.style.margin = '5px';
currRur.style.display = 'flex';
currRur.style.alignItems = 'center';


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

/* var btn = document.createElement('button');
btn.innerHTML = 'GO';
btn.setAttribute('type', 'button');
btn.style.height = '80%';
form.appendChild(btn); */







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

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position){
    console.log( 'latitude: '+position.coords.latitude+'  longitude: '+position.coords.longitude);
    var lat = position.coords.latitude;    
    var lon = position.coords.longitude;
      


    var posXhttp = new XMLHttpRequest();
    posXhttp.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=debcc5608fe431b85d94f538431287a0', true);
    posXhttp.send();
    posXhttp.addEventListener('readystatechange', function() {
        if(posXhttp.status === 404) {
            alert('City not found');
        }
        if(posXhttp.status === 200 && posXhttp.readyState === 4) {
            var response = JSON.parse(posXhttp.responseText);
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
            conteiner.innerHTML = icon;
            console.log(response.name);
            console.log(response);
        }
    });

        








    });
  }

 */

