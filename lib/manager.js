var bootweb = require('bootweb'),
  _ = require("util"),
  conn = bootweb.getConnection(),
  User = conn.model('User'),
  swig = bootweb.swig,
  apso = require("../app.js"),
  logger = bootweb.getLogger('aosp_manager');

apso.on('init', function() {
  var prefix = apso.options.prefix;
  logger.info("Initializing at apso init");
  //logger.debug(arguments);

  bootweb.io.of(prefix + 'admin').on("connection", function(socket) {
      //logger.debug(_.inspect(socket));
      console.log("user connected: ", socket.handshake.user.pseudo);
      bootweb.ACL.isAuthorized(socket.handshake.user.email, prefix, "admin", function(err, isauth){
        if (err) {
          return socket.emit("Error",err);
        }
        socket.emit("Authorized", isauth);
        if (isauth) {
          socket.on("getUsers", function(data) {
            User.find({}, function(err, users) {
              if (err) return socket.emit("Error",err);
              var results = [];
              users.forEach(function(u) {
                results.push({id: u._id, email: u.email, pseudo: u.pseudo});
              })
              socket.emit("UsersList", results);
              
            })
            
          });
        }
      });
  });
  bootweb.auth.findOrCreateUser("manager", "manager", function(err, manager) {
    bootweb.ACL.addUserRole(manager, "apsoManager", function(err, newUserRole) {});
  });
  bootweb.ACL.addPermissions(prefix, "apsoManager", ["admin"], function() {});
  bootweb.ACL.addPermissions(prefix, "apsoMember", ["bureau"], function() {});
});
