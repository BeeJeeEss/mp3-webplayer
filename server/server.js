var http = require("http");
var fs = require("fs");
var readFile = require("./modules/setType.js.js")
var server = http.createServer((req, res) => {
    if (req.url == '/first') {
        var obj = { dirs: [], files: [] }
        fs.readdir(__dirname + '/static', (err, files) => {
            if (err) {
                return console.log(err);
            }
            files.forEach(fileName => {
                obj.dirs.push(fileName)
            });
            fs.readdir(__dirname + `/static/${obj.dirs[0]}`, (err, files) => {
                if (err) {
                    return console.log(err);
                }
                files.forEach((file) => {
                    var stats = fs.statSync(__dirname + `/static/${obj.dirs[0]}/${file}`);
                    obj.files.push({ "dir": obj.dirs[0], "file": file, "size": (stats.size / (1024 * 1024)).toFixed(2) + 'MB' })
                });
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify(obj))
            });
        });
    } else if (req.url.includes('getSongs')) {
        const myUrl = new URL(`http://localhost:3000${req.url}`)
        let album = myUrl.searchParams.get('album')
        let obj = { files: [] }
        fs.readdir(__dirname + '/static/' + album, function (err, files) {
            if (err) {
                return console.log(err);
            }
            files.forEach((file) => {
                var stats = fs.statSync(__dirname + `/static/${album}/${file}`);
                obj.files.push({ "dir": album, "file": file, "size": (stats.size / (1024 * 1024)).toFixed(2) + 'MB' })
            });
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify(obj.files))
        });
    }
    else {
        fs.readFile(__dirname + '/static' + decodeURI(req.url), function (error, data) {
            if (error) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write("<h1>nie znaleziono pliku<h1>");
                console.log("404")
                res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': readFile.setType(req.url) });
                res.write(data);
                res.end();
            }
        })
    }
})
server.listen(3000, () => {
    console.log("serwer startuje na porcie 3000")
});