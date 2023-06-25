var express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');


var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Starting the server
app.listen(3000, () => {
console.log("Server running on port "+3000);
});


//Declaring JSON Array

let Students = 
[   {
        "SID": 1001,
        "FName": "Hiruni",
        "LName": "Nanayakkara", 
        "Email": "hiruni@gmail.com",
        "City": "Gampaha"
    },

    {
        "SID": 1002,
        "FName": "Devindi",
        "LName": "Abeysiriwardhane", 
        "Email": "devindi@gmail.com",
        "City": "Colombo"

    },

    {
        "SID": 1003,
        "FName": "Rajeendra",
        "LName": "Prabhawi", 
        "Email": "rajee@gmail.com",
        "City": "Gampaha"

    },

    {
        "SID": 1004,
        "FName": "Imasha",
        "LName": "Peramuna", 
        "Email": "ima@gmail.com",
        "City": "Colombo"

    },

    {
        "SID": 1005,
        "FName": "Ishini",
        "LName": "Yasanayeke", 
        "Email": "ishini@gmail.com",
        "City": "Yakkala"

    },

    {   "SID": 1006,
        "FName": "Shanuka",
        "LName": "Devinda", 
        "Email": "deva@gmail.com",
        "City": "Yakkala"

     },

     {   "SID": 1007,
        "FName": "Sachin",
        "LName": "Akash", 
        "Email": "sachi@gmail.com",
        "City": "Yakkala"

     },

     {  "SID": 1008,
        "FName": "Nethmi",
        "LName": "Nayanathara", 
        "Email": "nethu@gmail.com",
        "City": "Yakkala"

    },

    {   "SID": 1009,
        "FName": "Manu",
        "LName": "Kavisha", 
        "Email": "manu@gmail.com",
        "City": "Yakkala"

    }

];
let Student = {   "SID": 1010,
                  "FName": "Sanu",
                  "LName": "Peris", 
                  "Email": "sanu@gmail.com",
                  "City": "Yakkala"
              };

Students.push(Student);


//View-(Show all Students)
app.get("/students", (req, res)=> {
    res.json(Students);
});

//View-(Find a Student by SID)
app.get("/students/id/:SID", (req, res)=> {
    let sid=parseInt(req.params.SID);
    let student = Students.find((student) => student.SID == sid);
    console.log(sid);
    if(student){
        res.json(student)
    }else{
        res.sendStatus(404)
    }
});


// //View-(Find a Student by FName)
app.get("/students/fname/:fname", (req, res)=> {
    let fname=req.params.fname;
    let student = Students.find((student) => student.FName == fname);
    if(student){
        res.json(student)
    }else{
        res.sendStatus(404)
    }
});

// //View-(Find a Student by LName)
app.get("/students/lname/:lname", (req, res)=> {
    let lname=req.params.lname;
    let student = Students.find((student) => student.LName == lname);
    if(student){
        res.json(student)
    }else{
        res.sendStatus(404)
    }
});

// //View-(Find a Student by Email)
app.get("/students/email/:email", (req, res)=> {
    let email=req.params.email;
    let student = Students.find((student) => student.Email == email);
    if(student){
        res.json(student)
    }else{
        res.sendStatus(404)
    }
});


// //Delete Student by SID//
  app.delete("/students/delete/:SID", (req, res) => {
     let StudentID = parseInt(req.params.SID);
     console.log(StudentID)
     //Students.splice(StudentID, 1);

     const studentIndex = Students.findIndex(student => student.SID === StudentID);

    if (studentIndex === -1) {
     // return res.json({ error: 'Student not found.' });
     res.send(false);
    }

    Students.splice(studentIndex, 1);
    //return res.json({ msg: 'Student found.'});
    res.send(true)
});

//Add function//
app.post("/students/add/",(req,res)=>{
        try{
        const student=req.body;
        console.log(student)
        Students.push(student);
        res.statusMessage = "Student Added.";
        res.json(student)
        } catch(error){
            res.statusMessage = "Student Can not be added.";
            res.sendStatus(404);
        }
     })

//get Function
app.get("/students/city/:city",(req,res)=>{
    let City =( req.params.city);
    console.log(City);
    let studentsInCity = Students.filter(student => student.City === City);
    res.json(studentsInCity);
    console.log(studentsInCity)
})
//update function
app.put("/students/update/:SID",(req,res) =>{
    let StudentID = parseInt(req.params.SID);
    let updatedStudentData = req.body;
    console.log("ID"+StudentID);
    console.log(updatedStudentData)
    for (let i = 0; i < Students.length; i++) {
        if (Students[i].SID === StudentID) {
            Students[i].FName = updatedStudentData.FName;
          break;
        }else{
            res.send(false)
 
        }
      }
      res.send(true);
})





