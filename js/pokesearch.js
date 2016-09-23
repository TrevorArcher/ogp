var $results = $('.search-results'),
    $infoOver = $('#info-overlay'),
    $buttons = $('button'),
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


//fix this type menu sans jQuery
var parentForm = document.getElementsByTagName('form');
parentForm.innerHTML = '<fieldset><div id="type-menu"><button type="button" value="normal" class="type normal">Normal</button><button type="button" value="fire" class="type fire">Fire</button><button type="button" value="water" class="type water">Water</button><button type="button" value="grass" class="type grass">Grass</button><button type="button" value="electric" class="type electric">Electric</button><button type="button" value="ice" class="type ice">Ice</button><button type="button" value="fighting" class="type fighting">Fighting</button><button type="button" value="poison" class="type poison">Poison</button><button type="button" value="ground" class="type ground">Ground</button><button type="button" value="rock" class="type rock">Rock</button><button type="button" value="flying" class="type flying">Flying</button><button type="button" value="bug" class="type bug">Bug</button><button type="button" value="psychic" class="type psychic">Psychic</button><button type="button" value="ghost" class="type ghost">Ghost</button><button type="button" value="dragon" class="type dragon">Dragon</button><button type="button" value="dark" class="type dark">Dark</button><button type="button" value="steel" class="type steel">Steel</button><button type="button" value="fairy" class="type fairy">Fairy</button></div><div id="form-btns"><button type="button" value="submit" class="search-submit">Search</button><button type="reset" value="submit" class="search-reset">Reset</button></div></fieldset>';

$('.type').on('click', function(){
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
});

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
$('.search-results').on('click', '.info-card', function() {
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
