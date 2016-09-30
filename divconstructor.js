var pokeArr = [],
    $pokeResults = $('.poke-results');

var genOne = function() {
  for (var i = 1 ; i < 152 ; i++) {
    $.ajax ({
      type: 'GET',
      url: 'scrapes/pokemon/'+ i +'.json',
      dataType: 'json',
      success: function(result) {
        var pokeNew = {
          id : result.id,
          name : result.name,
          maxCP : 0,
          candies : 0,
          weakness : "",
          superWeakness : "",
          strength : "",
          superStrength : ""
        };
        if (result.types.length == 2) {
          var type1,
              type2;
          if (result.types[0].slot == 1) {
            type1 = result.types[0].type.name;
            type2 = result.types[1].type.name;
          } else {
            type1 = result.types[1].type.name;
            type2 = result.types[0].type.name;
          }
          pokeNew.types = [type1, type2];
        } else {
          pokeNew.types = [result.types[0].type.name];
        }
        pokeArr.push(pokeNew);
        $pokeResults.append($('<p>' + JSON.stringify(pokeNew) + ',</p>'));
      }
    });
  }
  console.log(pokeArr);
};
var soBasic = function() {
  var htmlBody = '';
  for (var i = 1 ; i < 152 ; i++) {
    $.ajax ({
      type: 'GET',
      url: 'scrapes/pokemon/'+ i +'.json',
      dataType: 'json',
      success: function(result) {
        var pokeNew = {
          id : result.id,
          name : result.name
        };

        var pokeStr;
        if (result.types.length == 2) {
          var type1,
              type2;
          if (result.types[0].slot == 1) {
            type1 = result.types[0].type.name;
            type2 = result.types[1].type.name;


          } else {
            type1 = result.types[1].type.name;
            type2 = result.types[0].type.name;

          }
          pokeStr = '<a href="more.html#'+ result.name +'"><button class="info-card" value="' + result.id + '"><p class="info-name">' + result.name + '</p><span class="type-container"><span class="' + type1 + '-select info-type"><p>' + type1 + '</p></span><span class="' + type2 + '-select info-type"><p>' + type2 + '</p></span></span></button></a>';
          console.log(pokeStr);
        } else {
          pokeStr = '<a href="more.html#'+ result.name +'"><button class="info-card" value="' + result.id + '"><p class="info-name">' + result.name + '</p><span class="type-container"><span class="' + result.types[0].type.name + '-select info-type"><p>' + result.types[0].type.name + '</p></span></span></button></a>';
          console.log(pokeStr);
        }
      }
    });
  }
};

var moreInfo = function() {
  for (var i = 1 ; i < 152 ; i++) {
    $.ajax ({
      type: 'GET',
      url: 'scrapes/pokemon/'+ i +'.json',
      dataType: 'json',
      success: function(result) {
        var pokeNew = {
          id : result.id,
          name : result.name
        };

        var pokeStr;
        if (result.types.length == 2) {
          var type1,
              type2;
          if (result.types[0].slot == 1) {
            type1 = result.types[0].type.name;
            type2 = result.types[1].type.name;


          } else {
            type1 = result.types[1].type.name;
            type2 = result.types[0].type.name;

          }
          pokeStr = '<a name="'+ result.name +'"><div class="info-card" value="' + result.id + '"><span class="info-img sprite-icon sprite-icon-' + result.id + '"></span><p class="info-name">' + result.name + '</p><span class="type-container"><span class="' + type1 + '-select info-type"><p>' + type1 + '</p></span><span class="' + type2 + '-select info-type"><p>' + type2 + '</p></span></span></div></a>';
          console.log(pokeStr);
        } else {
          pokeStr = '<a name="'+ result.name +'"><div class="info-card" value="' + result.id + '"><span class="info-img sprite-icon sprite-icon-' + result.id + '"></span><p class="info-name">' + result.name + '</p><span class="type-container"><span class="' + result.types[0].type.name + '-select info-type"><p>' + result.types[0].type.name + '</p></span></span></div></a>';
          console.log(pokeStr);
        }
      }
    });
  }
};


