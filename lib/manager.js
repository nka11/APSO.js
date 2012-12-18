var bootweb = require('bootweb'),
  _ = require("util"),
  swig = bootweb.swig,
  apso = require("../app.js"),
  logger = bootweb.getLogger('aosp_manager');
  
apso.on('init', function(){
  logger.info("Initializing at apso init");
  var prefix = apso.options.prefix;
  bootweb.auth.findOrCreateUser("manager","manager",function(err,manager){
      bootweb.ACL.addUserRole(manager, "apsoManager", function(err, newUserRole) {
        bootweb.ACL.addPermissions(prefix, "manager", ["admin"], function(){});
      });
    });
    bootweb.ACL.addPermissions(prefix, "apsoMember", ["bureau"], function(){});
});
