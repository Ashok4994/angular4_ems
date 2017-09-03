var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employeeSchema = new Schema({

    name: {
        type: String,
        required:true,
        unique:true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    salary: {
      type: String,
      required:true
    }
});

var Employees = mongoose.model('Employee',employeeSchema);
module.exports = Employees;
