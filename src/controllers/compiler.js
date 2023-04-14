const { catchAsync } = require("../helpers/request");
const axios = require('axios')

exports.compileCode = catchAsync(async(req,res)=>{
    const {language, script} = req.body
    const {data} = await axios.post('https://api.jdoodle.com/v1/execute',{
        clientId: "8be10b9201107c8df5f53e589d900738",
      clientSecret:
        "7fe614181563e66948394a88ad2c72da29d96c95ee182dd314598403b7fa51a",
      script,
      stdin: "",
      language,
      versionIndex: "0",
      },{
        headers: {
          'Content-Type': 'application/json'
      },
      })
      res.status(200).json(data)
})