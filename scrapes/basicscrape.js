var pokeArr = [],
    $pokeResults = $('.poke-results');


var soBasic = function() {
  for (var i = 1 ; i < 722 ; i++) {
    $.ajax ({
      type: 'GET',
      url: 'scrapes/pokemon/'+ i +'.json',
      dataType: 'json',
      success: function(result) {
        var pokeNew = {
          id : result.id,
          name : result.name,
          sprites : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + result.id + ".png"
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
}();
// 721
