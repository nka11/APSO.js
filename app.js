/*

APSO- Assemblee Permanente Source Ouverte
Bootweb module
Copyright (C) $year Nicolas Karageuzian

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

*/

var bootweb = require('bootweb'),
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
  /*
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
  */
   cb(null,bapp);
}

bapp.mapUrls = function(app, cb){
    app.get(this.options.prefix + 'register', function(req, res,next) {
      res.send(bootweb.swig.compileFile("apsoRegister.html")
        .render({
          // values required for layout
          prefix : this.options.prefix,
          user: req.user
          // other values
        }));
    });
    app.get(this.options.prefix + 'registered', function(req, res,next) {
      res.send(bootweb.swig.compileFile("apsoRegistered.html")
        .render({
          // values required for layout
          prefix : this.options.prefix,
          user: req.user
          // other values
        }));
    });
    app.get(this.options.prefix + 'validated', function(req, res,next) {
      res.send(bootweb.swig.compileFile("apsoValidated.html")
        .render({
          // values required for layout
          prefix : this.options.prefix,
          user: req.user
          // other values
        }));
    });
    app.get(this.options.prefix, function(req, res,next) {
        res.send(bootweb.swig.compileFile("apsoIndex.html")
          .render({
          // values required for layout
          prefix : this.options.prefix,
          user: req.user
          // other values
        }))
    });
    app.get(this.options.prefix + "bureau", function(req, res,next) {
        res.send(bootweb.swig.compileFile("apsoBureau.html")
          .render({
          // values required for layout
          prefix : this.options.prefix,
          user: req.user
          // other values
        }));
    });
    app.get(this.options.prefix + "libelles",bootweb.auth.verify("read"), function(req, res,next) {
        res.send(bootweb.swig.compileFile("apsoLibelles.html")
          .render({
          // values required for layout
          prefix : this.options.prefix,
          user: req.user
          // other values
        }));
    });
    // action de vote sur le bureau
    app.post(this.options.prefix + "bureau", function(req, res,next) {
        
    });
}

module.exports = bapp;

