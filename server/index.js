var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '666666',
  database : 'oysy'
});
 
connection.connect(err=>{
    if(err){
        console.log("数据库链接失败",err)
        
        return
    }
    console.log("数据库链接成功")
});

connection.query('SELECT * from student where studentID = "1440225120"', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});