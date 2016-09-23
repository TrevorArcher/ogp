var pokeArr = [],
    $pokeResults = $('.poke-results');

var soBasic = function() {
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
          pokeStr = '<button class="info-card" value="' + result.id + '"><span class="info-img sprite-icon sprite-icon-' + result.id + '"></span><p class="info-name">' + result.name + '</p><span class="type-container"><span class="' + type1 + '-select info-type"><p>' + type1 + '</p></span><span class="' + type2 + '-select info-type"><p>' + type2 + '</p></span></span></button>';
          console.log(pokeStr);
        } else {
          pokeStr = '<button class="info-card" value="' + result.id + '"><span class="info-img sprite-icon sprite-icon-' + result.id + '"></span><p class="info-name">' + result.name + '</p><span class="type-container"><span class="' + result.types[0].type.name + '-select info-type"><p>' + result.types[0].type.name + '</p></span></span></button>';
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
          pokeStr = '<button class="info-card" value="' + result.id + '"><span class="info-img sprite-icon sprite-icon-' + result.id + '"></span><p class="info-name">' + result.name + '</p><span class="type-container"><span class="' + type1 + '-select info-type"><p>' + type1 + '</p></span><span class="' + type2 + '-select info-type"><p>' + type2 + '</p></span></span></button>';
          console.log(pokeStr);
        } else {
          pokeStr = '<button class="info-card" value="' + result.id + '"><span class="info-img sprite-icon sprite-icon-' + result.id + '"></span><p class="info-name">' + result.name + '</p><span class="type-container"><span class="' + result.types[0].type.name + '-select info-type"><p>' + result.types[0].type.name + '</p></span></span></button>';
          console.log(pokeStr);
        }
      }
    });
  }
};
