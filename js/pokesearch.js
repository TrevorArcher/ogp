if (document.body.classList) {

var mainContent = document.getElementsByTagName('main')[0],
    $results = document.getElementsByClassName('search-results')[0],
    $infoOver = document.getElementById('info-overlay'),
    $buttons = document.getElementsByTagName('button'),
    pTypeArr = [],
    pObj;
var typeSearchArr = ['Normal','Fire','Water','Grass','Electric','Ice','Fighting','Poison','Ground','Rock','Flying','Bug','Psychic','Ghost','Dragon','Dark','Steel','Fairy'];
var buttonBuild = function(){
  var typeForm = document.createElement('form'),
      typeField = document.createElement('fieldset'),
      typeDiv = document.createElement('div'),
      searchDiv = document.createElement('div');
  typeDiv.setAttribute('id', 'type-menu');
  searchDiv.setAttribute('id', 'form-btns');
  typeForm.setAttribute('method', 'get');
  for (var i = 0 ; i < typeSearchArr.length ; i++) {
    var currentType = typeSearchArr[i],
        typeButton = document.createElement('button');
    typeButton.setAttribute('type', 'button');
    typeButton.setAttribute('value', currentType.toLowerCase());
    typeButton.setAttribute('class', 'type ' + currentType.toLowerCase());
    typeButton.textContent = currentType;
    typeDiv.appendChild(typeButton);
  }
  var searchButton = document.createElement('button');
  searchButton.setAttribute('type', 'button');
  searchButton.setAttribute('value', 'submit');
  searchButton.setAttribute('class', 'search-submit');
  searchButton.textContent = 'Search';
  searchDiv.appendChild(searchButton);
  var resetButton = document.createElement('button');
  resetButton.setAttribute('type', 'button');
  resetButton.setAttribute('value', 'submit');
  resetButton.setAttribute('class', 'search-reset');
  resetButton.textContent = 'Reset';
  searchDiv.appendChild(resetButton);
  typeField.appendChild(typeDiv);
  typeField.appendChild(searchDiv);
  typeForm.appendChild(typeField);
  mainContent.insertBefore(typeForm, mainContent.childNodes[0]);
}();
var typeSelect = document.getElementsByClassName('type');
for (var i = 0 ; i < typeSelect.length ; i++) {
  typeSelect[i].onclick = function(){
    var thisType = this.value;
    if (pTypeArr.includes(thisType) && (this.classList.contains(thisType + '-select'))){
        pTypeArr.splice(pTypeArr.indexOf(thisType),1);
    } else {
      pTypeArr.push(thisType);
    }
    this.classList.toggle(thisType);
    this.classList.toggle(thisType + '-select');
    this.classList.toggle('type-select');
  };
}
document.getElementsByClassName('search-reset')[0].onclick = function(){
  pTypeArr = [];
  $results.innerHTML = '';
  for (var i = 0 ; i < typeSelect.length ; i++) {
    if (typeSelect[i].classList.contains('type-select')) {
      typeSelect[i].classList.add(typeSelect[i].value);
      typeSelect[i].classList.remove('type-select');
      typeSelect[i].classList.remove(typeSelect[i].value + '-select');
    }
  }
};
var requestFun = function() {
  var r = new XMLHttpRequest();
  r.onreadystatechange = function () {
  	if (r.readyState != 4 || r.status != 200) return;
    buildResults(this);
  };
  r.open("GET", "https://trevorarcher.github.io/ogp/json/ogpokemon.json", true);
  r.send();
};
var buildResults = function(xml) {
  pObj = JSON.parse(xml.responseText);
  for(var i = 0 ; i < pObj.pokemon.length ; i++) {
    var nextP = pObj.pokemon[i],
    pName = nextP.name;
    var cardLink = document.createElement('a');
    cardLink.setAttribute('href', 'more.html#' + pName);
    var cardButton = document.createElement('button');
    cardButton.setAttribute('class', 'info-card');
    cardButton.setAttribute('value', nextP.id);
    var namePar = document.createElement('p');
    var nameParText = document.createTextNode(pName);
    namePar.setAttribute('class', 'info-name');
    var typeContain = document.createElement('span');
    typeContain.setAttribute('class', 'type-container');
    if ((pTypeArr.includes(nextP.types[0]) || pTypeArr.includes(nextP.types[1]))) {
      namePar.appendChild(nameParText);
      cardButton.appendChild(namePar);
      for (var j = 0 ; j < nextP.types.length ; j++) {
        var type = document.createElement('span');
        type.setAttribute('class', 'info-type ' + nextP.types[j] + '-select');
        var typePar = document.createElement('p');
        var typeParText = document.createTextNode(nextP.types[j]);
        typePar.appendChild(typeParText);
        type.appendChild(typePar);
        typeContain.appendChild(type);
      }
      cardButton.appendChild(typeContain);
      cardLink.appendChild(cardButton);
      $results.appendChild(cardLink);
    }
  }
};
document.getElementsByClassName('search-submit')[0].onclick = function(){
  $results.innerHTML = '';
  requestFun();
};
}
