const express = require("express");
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");

const PORT = 5000;

// Application middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Application routes
app.get("/", (req, res)=> {
    res.render("index");
});
app.post("/scan", (req, res)=> {
    const url = req.body.url;

    // if input is null return "Empty Data" error
    if(url.length === 0) res.send("Empty data");
    qr.toDataURL(url, (err, src)=> {
        if(err) res.send("Error occured");
        console.log(src);
        res.render("scan", {src});
    })
});

//Start the server
app.listen(PORT, () => console.log("Server listening on port "+ PORT));