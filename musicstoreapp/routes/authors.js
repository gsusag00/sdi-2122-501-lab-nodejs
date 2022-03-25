module.exports = function(app){

    app.get('/authors/add', function(req,res) {
        res.render('authors/add.twig');
    });
}

