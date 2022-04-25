const express               =  require('express'),
      app                   =  express(),
      path                  = require('path'); // added from m4_w2_d1 demo
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      User                  =  require("./models/user"),
      mongoSanitize         =  require('express-mongo-sanitize'),
      rateLimit             =  require('express-rate-limit'),
      xss                   =  require('xss-clean'),
      helmet                =  require('helmet')

//Connecting database
mongoose.connect("mongodb://localhost/project2_xi");

// const expSession = require("express-session") ({
//     secret:"mysecret",       //decode or encode session
//     resave: false,          
//     saveUninitialized:false    
// });

const expSession = require("express-session");
app.use(
  expSession({
    secret: "mysecret", //decode or encode session
    resave: false,
    saveUninitialized: true, //
    cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1*60*1000 // 10 minutes
    }
  })
);


passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());
// app.use(expSession);
app.use(express.static("public"));


//=======================
//      O W A S P
//=======================
// Data sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());

const limit = rateLimit( {
    max:100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests'
});
app.use('/routeName', limit);
// Preventing DOS Attacks - Body Parser
app.use(express.json({ limit: '10kb'})); //Body limit is 10
// Data Sanitization against XSS attacks
app.use(xss());
// Helmet to secure connection and data
app.use(helmet());

//=======================
//      R O U T E S
//=======================
app.get("/", (req,res) =>{
    res.render("home");
})
// app.get("/userprofile" ,(req,res) =>{
//     res.render("userprofile");
// })
//Auth Routes
app.get("/login",(req,res)=>{
    res.render("login");
});
app.post("/login",passport.authenticate("local",{
    successRedirect:"/indexaftrlogin",
    failureRedirect:"/login"
}),function (req, res){
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.post("/signup",(req,res)=>{
    
    User.signup(new User({username: req.body.username,email: req.body.email,phone: req.body.phone}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("signup");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/indexaftrlogin");
        })    
    })
});

// app.get("/logout",(req,res)=>{
//     req.logout();
//     res.redirect("/");
// });
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

//Listen On Server
app.listen(process.env.PORT || 3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");  
    }
});



