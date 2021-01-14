const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/varginha", (req, res)=> {
    console.log(req.body);
    res.send("Qqr coisa");
});

app.get("/pirulito/:galinha", (req, res) => {
    console.log(req.params);
    res.send("Ola, pessoa!!!");
});

app.listen(9000, () => {
    console.log("iha");
}); 