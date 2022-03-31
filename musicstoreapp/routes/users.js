module.exports = function(app,usersRepository) {
  app.get('/users', function (req, res) {
    res.send('lista de usuarios');
  });

  app.get('/users/signup', function (req, res) {
    res.render("signup.twig");
  });

  app.post('/users/signup', function (req, res) {
    let securePassword = app.get("crypto").createHmac('sha256', app.get('clave'))
        .update(req.body.password).digest('hex');
    let user = {
      email: req.body.email,
      password: securePassword
    }
    usersRepository.insertUser(user).then(userId => {
      res.send('Usuario registrado ' + userId);
    }).catch(error => {
      res.send("Error al insertar el usuario");
    });
  });
}
