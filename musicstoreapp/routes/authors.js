module.exports = function(app){

    app.get('/authors/add', function(req,res) {
        let roles = [{
            "name": "Cantante",
            "value": "cantanate"
        },{
            "name": "Bateria",
            "value": "bateria"
        },{
            "name": "Guitarrista",
            "value": "guitarrista"
        },{
            "name": "Teclista",
            "value": "teclista"
        }];
        let response = {
          roles: roles
        };
        res.render('authors/add.twig',response);
    });

    app.post('/authors/add', function(req,res) {
        let response = "";
        let a = req.body.name;
        response += a!=undefined? "Nombre: " + a : "Nombre no enviado";
        a = req.body.group;
        response += a!=undefined? " Grupo: " + a : " Grupo no enviado";
        a = req.body.role;
        response += a!=undefined? " Rol: " + a : " Rol no enviado";
        res.send(response);
    });

    app.get('/authors',function (req,res) {
        let authors = [{
            "name": "Lil Uzi Vert",
            "group": "Lil Uzi Vert",
            "role": "Cantante"
        },{
            "name": "Metro Booming",
            "group": "MB",
            "role": "Teclista"
        },{
            "name": "Lil Tecca",
            "group": "LT",
            "role": "Guitarrista"
        },];

        let response = {
            authors: authors
        };
        res.render("authors/authors.twig",response);
    });

    app.get('/authors/filter/:id',function(req,res) {
        let authors = [{
            "name": "Lil Uzi Vert",
            "group": "Lil Uzi Vert",
            "role": "Cantante"
        },{
            "name": "Metro Booming",
            "group": "MB",
            "role": "Teclista"
        },{
            "name": "Lil Tecca",
            "group": "LT",
            "role": "Guitarrista"
        },];
        let filtered = authors.filter((a) => a.role == req.params.id);
        console.log(filtered);

        let response = {
            authors: filtered
        };
        res.render("authors/authors.twig",response);
    });

    app.get('/au**rs/:id',function (req,res){
        res.redirect("/authors");
    });
}

