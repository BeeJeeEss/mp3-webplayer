var http = require("http");
var fs = require("fs");
var readFile = require("./modules/setType.js")
var Datastore = require('nedb')
var formidable = require('formidable')
var playlist = new Datastore({
    filename: 'db/playlist.db',
    autoload: true
});

var server = http.createServer((req, res) => {
    console.log(req.url)
    switch (req.method) {
        case 'GET':
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
                fs.readdir(__dirname + '/static/' + album, (err, files) => {
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
            } else if (req.url.includes('add?song=')) {
                const myUrl = new URL(`http://localhost:3000${req.url}`)
                let song = myUrl.searchParams.get('song')
                song = JSON.parse(song)
                playlist.insert(song)
            } else if (req.url === '/playlist') {
                playlist.find({}, function (err, docs) {
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.end(JSON.stringify(docs))
                });
            }
            else if (req.url === '/admin') {
                fs.readFile(__dirname + '/static/icons/index.html', (error, data) => {
                    if (error) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.write("<h1>nie znaleziono pliku<h1>");
                        console.log(req.url)
                        console.log("404")
                        res.end();
                    }
                    else {
                        res.writeHead(200, {
                            'Content-Type': readFile.setType(req.url),
                        });
                        res.write(data);
                        res.end();
                    }
                })
            }
            else {
                fs.readFile(__dirname + '/static' + decodeURI(req.url), (error, data) => {
                    if (fs.existsSync(__dirname + '/static' + decodeURI(req.url))) {
                        var stats = fs.statSync(__dirname + '/static' + decodeURI(req.url));
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>nie znaleziono pliku<h1>");
                            console.log(req.url)
                            console.log("404")
                            res.end();
                        }
                        else {
                            res.writeHead(200, {
                                'Content-Type': readFile.setType(req.url),
                                "Content-Length": stats.size,
                                "Accept-Ranges": "bytes"
                            });
                            res.write(data);
                            res.end();
                        }
                    } else {
                        fs.readFile(__dirname + '/static/icons/cover.jpg', (error, data) => {
                            if (error) {
                                res.writeHead(404, { 'Content-Type': 'text/html' });
                                res.write("<h1>nie znaleziono pliku<h1>");
                                console.log(req.url)
                                console.log("404")
                                res.end();
                            }
                            else {
                                res.writeHead(200, {
                                    'Content-Type': readFile.setType(req.url),
                                    "Accept-Ranges": "bytes"
                                });
                                res.write(data);
                                res.end();
                            }
                        })
                    }
                })
            }
            break;

        case 'POST':
            let form = formidable({})
            var dir = './static/upload'
            let names = {
                arr: []
            }
            form.keepExtensions = true;
            form.multiples = true
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            form.uploadDir = "static/upload/"
            form.parse(req, (err, fields, files) => {
                if (Array.isArray(files.file)) {
                    files.file.forEach(element => {
                        fs.rename(element.path,
                            `static/upload/${element.name}`, function (err) {
                                if (err) console.log(err)
                            });
                        names.arr.push(element.name)
                    });
                } else {
                    console.log(files.file)
                    fs.rename(files.file.path,
                        `static/upload/${files.file.name}`, err => {
                            if (err) console.log(err)
                        });
                    names.arr.push(files.file.name)
                }
                res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                res.end(JSON.stringify(names));
            });
            break;
    }












})
server.listen(3000, () => {
    console.log("serwer startuje na porcie 3000")
});