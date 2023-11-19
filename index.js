const express=require('express')
const app=express()
//fs module help to interact with the file system on your computer or server.
const fs=require('fs')
//path module provides utilities for working with file and directory paths. It helps in constructing and manipulating file paths in a platform-independent way, handling differences in path syntax between operating systems (e.g., Windows, Linux, macOS).
const path = require("path")

//It will create a text file in a particular folder where the file name is current date-time.txt & its content is current timestamp
app.post("/createFolder/:folderName",(req,res)=>{
//Folder Created here..
    fs.mkdir(`./${req.params.folderName}`, (err) => {
        if (err) {
          console.error(`Error creating directory: ${err}`);
        } else {
          console.log('Directory created successfully');
        }
    })

//It is the creation of a new JavaScript Date object representing the current date and time at the moment the statement is executed.
    let timestamp = new Date() 
    // current date
    // adjust 0 before single digit date
    let date =`0${timestamp.getDate()}`.slice(-2)
    // current month
    let month =`0${timestamp.getMonth()}`.slice(-2)
    // current Year
    let year =timestamp.getFullYear()
    // current hours
    let hours=`0${timestamp.getHours()}`.slice(-2)
    // current minutes
    let minutes=`0${timestamp.getMinutes()}`.slice(-2)
    // current seconds 
    let seconds =`0${timestamp.getSeconds()}`.slice(-2)

    let fileName=`${date}-${month}-${year} ${hours}H${minutes}M${seconds}S`

//We create a text file in a particular folder where the file name is current date-time.txt & its content is current timestamp
    fs.writeFile(`./${req.params.folderName}/${fileName}.txt`,`${timestamp}`,(err)=>{
        if (err) throw err;
        //Send a JSON response with the file created details to the client
        res.json({message:`${fileName}.txt file created in ${req.params.folderName} folder`})
        console.log('The file has been saved');
    })
})

//It is to retrieve all the text files in that particular folder.
app.get("/createFolder/:folderName",(req,res)=>{
    
    fs.readdir(`./${req.params.folderName}`,(err,files)=>{
        if (err) throw err;
        const txtFiles = [];
        //It is to get only the text files through loop
        files.forEach((file)=>{
            if (path.extname(file) == ".txt") {
                txtFiles.push(file)
            }
        })
        //Send a JSON response with the file names to the client
        res.json({ text_files: txtFiles})
    })
})   

// app.listen(8000,'0.0.0.0')
app.listen(process.env.PORT || 8000)
