var $results = $('.search-results'),
    $infoOver = $('#info-overlay'),
    $buttons = $('button'),
    mainContent = document.getElementsByTagName('main')[0],
    // $results = document.getElementsByClassName('search-results'),
    // $infoOver = document.getElementById('info-overlay'),
    // $buttons = document.getElementsByTagName('button'),
    pObj,
    pNameArr = [],
    pTypeArr = [];

// var genOne = function() {
//   $.ajax({
//     type: 'GET',
//     url: 'json/ogpokemon.json',
//     dataType: 'json',
//     success: function(result){
//       pObj = result;
//       console.log(pObj);
//     }
//   });
// }();

var r = new XMLHttpRequest();
r.open("GET", "json/ogpokemon.json", true);
r.onreadystatechange = function () {
	if (r.readyState != 4 || r.status != 200) return;
	console.log(r.responseText);
  pObj = (r.responseText);
};
r.send();

//type menu generation
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
  searchButton = document.createElement('button');
  searchButton.setAttribute('type', 'button');
  searchButton.setAttribute('value', 'submit');
  searchButton.setAttribute('class', 'search-reset');
  searchButton.textContent = 'Reset';
  searchDiv.appendChild(searchButton);

  typeField.appendChild(typeDiv);
  typeField.appendChild(searchDiv);
  typeForm.appendChild(typeField);
  mainContent.insertBefore(typeForm, mainContent.childNodes[0]);
}();



//Menu search
var typeSelect = document.getElementsByClassName('type');
typeSelect.onClick = function(){
  var thisType = this.value;
  if (pTypeArr.includes(thisType) && ($(this).hasClass(thisType + '-select'))){
      pTypeArr.splice(pTypeArr.indexOf(thisType),1);
      console.log(pTypeArr);
      console.log('type removed!');
  } else {
    pTypeArr.push(thisType);
    console.log(pTypeArr);
    console.log('type has been added!');
  }
  $(this).toggleClass(thisType);
  $(this).toggleClass(thisType + '-select');
  $(this).toggleClass('type-select');
  console.log(thisType);
};

$('.search-reset').on('click', function(){
  pTypeArr = [];
  $results.empty();
  for (var i = 0 ; i < $buttons.length ; i++) {
    if ($($buttons[i]).hasClass('type-select')) {
      $($buttons[i]).addClass($buttons[i].value);
      $($buttons[i]).removeClass('type-select');
      $($buttons[i]).removeClass($buttons[i].value + '-select');
    }
  }
});

$('.search-submit').on('click', function(){
  $results.hide();
  $results.empty();

  for(var i = 0 ; i < pObj.pokemon.length ; i++) {
    var nextP = pObj.pokemon[i],
    pName = nextP.name,
    $cardButton = $('<button class="info-card" value=' + nextP.id + '>'),
    $nameP = $('<p class="info-name">'),
    $imgSpan = $('<span class="info-img sprite-icon sprite-icon-' + nextP.id + '">'),
    $typeSpan = $('<span class="type-container">');
    if ((pTypeArr.includes(nextP.types[0]) || pTypeArr.includes(nextP.types[1]))) {
      $nameP.text(pName);
      $cardButton.append($imgSpan);
      $cardButton.append($nameP);
      for (var j = 0 ; j < nextP.types.length ; j++) {
        var $type = $('<span class="info-type ' + nextP.types[j] + '-select">');
        $type.append($('<p>').text(nextP.types[j]));
        $typeSpan.append($type);
      }
      $cardButton.append($typeSpan);
      $results.append($cardButton);
    }
    $results.fadeIn();
  }
});

//figure out proper keypress
$('.search-results').on('click', '.info-card', function(e) {
  e.preventDefault();
  var $infoText = $('<div class="info-text">'),
      $htWt = $('<div class="ht-wt">'),
      $ht = $('<h3 class="ht"></h3>'),
      $wt = $('<h3 class="wt"></h3>'),
      $statContain = $('<div class="stat-container">'),
      pId = '',
      pName = ($(this).find($('.info-name')).text()),
      pHt = '',
      pWt = '',
      pStats = {
        'hp': 0,
        'atk': 0,
        'def': 0,
        'spcAtk': 0,
        'spcDef': 0,
        'speed': 0
      };

  var thisId = this.getAttribute('value');

  $(this).toggleClass('more-info');
  $('.info-text').empty();
  $infoOver.fadeToggle();
  if ($(this).hasClass('more-info')){
    $.ajax({
      type: 'GET',
      url: 'scrapes/pokemon/'+ thisId +'.json',
      dataType: 'json',
      success: function(result){
        console.log(result);
        pId = result.id;
        pHt = (result.height) / 10;
        pWt = (result.weight) / 10;
        pStats.speed = result.stats[0].base_stat;
        pStats.spcDef = result.stats[1].base_stat;
        pStats.spcAtk = result.stats[2].base_stat;
        pStats.def = result.stats[3].base_stat;
        pStats.atk = result.stats[4].base_stat;
        pStats.hp = result.stats[5].base_stat;
        $infoOver.append($infoText);
        if (pId.toString().length == 1) {
          $infoText.append($('<h1 class="name-overlay">').text('#00' + pId + ' ' + pName));
        } else if (pId.toString().length == 2) {
          $infoText.append($('<h1 class="name-overlay">').text('#0' + pId + ' ' + pName));
        } else {
          $infoText.append($('<h1 class="name-overlay">').text('#' + pId + ' ' + pName));
        }
        $infoText.append($htWt);
        $htWt.append($ht.text('Height: ' + pHt + 'm'));
        $htWt.append($wt.text('Weight: ' + pWt + 'kg'));
        $infoText.append($statContain);
        for (var key in pStats){
          $statContain.append($('<div class="stat ' + key + '">').html(key + '<br>' + pStats[key]));
        }
      }
    });
  }
  $('.close-overlay').focus();
});

$('.close-overlay').on('click', function() {
  $('.info-card').removeClass('more-info');
  $('.info-text').empty();
  $infoOver.fadeToggle();
});
