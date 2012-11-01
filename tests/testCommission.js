var
    vows = require("vows"),
    assert = require('assert'),
    nconf = require('nconf'),
    dirname = __dirname,
    _ = require("util"),
    mongoose = require("mongoose"),
    bootweb = require("../../bootweb"),
    aosp = require('../app');
    
function addBatchs(suite) {
    suite.addBatch({
		"vote bureau simple": {
			topic: function() {
                aosp.bureau.vote("a", {"president": "b","tresorier":"c","secretaire":"d","vicepresident": "e"},this.callback);
				
			},
            "verifie composition": function(err,composition) {
                console.log(arguments);
                assert.deepEqual(composition,{"president": "b","tresorier":"c","secretaire":"d","vicepresident": "e"}, "Composition non conforme");
            },
            {"vote bureau p2": {
                topic: function() {
                    aosp.bureau.vote("a", {"president": "b","tresorier":"c","secretaire":"d","vicepresident": "e"},this.callback);
                    }
                }
                // ne peut continuer sans générer de ballotages...
            }
		}
    });
}

exports.addBatchs = addBatchs;