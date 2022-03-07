const jwt=require('jsonwebtoken')


const isValidToken=(req,res, next)=>{
    const token = req.cookies['token']
  
    if (token){
      jwt.verify(
        token, 
        process.env.SECRET_KEY,
        function(err,decoded){
          if (decoded){
            console.log("this is my payload with my token", decoded),
            next(); //NEXT IS SO REQUIRED TO MOVE TO THE NEXT STEP OR ELSE IT WILL THROW AN ERror
          }else{
            res.redirect('/error') //this is redirecting to error.ejs 
          }
        }
      )
    }else{
      res.redirect('/error')
    }
  }

  module.exports = isValidToken; 