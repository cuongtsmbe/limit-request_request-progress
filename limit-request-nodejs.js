const rateLimit = require("express-rate-limit");
const app =require("express")();
const https = require('https')
const limiter=rateLimit({
    windowMs:60*1000,//time for max:2 request
    max:2,// max request is 2
    //message:"co nhieu request qua di",  //co the thay message bang -> handler phia duoi
    handler:function(req,res,next){//neu limit executed thi thuc hien function nay
        res.status(429).json({error_limit:"co nhieu request qua di !!!"});//if max request then response this json
    },
    skip:function (req,res) {
     if((req.rawHeaders[1]==='127.0.0.1:3000')&&(req.url==='/api/nolimit')){
         return true;// skip limit request for this link 
     }
        return false;
    }
});

app.use(limiter);//middware execute limit for all request require

app.get("/api/limit",function(req,res,next){
    res.status(200).send("da thuc hien request den api/limit thanh cong");
});
app.get("/api/nolimit",function(req,res,next){
    res.status(200).send("da thuc hien request den api/nolimit ");
});

app.listen(3000,function(){
    console.log("listen port 3000");
});





