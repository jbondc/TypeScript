
// Appended to bin/tsc.js to create  bin/typescript_node.js 
// Exposes a public api when distributed through npm

var tsc = ts;

tsc.execute = function(command){
   return tsc.executeCommandLine(command.trim().split(" "));
}

module.exports = {
    getSystem: function(){
        return sys;
    },

    getTsc: function(){
        return tsc;
    }

    /* TypeScript services?
    getServices: function(){
        return;
    }*/
};
