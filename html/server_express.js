var express =require("express");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended:true
}));
/* 创建服务器 */
var app = express();

/* 接受请求并反馈数据渲染到界面*/
app.get("/",function(req,res){
    res.send("我是响应给客户端的一个字符串，自从用来express之后我再也不用设置请求头的字符编码啦！~~~");
})

app.listen(3000,function(){
    console.log("running....");
})