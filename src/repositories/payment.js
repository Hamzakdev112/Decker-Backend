const paymentModel = require ("../models/schema/payment")


exports.create = async(payload)=>{
    return paymentModel.create(payload)
}
