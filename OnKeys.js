(function(window, document){
    var OnKeys = function(){
        var that = this;
        window.onkeypress = window.onkeyup = window.onkeydown = function(event){
            that.agent.apply(that, arguments);
        };
    };
    OnKeys.prototype = {
        on:function(key, callback){
            var k = this.getKey(key);
            k.callback = callback;
            if(!this.keylist[k.event][k.keycode])
                this.keylist[k.event][k.keycode] = {};
            this.keylist[k.event][k.keycode][k.acs] = k;
            return this;
        },
        off:function(key){
            var k = this.getKey(key);
            if(!this.keylist[k.event][k.keycode] || !this.keylist[k.event][k.keycode][k.acs]) return;
            delete this.keylist[k.event][k.keycode][k.acs];
            return this;
        },
        getKey:function(key){
            key = key.split('.');
            var k = {
                isacs: [key.indexOf('shift')!=-1, key.indexOf('alt')!=-1, key.indexOf('ctrl')!=-1],
                keycode: this.keycode[key[key.length-2]],
                event: 'key'+key[key.length-1]
            };
            k.acs = this.getACS.apply(this, k.isacs);
            return k;
        },
        keycode:{'a':'65', 'b':'66', 'c':'67', 'd':'68', 'e':'69', 'f':'70', 'g':'71', 'h':'72', 'i':'73', 'j':'74', 'k':'75', 'l':'76', 'm':'77', 'n':'78', 'o':'79', 'p':'80', 'q':'81', 'r':'82', 's':'83', 't':'84', 'u':'85', 'v':'86', 'w':'87', 'x':'88', 'y':'89', 'z':'90', '0':'48', '1':'49', '2':'50', '3':'51', '4':'52', '5':'53', '6':'54', '7':'55', '8':'56', '9':'57', 'up':'38', 'down':'40', 'left':'37', 'right':'39'},
        keylist:{'keydown':{}, 'keyup':{}, 'keypress':{} },
        agent:function(event){
            var acs = this.getACS(event.shiftKey, event.altKey, event. ctrlKey);
            var kobj = this.keylist[event.type][event.keyCode];
            if(!kobj || !kobj[acs]) return;
            kobj[acs].callback(event);
        },
        getACS:function(isShift, isAlt, isCtrl){
            return 'acs' + (isShift ? 'Shift' : '') + (isAlt ? 'Alt' : '') + (isCtrl ? 'Ctrl' : '');
        }
    };
    if(!window.OK) window.OK = OnKeys;
}(window, document));