/*

OAP- Open Permanent Assembly Bootweb module
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
var forEach = function(callback) {
    var index;
    for (index in this) {
        if (index !== "forEach" && index !== undefined) {
            callback(this[index],index);
        }
    }
}
var bootweb = require("bootweb"),
    schema   = bootweb.getSchema(),
    logger = bootweb.getLogger("aosp.commission"),
    _ = require("util"),
    //Member = require('./members').Member,
    Commission = schema.define('Commission',{
        name:{ type: String, limit: 50, index: true },
        postes: {type: bootweb.db.Schema.JSON}, // tableau des postes a pourvoir
        composition: {type: bootweb.db.Schema.JSON},
        votes: {type: bootweb.db.Schema.JSON},
        history: {type: bootweb.db.Schema.JSON}
}), bureau;

/*
    Structure de votes :
        {
            President: {
                idVoix: [votant1,votant2] 
                ...
            },
            vicePresident: {
                
        
            }
        
        }
*/

Commission.prototype.vote = function vote(votant, listeVoix, callback) {
    var commission = this,
        votes;
    if (commission.composition == null) {
        commission.composition = {};
        commission.postes.forEach(function(poste){
             commission.composition[poste] = "";
        })
    }
    if (commission.votes == null) {
        commission.votes = {};
    }
    votes  = this.votes;
    listeVoix.forEach = forEach;
    listeVoix.forEach(function(voix,poste){
        if (commission.postes.indexOf(poste) < 0 ) {
            callback("Erreur, liste des voix non compatible");
        }
        //initializing object votes
        if (votes[poste] == null) {
            votes[poste] = {};
        }
        if (votes[poste][voix] === undefined) {
            votes[poste][voix] = [];
        }
        votes[poste].forEach = forEach;
        votes[poste].forEach(function(voixTab) { // removes a potential old vote from dataset
            if (voixTab.indexOf(votant) > -1) {
                voixTab.splice(voixTab.indexOf(votant),1);
            }
        });
        votes[poste][voix].push(votant);
        commission.votes = votes;
        
        // dataset calculated. Recalculates votes and recompose bureau for objet
        votes[poste].forEach(function(voixTab,voixposte) {
            if (commission.composition[poste] === "") {
                commission.composition[poste] = voixposte; 
                return;
            }
            if (votes[poste][commission.composition[poste]].length < voixTab.length) { // l'élu du poste actuel à moins de voix
                commission.composition[poste] = voixposte; 
                return;
            }
             if (votes[poste][commission.composition[poste]].length === voixTab.length) { //ballotage
                 
            }
        });
    });
    
    return this.save(function(err) {
        if (err != null) {
            return callback(err);
        } 
        callback(null,commission.composition);
    });
};


exports.Commission = Commission;
