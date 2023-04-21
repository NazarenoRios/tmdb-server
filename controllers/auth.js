const { User, Movies } = require("../models");
const tokens = require("../config/tokens");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "860870041014-ouinu3c3c7162n61tuqnlubvrv7dlv3i.apps.googleusercontent.com"
);

exports.register = (req, res) => {
  const user = req.body;
  User.create(user)
    .then(() => res.sendStatus(201))
    .catch(err => res.sendStatus(401) )
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    where: { email: email },
    include: {
      model: Movies,
    },
  }).then((user) => {
    if (!user) return res.sendStatus(401);

    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        pic: user.pic
      };
      const token = tokens.generateToken(payload);
      res.status(201).json({
        error: false,
        message: "login successfully",
        user: { ...payload, token },
      });
    });
  });
};

exports.validation = (req, res) => {
  res.send(req.user);
};

exports.persistence = (req,res) => {
  const { id } = req.params;

  User.findByPk(id, {
    attributes: [
      "id",
      "name",
      "lastname",
      "email",
      "pic"
    ]
  }).then(user => res.status(200).send(user))
  .catch(err => console.log(err))
}

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

exports.googlelogin = (req, res) => {
  const { credential } = req.body;

  client
    .verifyIdToken({
      idToken: credential,
      audience:
        "860870041014-ouinu3c3c7162n61tuqnlubvrv7dlv3i.apps.googleusercontent.com",
    })
    .then((userInfo) => {
      const { email, given_name, family_name } = userInfo.payload;

      let password = email + email;

      User.findOne({
        where: { email: email },
        include: {
          model: Movies,
        },
      }).then((user) => {
        if (!user) {
          return User.create({email: email, password: password, name: given_name, lastname: family_name})
            .then((user) => {
              user.validatePassword(password).then((isValid) => {
                if (!isValid) return res.send(401);

                const payload = {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  lastname: user.lastname,
                };
                const token = tokens.generateToken(payload);
                // res.cookie("token", token);
                res.status(201).send({...payload,token});
              })
            });
        }

        user.validatePassword(password).then((isValid) => {
          if (!isValid) return res.send(401);

          const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
          };
          const token = tokens.generateToken(payload);
          // res.cookie("token", token);
          res.status(201).send({...payload,token});
        });
      });
    });
};
