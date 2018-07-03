"use strict";
onmessage = (e) => {
    console.log("receive");
    postMessage(e.data);
    console.log(e);
};
//# sourceMappingURL=renderWorker.js.map