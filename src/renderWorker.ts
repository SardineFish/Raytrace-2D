onmessage = (e) =>
{
    console.log("receive");
    postMessage(e.data, "*");
    console.log(e);
}