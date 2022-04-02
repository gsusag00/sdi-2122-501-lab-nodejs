const {ObjectId} = require("mongodb");

module.exports = function(app,commentsRepository) {

    app.post('/comments/:song_id', function(req,res) {
        if(req.session.user == null){
            res.redirect("/shop");
            return;
        }
        let comment = {
            author: req.session.user,
            text: req.body.comment,
            song_id: new ObjectId(req.params.song_id)
        }
        commentsRepository.addComment(comment).then(commentId => {
            res.send("Comentario hecho de manera satisfactoria: " + commentId)
        }).catch(error => {
            res.send("Error al comentar");
        });
    });

    app.get('comments/delete/:id', function(req,res) {
       if(req.session.user == null){
           res.redirect("/shop");
       }
       let filter = {_id: ObjectId(req.params.id)};
       let options = {};
       commentsRepository.findComment(filter,options).then(comment => {
           if(comment.author != req.session.user) {
               res.send('No puedes borrar un comentario que no has hecho.')
           }
       }).catch(error=> res.send("Se ha producido un error al buscar un comentario: " + error));
       commentsRepository.deleteComment(filter,options).then(() => {
           res.redirect("/shop");
       }).catch(error=> res.send("Se ha producido un error al borrar el comentario: " + error));
    });



}