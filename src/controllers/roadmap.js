const { catchAsync } = require("../helpers/request");
// const roadmapService = require('')

exports.createCourse = catchAsync(async(req,res)=>{
    const payload = {...req.body}
    res.body = await roadmapService.createCourse(payload)
    res.status(res.body.status).json(res.body)
})