
var conteiner = document.getElementById('conteiner')
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
    var lat = Math.round(position.coords.latitude * 100) / 100;    
    var lon = Math.round(position.coords.longitude * 100) / 100;
    var zxhttp = new XMLHttpRequest();
    zxhttp.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=debcc5608fe431b85d94f538431287a0', true);
    zxhttp.send();
    zxhttp.addEventListener('readystatechange', function() {
       /*  if(xhttp.status === 404) {
            alert('City not found');
        } */
        if(zxhttp.status === 200 && zxhttp.readyState === 4) {
            var response = JSON.parse(zxhttp.responseText);
            var icon = ("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
            conteiner.innerHTML = icon;
            console.log(response.name);
            console.log(response);
        }
    });

        








    });
  }



