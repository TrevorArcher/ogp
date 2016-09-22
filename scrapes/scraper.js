var fs = require('fs'),
    http = require('http');

var Request = function(index){
  this.id = index;
  this.options = {
    "method": "GET",
    "hostname": "pokeapi.co",
    "port": null,
    "path": "/api/v2/pokemon/"+ this.id +"/",
    "headers": {}
  };
}

Request.prototype.call = function() {
  var that = this;
  var req = http.request(this.options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      fs.writeFile('sample/' + that.id + '.json', body, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
      });
    });
  });
  req.end();
};


for (var i = 0 ; i < 50 ; i++) {
  new Request(i).call();
}
