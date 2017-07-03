/**
 * Created by lianzhiyu on 2017/5/24.
 */
import * as http from 'http'
const server = http.createServer((request, response) => {
    response.end("Hello Node!")
});

server.listen(8000);