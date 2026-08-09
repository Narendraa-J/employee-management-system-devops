const express=require('express');
const router=express.Router();
const {
    getEmployee,
    addEmployee,
    deleteEmployee,
    updateEmployee
} = require("../controllers/employeeControllers");
router.get("/",getEmployee)
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
module.exports=router;
