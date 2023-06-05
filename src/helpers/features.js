exports.pagination =async (model,query,pageNumber,resultsPerPage,)=>{

const page = Number(pageNumber);
       return model
        .find(query)
        .limit(resultsPerPage)
        .skip(resultsPerPage * (page -1))
        .sort({createdAt: -1})

}