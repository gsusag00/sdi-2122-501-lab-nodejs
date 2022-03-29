module.exports = function(app,songsRepository){
    app.get("/songs",function(req,res) {
        let songs = [{
            "title": "Blank space",
            "price": "1.2"
        },{
            "title": "See you again",
            "price": "1.3"
        },{
            "title": "Uptown funk",
            "price": "1.1"
        },];

        let response = {
            "seller": "Tienda de canciones",
            songs: songs
        };
        res.render("shop.twig",response);
    });

    app.get('/songs/add',function(req,res){
        res.render("add.twig");
    });

    app.post('/songs/add',function(req,res) {
        let song = {
            title: req.body.title,
            kind: req.body.kind,
            price: req.body.price
        }
        songsRepository.insertSong(song,function(songId) {
            if(songId == null) {
                res.send("Error al insertar cancion");
            } else {
                res.send("Agregada la cancion ID: " + songId);
            }
        });
    });

    // app.get("/add",function(req,res) {
    //     let response = parseInt(req.query.num1) + parseInt(req.query.num2);
    //
    //     res.send(String(response));
    // });

    app.get("/songs/:id",function(req,res){
        let response = "id: " + req.params.id;
        res.send(response);
    });
    //
    // app.get("/songs/:kind/:id",function(req,res){
    //     let response = "Id: " + req.params.id + "<br>" + "Tipo de musica: " + req.params.kind;
    //     res.send(response);
    // });
    //mongodb+srv://admin:sdi@tiendamusica.dxqcq.mongodb.netthem/myFirstDatabase?retryWrites=true&w=majority



    app.get("/promo*",function(req,res) {
       res.send("Respuesta al patrón promo*")
    });

    app.get("/pro*ar",function(req,res) {
        res.send("Respuesta al patrón pro*ar")
    });
};