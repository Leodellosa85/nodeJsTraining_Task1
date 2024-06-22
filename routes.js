const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method

    console.log(url)
    if(url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>My First NodeJs Task</title></head>')
        res.write('<body><h1>Hello from my First Node.js Task!</h1><form action="/create-user" method="POST"><input type="text" name="message" placeholde = "Please input username"><button type="submit">Submit</button></form></body>')
        res.write('</html>')
        return res.end()
    }

    if(url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Users</title></head>')
        res.write('<body><h1>List of users</h1><ul><li>Leo Dellosa</li><li>Mark Loreno</li><li>Ariane Canopin</li></ul></body>')
        res.write('</html>')
        return res.end()
    }
    
    if(url === '/create-user' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            const message = parsedBody.split('=')[1]
            res.statusCode = 302
            res.setHeader('Location', '/users')
            return res.end()
        })
    }
}

exports.handler = requestHandler

    