const { check, validationResult } = require("express-validator");
const indexModel = require("../models/index.model");
const postsModel = require("../models/posts.model");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
  let users = await indexModel.find({});
  res.render("signup", {
    pageTitle: "Authentication",
    isLoggedIn: false,
    MessageError: [],
    oldInputs: { fname: "", lname: "", username: "", email: "", password: "" },
  });
};

module.exports.handleSignUp = async (req, res) => {
  const { fname, lname, username, email, password } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user = await indexModel.findOne({ email });
    if (user) {
      res.render("signup", {
        pageTitle: "SignUp",
        MessageError: [{ param: "exists" }],
        isLoggedIn: false,
        oldInputs: { fname, lname, username, email, password },
      });
    } else {
      bcrypt.hash(password, 8, function (err, hashPassword) {
        indexModel.insertMany({ fname, lname, username, email, password: hashPassword });
        res.redirect("/signin");
      });
    }
  } else {
    res.render("signup", {
      pageTitle: "SignUp",
      isLoggedIn: false,
      MessageError: errors.array(),
      oldInputs: { fname, lname, username, email, password },
    });
  }
};
module.exports.signin = async (req, res) => {
    res.render("signin", {
        pageTitle: "SignIn",
        isLoggedIn: false,
        MessageError: [],
        oldInputs: { fname: "", lname: "", username: "", email: "", password: "" },
      });
};

module.exports.handleSignin = async (req, res) => {
  const { email, password } = req.body;
  const user = await indexModel.findOne({ email });
  if (user) {
              const match = await bcrypt.compare(password, user.password);
              if (match) {
                  req.session.isLoggedIn=true;
                  req.session.userID=user._id;
                  req.session.fName=user.fname;
                  res.redirect('/home')
              }else 
              {
                  res.render("signin", {
                      pageTitle: "SignIn",
                      isLoggedIn: false,
                      MessageError: [{param:'incorrect'}],
                      oldInputs: {  email, password },
                  });   
              }
            }
  else {
    res.render("signin", {
        pageTitle: "SignIn",
        isLoggedIn: false,
        MessageError: [{param:'notRegistered'}],
        oldInputs: { email, password },
      });   
    }
  }

module.exports.home = async (req, res) => {
    const posts = await postsModel.find({}).populate("UserID","fname -_id");
    res.render("home", { pageTitle: req.session.fName , isLoggedIn: req.session.isLoggedIn , posts });
};

module.exports.profile = async (req, res) => {
    const posts = await postsModel.find({UserID:req.session.userID});
    res.render("profile", { pageTitle: req.session.fName , isLoggedIn: req.session.isLoggedIn , posts });
};

module.exports.accSetting = async (req, res) => {
    let users = await indexModel.find({});
    res.render("acount-setting", {
        pageTitle: "Account Setting",
        isLoggedIn: true,
        MessageError: [],
        oldInputs: { password: "" , newPassword: "" , confirmPassword: "" }
    });
};

module.exports.handleSetting = async (req, res) => {
    const { password , newPassword , confirmPassword } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const user = await indexModel.findOneAndUpdate({  });
      
    }
    else {
      res.render("acount-setting", {
        pageTitle: "Account Setting",
        isLoggedIn: true,
        MessageError: errors.array(),
        oldInputs: { password, newPassword, confirmPassword }
      });
    }
};

module.exports.logout = (req, res) => {
    req.session.destroy(()=>{
      res.redirect('/signin')
    })
  };

module.exports.notfound = (req, res) => {
  res.send("not found 404");
};
