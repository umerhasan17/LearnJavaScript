module.exports = function (app , db) {
    app.post('/notes' , (req , res) => {
        // We'll create the note here
        res.send('Hello');
    })
}