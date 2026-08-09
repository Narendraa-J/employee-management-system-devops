const employeeTable = document.getElementById("employeeTable");
console.log(employeeTable);
const addButton = document.getElementById("addEmployee");
let editingEmployeeId = null;
async function loadEmployees() {

    console.log("Loading employees...");

    const response = await fetch("http://localhost:5000/employees");

    console.log(response);

    const employees = await response.json();

    console.log(employees);

    employeeTable.innerHTML = "";

    employees.forEach((employee) => {

        console.log(employee);

        employeeTable.innerHTML += `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>
                <button class="edit-btn" data-id="${employee.id}">
                    Edit
                </button>

                <button class="delete-btn" data-id="${employee.id}">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

}
loadEmployees();
document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const id = event.target.dataset.id;
        await fetch(`http://localhost:5000/employees/${id}`, {
            method: "DELETE"
        });
        loadEmployees();
    }
});
document.addEventListener("click", (event) => {

    if (event.target.classList.contains("edit-btn")) {

        const row = event.target.closest("tr");

        editingEmployeeId = event.target.dataset.id;

        document.getElementById("name").value =
            row.children[1].textContent;

        document.getElementById("department").value =
            row.children[2].textContent;

        addButton.textContent = "Update Employee";

    }

});

addButton.addEventListener("click", async () => {

    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;

    if (!name || !department) {
        alert("Please enter all fields");
        return;
    }

    if (editingEmployeeId === null) {

        // ADD EMPLOYEE

        await fetch("http://localhost:5000/employees", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                department
            })

        });

    } else {

        // UPDATE EMPLOYEE

        await fetch(`http://localhost:5000/employees/${editingEmployeeId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                department
            })

        });

        editingEmployeeId = null;

        addButton.textContent = "Add Employee";

    }

    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
    loadEmployees();

});