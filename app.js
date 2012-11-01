
var bootweb = require('../bootweb'),
    _ = require("util"),
    logger = bootweb.getLogger('aosp');

exports.init = function(cb) {
    logger.info("Starting aosp initialization");
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
        exports.bureau = bureau;
        cb(null,this);
    })
   
}

exports.mapUrls = function(app, cb){
    
}

