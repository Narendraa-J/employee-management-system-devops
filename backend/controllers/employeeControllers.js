const addEmployee = (req, res) => {
    const db = require("../database/db");

    const { name, department } = req.body;

    const sql = "INSERT INTO employees (name, department) VALUES (?, ?)";

    db.query(sql, [name, department], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        res.json({
            message: "Employee Added Successfully"
        });

    });

};
const getEmployee=(req,res)=>{
    const db = require("../database/db");
    const sql="select * from employees";
    console.log("=== GET /employees called ===");
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({
                message:"Database Error",
                error:err
            })
        }
        res.json(result);
    })
}
const deleteEmployee = (req, res) => {
    const db = require("../database/db");
    const { id } = req.params;

    const sql = "DELETE FROM employees WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json({
            message: "Employee Deleted Successfully"
        });

    });

};
const updateEmployee = (req, res) => {
    const db = require("../database/db");
    const { id } = req.params;
    const { name, department } = req.body;

    const sql = `
        UPDATE employees
        SET name = ?, department = ?
        WHERE id = ?
    `;

    db.query(sql, [name, department, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json({
            message: "Employee Updated Successfully"
        });

    });

};


module.exports={
    addEmployee,
    getEmployee,
    deleteEmployee,
    updateEmployee
};
