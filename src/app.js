const express = require('express');
const path = require('path');
const app = express();

const hbs =require("hbs")
require('./db/conn.js');
const Register = require("./models/registers");


const port = process.env.PORT || 5004;
//console.log(path.join(__dirname ,  "../templates/views") );
//const static_path = path.join(__dirname , "../public")
const template_path = path.join(__dirname , "../templates/views")
const partial_path = path.join(__dirname , "../templates/partials")


app.use(express.json());
app.use(express.urlencoded({extended:false}))

//app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",template_path)
hbs.registerPartials(partial_path)

app.get("/", (req,res) =>{
    res.render("index")

    
});

app.get("/register", (req,res) => {
    res.render("register")
} )


app.post("/register", async (req,res) => {
   try {
    const password =  req.body.password;
    const cpassword = req.body.cpassword;
    //console.log(req.body.firstname)

    if(password  === cpassword){
        const registerEmployee = new Register({
            
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            //gender : req.body.gender,
            phone : req.body.phone,
            //age : req.body.age,
            password : req.body.password,
            cpassword : req.body.cpassword
        })
        
        const registered = await registerEmployee.save();
        //console.log(registerEmployee)
        res.status(201).render(index)

    }else{
        res.end("password is not match")
    }
    
   } catch (error) {
    res.status(400).send(error)
   }
} )




app.listen(port , () => {
    console.log("server is runing")
});