var moreDiv = function() {
  var results = $('.poke-results');

    $.ajax({
      type: 'GET',
      url: 'json/ogpokemon.json',
      dataType: 'json',
      success: function(result) {
        for (var i = 0; i < 5 ; i++) {
          var pArrResult = result.pokemon[i];
          var pokeStr = '';
          pokeStr += ('<a name="' + pArrResult.name + '" tabindex="0">');
          pokeStr += ('<div class="info-card" value="' + pArrResult.id + '">');
          pokeStr += ('<div class="basic-info">');

          if (pArrResult.id.toString().length == 1) {
            pokeStr += ('<p class="info-name">#00' + pArrResult.id + ' ' + pArrResult.name + '</p>');
          } else if (pArrResult.id.toString().length == 2) {
            pokeStr += ('<p class="info-name">#0' + pArrResult.id + ' ' + pArrResult.name + '</p>');
          } else {
            pokeStr += ('<p class="info-name">#' + pArrResult.id + ' ' + pArrResult.name + '</p>');
          }

          // var htWt = $('<div class="ht-wt">');
          //pull other json info

          pokeStr += ('<span class="type-container">');
          if (pArrResult.types.length == 2) {
            pokeStr += ('<span class="' + pArrResult.types[0] + '-select info-type"><p>' + pArrResult.types[0] + '</p></span><span class="' + pArrResult.types[1] + '-select info-type"><p>' + pArrResult.types[1] + '</p></span></span></div>');
          } else {
            pokeStr += ('<span class="' + pArrResult.types[0] + '-select info-type"><p>' + pArrResult.types[0] + '</p></span></span></div>');
          }
          pokeStr += ('<div class="go-info"><span class="max-cp"><p>Max CP: '+ pArrResult.maxCP +'</p></span><span class="candies"><p>Candies to evolve: ' + pArrResult.candies +'</p></span></div>');
          pokeStr += ('<div class="defense-info"><h3>Defenses</h3><hr><span class="very-strong"><p>Very Strong (0.64x modifier)</p>');
          if (pArrResult.superStrength == "N/A") {
            pokeStr += ('<p>N/A</p>');
          } else {
              for (var j = 0 ; j < pArrResult.superStrength.length ; j++) {
                pokeStr += ('<span class="' + pArrResult.superStrength[j] + '-select info-type"><p>' + pArrResult.superStrength[j] + '</p></span>');
              }
          }

          pokeStr += ('</span><span class="strong"><p>Strong (0.8x modifier)</p>');
          if (pArrResult.strength == "N/A") {
            pokeStr += ('<p>N/A</p>');
          } else {
              for (var k = 0 ; k < pArrResult.strength.length ; k++) {
                pokeStr += ('<span class="' + pArrResult.strength[k] + '-select info-type"><p>' + pArrResult.strength[k] + '</p></span>');
              }
          }

          pokeStr += ('</span><span class="weak"><p>Weak (1.25x modifier)</p>');
          if (pArrResult.weakness == "N/A") {
            pokeStr += ('<p>N/A</p>');
          } else {
              for (var l = 0 ; l < pArrResult.weakness.length ; l++) {
                pokeStr += ('<span class="' + pArrResult.weakness[l] + '-select info-type"><p>' + pArrResult.weakness[l] + '</p></span>');
              }
          }

          pokeStr += ('</span><span class="very-weak"><p>Very Weak (1.56x modifier)</p>');
          if (pArrResult.superWeakness == "N/A") {
            pokeStr += ('<p>N/A</p>');
          } else {
              for (var m = 0 ; m < pArrResult.superWeakness.length ; m++) {
                pokeStr += ('<span class="' + pArrResult.superWeakness[m] + '-select info-type"><p>' + pArrResult.superWeakness[m] + '</p></span>');
              }
          }
          console.log(pokeStr);
        }
    }
  });
}();
