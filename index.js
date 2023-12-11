import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



const book = JSON.parse(fs.readFileSync('books.json').toString())


app.get('/form', (req, res, next) => {
    res.sendFile(__dirname + '/index.html')

});


app.post('/form', (req, res, next) => {
    const newBook = req.body
    book.push(newBook)
    fs.writeFileSync('books.json', JSON.stringify(book))
    res.send('Book Added')
})



app.get('/', (req, res, next) => {

    console.log('Request route')
    res.send('Haloo Express JS')
});




app.get('/books', (request, response, next) => {
    const genre = request.query.genre;
    console.log(genre);
    response.json(book);
    for (let i = 0; i < book.length; i++) {
        if (genre === book[i].genre) {
            console.log('aris')
        } else console.log('araris')
    }
});

app.post('/books', (request, response, next) => {
    book.push(request.body)
    fs.writeFileSync('books.json', JSON.stringify(book))
    response.send('mssage recived')
});

app.delete('/books/:isbn', (req, res, next) => {
    let found = false;
    const isbn = req.params.isbn
    for (let i = 0; i < book.length; i++) {
        let delBook = book[i];
        if (delBook.isbn === isbn) {
            found = true;
            console.log('waishala')
            const deleted = book.splice(i, 1);
            fs.writeFileSync('books.json', JSON.stringify(book))
            res.json(deleted)
        }
    }
    if (!found) {
        res.status(404).send(`book with isbn ${isbn} not fount`)
    }

});

app.put('/books/:isbn', (req, res, next) => {
    let found = false;
    const updatedbook = req.body
    const isbn = req.params.isbn
    for (let i = 0; i < book.length; i++) {
        let delBook = book[i];
        if (delBook.isbn === isbn) {
            found = true;
            book[i] = updatedbook;
            fs.writeFileSync('books.json', JSON.stringify(book))
            res.send('Updated')
        }
    }
    if (!found) {
        res.status(404).send(`book with isbn ${isbn} not fount`)
    }
});

app.listen(4001, () => {
    console.log('Started on Port 4001')
})

// JSON.PARSER ჯსონს აქცევს ჯავასცკრიპტის ობიექტად
// Du hast Folgendes gesendet:
// JSON.stringify  მასივს აქცევს  ჯსონ სტრინგად