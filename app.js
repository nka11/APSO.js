
var bootweb = require('../bootweb'),
    _ = require("util"),
    swig = bootweb.swig,
    logger = bootweb.getLogger('aosp'),
    bapp = function(){
        return this;
    }();

bapp.init = function(options,cb) {
  logger.info("Starting aosp initialization");
  if (cb == null && typeof options === "function") {
    cb = options;
    options = {
      "prefix": "/apso/"  
    };
  }
  if (options === undefined) {
    options = {
      "prefix": "/apso/"  
    };
  }
  if (options.prefix === "undefined") {
    options.prefix = "/apso/";
  }
  console.log("Adding templates dir : " + __dirname + "/templates");
  bootweb.templatesDirs.push(__dirname + "/templates");
  this.options = options;
  var bureau;
  var commissions = require('./models/commissions');
  logger.info("initializing bureau");
  commissions.Commission.findOne({where:{name:'bureau'}},function(err, bur) {
    if (err != null) {
      return cb(err);
    }
    if (bur === undefined) {
      logger.info("bureau not found, creating");
      bureau = new commissions.Commission({name:'bureau',postes:['president','vicepresident','secretaire','tresorier']});
      bureau.save();
    } else {
      logger.info("bureau is found : " + _.inspect(bur));
      bureau = bur;
    }
    bapp.bureau = bureau;
    cb(null,bapp);
  });
   
}

bapp.mapUrls = function(app, cb){
    app.get(this.options.prefix + "bureau", function(req, res,next) {
        res.send( bootweb.swig.compileFile("apsoIndex.html").render({}))
    });
    // action de vote sur le bureau
    app.post(this.options.prefix + "bureau", function(req, res,next) {
        
    });
}

module.exports = bapp;

