var mainContent = document.getElementsByTagName('main')[0],
    $results = document.getElementsByClassName('search-results')[0],
    $infoOver = document.getElementById('info-overlay'),
    $buttons = document.getElementsByTagName('button'),
    pNameArr = [],
    pTypeArr = [],
    pObj;


//type menu generation (good to go!)
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



//Menu search (good to go!) refactor: add click event to fieldset instead of individual buttons
var typeSelect = document.getElementsByClassName('type');
console.log(typeSelect);
for (var i = 0 ; i < typeSelect.length ; i++) {
  typeSelect[i].onclick = function(){
    var thisType = this.value;
    if (pTypeArr.includes(thisType) && (this.classList.contains(thisType + '-select'))){
        pTypeArr.splice(pTypeArr.indexOf(thisType),1);
        console.log(pTypeArr);
        console.log('type removed!');
    } else {
      pTypeArr.push(thisType);
      console.log(pTypeArr);
      console.log('type has been added!');
    }
    this.classList.toggle(thisType);
    this.classList.toggle(thisType + '-select');
    this.classList.toggle('type-select');
    console.log(thisType);
  };
}

//good to go!
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

//figure out proper keypress, put into function to call for both static and created cards

var moreInfo = function() {
  $results.addEventListener('click', function(e) {
    e.preventDefault();
    console.log(e.target.value);
    console.log('not going anywhere');
  //   var $infoText = $('<div class="info-text">'),
  //       $htWt = $('<div class="ht-wt">'),
  //       $ht = $('<h3 class="ht"></h3>'),
  //       $wt = $('<h3 class="wt"></h3>'),
  //       pId = '',
  //       pName = ($(this).find($('.info-name')).text()),
  //       pHt = '',
  //       pWt = '',
  //
  //   var thisId = this.getAttribute('value');
  //
  //   $(this).toggleClass('more-info');
  //   $('.info-text').empty();
  //   $infoOver.fadeToggle();
  //   if ($(this).hasClass('more-info')){
  //     $.ajax({
  //       type: 'GET',
  //       url: 'scrapes/pokemon/'+ thisId +'.json',
  //       dataType: 'json',
  //       success: function(result){
  //         console.log(result);
  //         pId = result.id;
  //         pHt = (result.height) / 10;
  //         pWt = (result.weight) / 10;
  //         $infoOver.append($infoText);
  //         if (pId.toString().length == 1) {
  //           $infoText.append($('<h1 class="name-overlay">').text('#00' + pId + ' ' + pName));
  //         } else if (pId.toString().length == 2) {
  //           $infoText.append($('<h1 class="name-overlay">').text('#0' + pId + ' ' + pName));
  //         } else {
  //           $infoText.append($('<h1 class="name-overlay">').text('#' + pId + ' ' + pName));
  //         }
  //         $infoText.append($htWt);
  //         $htWt.append($ht.text('Height: ' + pHt + 'm'));
  //         $htWt.append($wt.text('Weight: ' + pWt + 'kg'));
  //         $infoText.append($statContain);
  //       }
  //     });
  //   }
  //   $('.close-overlay').focus();
  });
}();

//Build results cards (good to go!)

var requestFun = function() {
  var r = new XMLHttpRequest();
  r.onreadystatechange = function () {
  	if (r.readyState != 4 || r.status != 200) return;
    buildResults(this);
  };
  r.open("GET", "json/ogpokemon.json", true);
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

//
// $('.close-overlay').on('click', function() {
//   $('.info-card').removeClass('more-info');
//   $('.info-text').empty();
//   $infoOver.fadeToggle();
// });
