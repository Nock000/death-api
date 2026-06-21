const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = "deaths.json";

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count: 0 }));
}

function getDeaths() {
    return JSON.parse(fs.readFileSync(DATA_FILE)).count;
}

function setDeaths(count) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify({ count }, null, 2)
    );
}

app.get("/", (req, res) => {
    res.send("Death API Running");
});

app.get("/adddeath", (req, res) => {
    let count = getDeaths();

    count++;

    setDeaths(count);

    res.send(`Armaan has died ${count} times.`);
});

app.get("/deaths", (req, res) => {
    res.send(`Current death count: ${getDeaths()}`);
});

app.get("/setdeaths", (req, res) => {
    const count = Number(req.query.count);

    if (isNaN(count)) {
        return res.send("Invalid count");
    }

    setDeaths(count);

    res.send(`Death count set to ${count}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});