const Employee = require('../db/models/employee');
const logger = require('../config/winston');

exports.getEmployees = (req, res, next) => {
    Employee.find()
        .then(documents => {
            res.status(200).json({employees: documents});
    });
}

exports.postEmployee = (req, res, next) => {
    const employee = new Employee({
        name: req.body.name,
        password: req.body.password
    });
    employee.save().then(createdEmployee => {
        logger.info(createdEmployee);
        res.status(201).json({
            employeeId: createdEmployee._id
        });
    }); 
}

exports.deleteEmployee = (req, res, next) => {
    Employee.deleteOne({_id: req.params.id}).then(result => {
        logger.info(result);
        res.status(200).json({
            message: 'Deleted'
        });
    });
}

exports.getEmployee = (req, res, next) => {
  Employee.findById(req.params.id).then(employee => {
      logger.info(employee);
      if (employee) {
          res.status(200).json(employee);
      } else {
          res.status(404).json({ message: 'Employee not found' });
      }
  })
}

exports.putEmployee = (req, res, next) => {
    const employee = new Employee({
        _id: req.body.id,
        name: req.body.name,
        password: req.body.password
    });
    Employee.updateOne({_id: req.params.id}, employee).then(result => {
        res.status(200).json({ message: "Updated successfully" });
    });
}