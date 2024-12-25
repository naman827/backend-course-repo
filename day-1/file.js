const fs=require("fs")

//* write
    // fs.writeFileSync("./hello.txt","hey welcome to hello .txt file😎😎😎😎😎")
    // fs.writeFileSync("./text.txt","hey welcome to text.txt file😎😎😎😎😎")
//* read
//    const res= fs.readFileSync("./hello.txt","utf8")
//    console.log(res)
//* update/apend
// fs.appendFileSync("./hello.txt","hello welcome to my text.text file😎😎😎😎😎😎")
    
//* delete
// fs.unlinkSync("./text.txt")
// fs.unlink("./text.txt",(err)=>{
//     if(err){
//         console.log("there is an error in deleting textr.txt file 😔😔😔😔",err)
//     }else{
//         console.log("the text.txt file is deleted sucessfully😃😃😃😃😃")
//     }
// })