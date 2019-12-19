const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/adminEmployees');

//http://localhost:4200/admin/employees {GET}
router.get('/', EmployeeController.getEmployees);

//http://localhost:4200/admin/employees {POST}
router.post('/', EmployeeController.postEmployee);

//http://localhost:4200/admin/employees/:id {DELETE}
router.delete('/:id', EmployeeController.deleteEmployee);

//http://localhost:4200/admin/employees/:id {GET}
router.get('/:id', EmployeeController.getEmployee);

//http://localhost:4200/admin/employees/:id {PUT}
router.put('/:id', EmployeeController.putEmployee);

module.exports = router;