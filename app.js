//Require express
var express= require('express');
var app=express();
var path=require("path");
var htmlparser=require("htmlparser2");
var request=require('request');
var bodyParser = require('body-parser');
var request=require('superagent');
var nodemailer=require('nodemailer');

app.set('port',process.env.PORT||3000);
app.listen(app.get('port'),function(){
    console.log("Express started press Ctrl+C to terminate");
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.set('view engine', 'ejs');
app.get('/',function(req,res){
    res.render(path.join(__dirname+'/views/index.ejs'));
});
 
 
app.post('/', function (req, res) {
   // console.log("inside post");
  var mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "CS2610ContactPage@gmail.com",
          pass: "USUROCKS69" 
      }
  });
  //Mail options
  mailOpts = {
      from: req.body.firstname + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'derek.garner@aggiemail.usu.edu',
      subject: 'Website contact form',
      text: 'I would like some cool-aid!'
   
      
  };
   console.log(req.body.firstname);
    console.log(req.body.lastname);
     console.log(req.body.email);
      console.log(req.body.confirmEmail);
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Error causing email not to send
      if (error) {
           console.log('error');
          res.render('index', { title: 'ShadyCult', msg: 'Error occured, message not sent.', err: true, page: 'index' })
      }
      //Success
      else {
           console.log("success");
          res.render('index', { title: 'ShadyCult', msg: 'Message sent! Thank you.', err: false, page: 'index' })
      }
  });
});



