/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ws/browser.js":
/*!************************************!*\
  !*** ./node_modules/ws/browser.js ***!
  \************************************/
/***/ ((module) => {

"use strict";

module.exports = function () {
  throw new Error(
    'ws does not work in the browser. Browser clients must use the native ' +
      'WebSocket object. What a bozo.'
  );
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache 
/******/  if(typeof window !== "undefined") console.error(new Error("Browser is not supported! The bot will not be able to send messages. Please run the bot from QAI Environment or node.js"));
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
  /**
   * Add WebSocket Support.
   *
   */
WebSocket = typeof window === "undefined" ?  require("ws") : WebSocket;
// Bozo read discord docs before skidding
console.log("[QAI] Connecting to Gateway WS");
const gws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
  /**
   * Create a onmessage listener.
   *
   * @param {(Object|Event)} An event on websocket message.
   */
/******/ 	gws.onmessage = event => {
    /******/ 	const message = JSON.parse(event.data);
    /******/ 	console.log("[QAI-1] " + message.op);
  /**
   * Listener for 10 and 0 events..
   *
   * @param ({Number|Opcode}) Opcode 
   */
    switch(message.op) {
        case 10:
       /******/ 	 console.log("[QAI-1] Heartbeat Received");
        /******/ 	setTimeout(() => {
            /******/ 	console.log("[QAI-1] Heartbeat Sended");
           /******/ 	 gws.send(JSON.stringify({
                /******/ 	"op": 1,
                /******/ 	"d": null
          /******/  }));
	    setInterval(() => {
                console.log("[QAI-1] Heartbeat Sended");
                gws.send(JSON.stringify({
                    "op": 1,
                    "d": null
                }));
            }, message.d.heartbeat_interval - 1000);
        }, message.d.heartbeat_interval * Math.random());
	gws.send(JSON.stringify({
	    "op": 2,
	    "d": {
                "token": localStorage.token,
                "intents": 1 << 15 | 1 << 9,
                "properties": {
                    "os": "Pony Linux",
                    "browser": "Chrome",
                    "device": "Skidbook"
                }
            }
	}));
	console.log("[QAI-1] Indentify Request Sended");
        break;
        case 0:
	      if(message.d.type == 0 && !message.d.author.bot) {
	        const txt = message.d.content;
	        const AIResp = "io";
	        console.log("[QAI-1] " + txt + " => " + AIResp);
	        if (typeof window !== "undefined") break;
	        fetch(`https://discord.com/api/v9/channels/${message.d.channel_id}/messages`, {
	          "method": "POST",
	          "headers": {
	            "content-type": "application/json",
	            "authorization": "Bot " + localStorage.token
	          },
	          "body": JSON.stringify({
                      embeds: [{
                          "title" : "AI Response",
		          "description": AIResp,
			  "footer": {
			      "text": "AI By Zole",
			      "icon_url": "https://win98icons.alexmeub.com/icons/png/windows_slanted-1.png"
			  },
			  "color": 5763719
	              }]
		  })
	        }).then(console.log);
	      }
	break;
    }
}

})();

/******/ })()
;