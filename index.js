const http = require('http') // Чтобы использовать HTTP-интерфейсы в Node.js
const fs = require('fs') // Для взаимодействия с файловой системой
const path = require('path') // Для работы с путями файлов и каталогов
const url = require('url') // Для разрешения и разбора URL 

const HOST = 'localhost';
const PORT = 3000;

let server = http.createServer((req, res) => {
    if (req.method == "POST") {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end', () => {
            console.log(body);
            res.writeHead(200, {'Content-Type': "text/plain"});
            res.end("The data was successfully received by the server.");
        });
    } else if (req.method == "GET") {
        let filePath = path.join(
            __dirname,
            req.url === "/" ? "index.html" : req.url
        );
    
        let extName = path.extname(filePath);
        let contentType = 'text/html';
    
        switch (extName) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
        }
    
        res.writeHead(200, {'Content-Type': contentType});
    
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Run server: http://${HOST}:${PORT}`);
});

