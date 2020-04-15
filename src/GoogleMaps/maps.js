//kode av Magnus Anfinnsen

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelectorAll('#map').length > 0)
    {
      if (document.querySelector('html').lang)
        lang = document.querySelector('html').lang;
      else
        lang = 'en';
  
      var js_file = document.createElement('script');
      js_file.type = 'text/javascript';
      js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&key=AIzaSyD0LKJzpEieP6N_k9SlZzIjzApLu5wKk84&language=' + lang;
      document.getElementsByTagName('head')[0].appendChild(js_file);
    }
  });
  
  //navn på sjangere i json
  var truegenre = ['boardgames', 'homework', 'music', 'party', 'sport', 'videogames'];
  var truegenres = ['dugnad', 'handel', 'samfunn', 'sport', 'studie', 'brettspill', 'videospill', 'musikk', 'fest'];
  //kartet
  var map;
  //table som blir brukt for å holder på markere
  var markersArray = [];
  var allMarkers = [];
  //tekst variabel
  var txt = "";
  var aButtons = "";
  
  //start posisjon for veivisning
  var curPos = {lat: 59.403053, lng: 9.070825}; 
  //mål for veivisning
  var eventPos;
  
  //variabel som bestemmer hvor på google maps vinduet viser brukeren
  var bounds;
  
  //variabel for å skjekke hvilken marker som er valgt
  var activeInfo;
  
  //variabler for at veivisning skal fungere
  let directionsService;
  let directionsDisplay;
  
  
  //kode for å lage selve kartet
  function initMap()
  {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
      zIndex: 1,
  
      //disableDefaultUI: true,
      //draggable: false,    
    });
  
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({map: map});
  
    //henter json fra github, burde fungere fra andre linksources så lenge json-filen er raw
    fetch('https://raw.githubusercontent.com/Potatamas/xmltest/master/noe2.json')
      .then(function(response){return response.json()})
      .then(plotMarkers);
  
    //kjører metoden som lager knappenen
    plotButtons();
  
  
  
  
  }
  
  
  
  
  //koden som plasserer markers og infoteksts
  function plotMarkers(m)
  {
   var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
   
   /*
    var blackbox = document.createElement('div');
    blackbox.style.height = '100%';
    blackbox.style.width = '100%';
    blackbox.style.background = 'black';
    blackbox.style.opacity = '0.8';
    blackbox.style.top = '0px'
    blackbox.style.left= '0px'
    blackbox.style.position = 'absolute';
    blackbox.style.zIndex = '4';
    
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(blackbox);
   */ 
  
    bounds = new google.maps.LatLngBounds();
  
    m.forEach(function (marker) {
  
      //variabler som blir brukt i loopen som startet forrige linje
      var position = new google.maps.LatLng(marker.lat, marker.lng); //posisjon for marker og infowindow
      var contentString = marker.info;
      var txtString = marker.txt;
      var genreString = marker.genre;
      var linkString = marker.link;
      var bildeString = marker.bilde; //henter bare navnet på bildet, se neste variabel hvis innhold skal forandres (f.eks om json filen allerede har .png i stringen)
      
       //Tekst innhold av informasjonsvindu
       var contentString2 = 
          '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading"> <a href="http://www.google.com">' + contentString + '</a> </h1>'+
          '<div id="bodyContent">'+
           '<img src="innholdbilder/' + bildeString + '.png" width="300" height="200" />' +
          '<p>' + txtString + '</p>'+
          '</div>'+
          '</div>';
  
  
  
      //Kode for at markørikoner er i rette størrelse    
      var icon = {
        url: 'bilder/' + genreString + '.png',
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
      };
  
      //kode for informasjonsvindu
      var infowindow =  new google.maps.InfoWindow({
        content: contentString2,
        map: map,    
        position: position
      });
  
      //kode for markørinnhold
      var markar = new google.maps.Marker({
          position: position,
          map: map,
          icon: icon,
          animation: google.maps.Animation.DROP,
          url: linkString,
          category: genreString 
      });
  
      markar.setMap(null);
      allMarkers.push(markar);
      markersArray.push(markar);
   
  
  
      //gjemmer info tekst til du hover med musa
      infowindow.close();
  
      google.maps.event.addListener(markar, 'click', function() {
        if (activeInfo) { activeInfo.close();}
        infowindow.open(map, this);
        activeInfo = infowindow;   
        eventPos = this.position;
      });
  
      google.maps.event.addListener(map, 'click', function(){
              infowindow.close(map, marker);
          });
  
      //sørger for at alle markers er på skjermen under oppstart av googlemaps vinduet
      bounds.extend(position);
  
    });
  
    for (var i = 0;  i < allMarkers.length; i++)allMarkers[i].setMap(map);
    
    map.fitBounds(bounds);
  
  
  
  
  }
  
  //hovedfunskjon for å lage knapper med klikk funsjoner
  function plotButtons() {
  
      for (i = 0; i < truegenres.length; i++){
        //sjanger knapper
        var controlDiv = document.createElement('div');
  
        controlDiv.style.cursor = 'pointer';
        controlDiv.style.borderRadius = '3px';
        controlDiv.style.height = '30px';
        controlDiv.style.width = '30px';
        controlDiv.className = 'button';
        controlDiv.style.marginLeft = '10px';
        controlDiv.style.marginTop = '10px';
        controlDiv.style.position = 'absolute';
        controlDiv.style.zIndex = '1';
  
  
  
        controlDiv.style.backgroundImage = "url(bilder/" + truegenres[i] + "icon.png)";
  
        //all knapp
        var controlDiv2 = document.createElement('div');
  
        controlDiv2.style.cursor = 'pointer';
        controlDiv2.style.borderRadius = '3px';
        controlDiv2.style.height = '30px';
        controlDiv2.style.width = '30px';
        controlDiv2.style.marginLeft = '30px';
        controlDiv2.style.marginTop = '10px';
        controlDiv2.style.opacity = '0.5';
        controlDiv2.style.position = 'absolute';
        controlDiv2.style.zIndex = '1';
  
        controlDiv2.style.backgroundImage = "url(bilder/allicon.png)";
       
        //veivisning knapp
        var controlDiv3 = document.createElement('div');
  
        controlDiv3.style.cursor = 'pointer';
        controlDiv3.style.borderRadius = '3px';
        controlDiv3.style.height = '30px';
        controlDiv3.style.width = '127px';
        controlDiv3.style.left = '0px';
        controlDiv3.style.top = '0px';
        controlDiv3.style.marginLeft = '30px';
        controlDiv3.style.marginTop = '10px';
        controlDiv3.style.position = 'absolute';
        controlDiv3.style.zIndex = '1';
  
        controlDiv3.style.backgroundImage = "url(bilder/vvicon.png)";
  
        //click-funksjon for knappetrykk av sjangere 
        (function (n) {
        var aButtons = document.getElementsByClassName('button');
        var txt = this.truegenres[i]; 
  
          google.maps.event.addDomListener(controlDiv, 'click', function(event) { 
       
            setAllOverlays();        
            for (var i = 0; i < markersArray.length; i++ ) {
              if (markersArray[i].get("category") != txt) {
                markersArray[i].setMap(null);
              }
            }
  
            hightlightButton(this);
            controlDiv2.style.opacity = '1';
          });
        }(i)); 
  
  
  
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv);
        
    }
  
    //click-funskjon for all-knapp
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv2);
  
    google.maps.event.addDomListener(controlDiv2, 'click', function() {   
      this.style.opacity = '0.5';
      var aButtons = document.getElementsByClassName('button');
      for (var i = 0; i < aButtons.length; i++) aButtons[i].style.opacity = '1';
      setAllOverlays();
    });     
  
  
  
    //click-funskjon for veiviserknapp
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv3);
  
    google.maps.event.addDomListener(controlDiv3, 'click', function() {   
      getRoute(eventPos);
    });   
  }
  
  
  
  //funksjon for å vise at en sjanger er valgt og rester er ikke valgt
  function hightlightButton(oElement) {
      var aButtons = document.getElementsByClassName('button');
      for (var i = 0; i < aButtons.length; i++) aButtons[i].style.opacity = '1';
      oElement.style.opacity = '0.5';
  }
  
  
  //funksjon for å unselecte knapper når du trykker på "all"-button
  function setAllOverlays() {
    for (var i = 0; i < markersArray.length; i++ ) {
      markersArray[i].setMap(map);
      }
    }
  
  //funksjon for veivisningsstrek
  function getRoute(position) {
  
    directionsService.route({
      origin: curPos,
      destination: position,
      travelMode: 'WALKING'
    }, (result, status) => {
      if (status !== 'OK') return alert(`Error: ${status}`);
      directionsDisplay.setDirections(result);
    });
  }