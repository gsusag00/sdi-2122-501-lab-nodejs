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
        console.log(comment);
        commentsRepository.addComment(comment).then(commentId => {
            res.send("Comentario hecho de manera satisfactoria: " + commentId)
        }).catch(error => {
            res.send("Error al comentar");
        });
    });

}