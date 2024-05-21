//1. import express module
let ex = require('express')
//2.Create app object using express() constructor
let app = ex();
let PORT = 8081;
// let user1='charan'
// let pass1='cupcake'
let users=[];
//3.Handle request using various methods .get(),.post(),.put(),.delete()

//CRUD - Read operations
app.get('/log',(request,response)=>{
    let username = request.query.uname; //from client
    let password = request.query.pass; //from client
    let flag=0;
    for(let i in users){
        //console.log(users[i])
        if(username===users[i]['username'] && password===users[i]['password'])
        {
            // response.sendFile(`<h1> Hello ${username} <br> Your Login is successful </h1>`)
            flag=1;
            response.sendFile(__dirname+'/sucess.html')
        }
    }
    if(flag==0)
    {
        // response.send(`<h1>Invalid username or password </h1><br> please click her to register <a href="/reg">click Here</a>`)
        response.sendFile(__dirname+'/fail.html')
    }
        // response.send(`<h1> Hello ${username} <br> Your Login is successful </h1>`)
   })
app.get('/',(request,response)=>{
    response.sendFile(__dirname+'/home.html');
})
app.get('/login',(request,response)=>{
    response.sendFile(__dirname+'/login.html');
})
app.get('/reg',(request,response)=>{
    response.sendFile(__dirname+'/reg.html');
})

app.get('/edit',(request,response)=>{
    response.sendFile(__dirname+'/edit.html');
})

app.get('/delete',(request,response)=>{
    response.sendFile(__dirname+'/delete.html');
})

//CRUD - Update operation
app.get('/ed',(req,res)=>{
    let fn1=req.query.fname;
    let ln1=req.query.lname;
    let un1=req.query.uname;
    let ps1= req.query.pass;
    let em1=req.query.mail;
    let ht1=req.query.roll;
    let cr1=req.query.cname;
    let gn1=req.query.gen1;
    let f=0;
    for(let i in users)
    {
        if(users[i]['username']==un1&&users[i]['password']==ps1)
        {
            users[i]['firstname']=fn1;
            users[i]['lastname']=ln1;
            users[i]['email']=em1;
            users[i]['rollno']=ht1;
            users[i]['course']=cr1;
            users[i]['gender']=gn1;
            f=1
            break
        }
    }
    if(f===1)
    {
        res.send(`<h2> Hello ${un1} <br> Your Profile is successful Changed <br> <a href='/'> Click Here goto Home page </a></h2>`)
    }
    else
    {
        res.send(`<h2>Sorry Invalid Username Or Password <br> <a href='/'> Click Here goto Home page </a> </h2>`)
    }

})

//CRUD- Delete Operation
app.get('/del',(req,res)=>{
    let u=req.query.uname;
    let p=req.query.pass;
    let si=-1;
    let f=0
    for(let i in users)
    {
        if(users[i]['username']==u&&users[i]['password']==p)
        {
            si=i
            f=1
            break
        }
    }
    if(f===1)
    {
        users.splice(si,1)
        res.send(`<h2>${u} is Successfully Deleted<br> <a href='/'> Click Here goto Home page </a> </h2>`);
    }
    else
    {
        res.send(`<h2>Invalid Details<br> <a href='/'> Click Here goto Home page </a> </h2>`);
    }
})
//CRUD- Create operation 
app.get('/regis',(req,res)=>{
    let fn=req.query.fname;
    let ln=req.query.lname;
    let un=req.query.uname;
    let ht=req.query.roll;
    let ps=req.query.pass;
    let em=req.query.mail;
    let cr=req.query.cname;
    let gn=req.query.gen1;
    users.push({"firstname":fn,"lastname":ln,"username":un,"rollno":ht,"password":ps,"email":em,"course":cr,"gender":gn});
    res.send(`<h2>Thank you Mr./Mrs.${un} for Registering <br> <a href='/'> Click Here goto Home page </a> </h2>`);
})

//Users Details(Displaying)
app.get('/show', (req, res) => {
    let tableHTML = '<h1 align="center">User Details</h1><table border="1" align="center"><tr><th>FirstName</th><th>LastName</th><th>Username</th><th>RollNo</th><th>Email</th><th>Gender</th></tr>';

    users.forEach((users) => {
        tableHTML += `<tr><td>${users.firstname}</td><td>${users.lastname}</td><td>${users.username}</td><td>${users.rollno}</td><td>${users.email}</td><td>${users.gender}</td></tr>`;
    });

    tableHTML += '</table>';

    // Sending the HTML with user details in table format as a response
    res.send(tableHTML);
});

//4.Set the port number using listen()
app.listen(PORT,(err,data)=>{
    if(err)
    {
        console.log(`Unable to connect to server`)
    }
    else
    {
        console.log(`Server is connected on port ${PORT}`)
    }
})