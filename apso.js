var bootweb = require("bootweb");
bootweb.on("init", function(){
    exports.models = {
        commission: require("./models/commissions").Commission,
        
    }

})

//TODO: if main
console.log('APSO is a bootweb application - see how to embed apso in your bootweb app ==> http://xxx/');

