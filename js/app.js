let schoolManager = new SchoolManager();
let financialChartInstance = null;
let peopleChartInstance = null;

function showPage(pageName) {
  document.querySelectorAll('.page-content').forEach(page => {
    page.style.display = 'none';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });

  document.getElementById('page-' + pageName).style.display = 'block';
  document.getElementById('nav-' + pageName).classList.add('active');

  if (pageName === 'dashboard') {
    updateDashboardStats();
    updateCharts();
  } else if (pageName === 'students') {
    displayStudentsTable();
  } else if (pageName === 'employees') {
    displayEmployeesTable();
  } else if (pageName === 'relationships') {
    populateRelationshipDropdowns();
    displayRelationships();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const studentForm = document.getElementById("studentForm");
  if (studentForm) {
    studentForm.addEventListener("submit", handleAddStudent);
  }

  const employeeForm = document.getElementById("employeeForm");
  if (employeeForm) {
    employeeForm.addEventListener("submit", handleAddEmployee);
  }

  const assignTeacherForm = document.getElementById("assignTeacherForm");
  if (assignTeacherForm) {
    assignTeacherForm.addEventListener("submit", handleAssignTeacher);
  }

  const assignSupervisorForm = document.getElementById("assignSupervisorForm");
  if (assignSupervisorForm) {
    assignSupervisorForm.addEventListener("submit", handleAssignSupervisor);
  }

  const clearBtn = document.getElementById("clearDataBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
        location.reload();
      }
    });
  }

  updateDashboardStats();
  updateCharts();
});

function updateDashboardStats() {
  document.getElementById("totalStudents").textContent = schoolManager.students.length;
  document.getElementById("totalEmployees").textContent = schoolManager.employees.length;
  document.getElementById("totalRevenue").textContent = "$" + schoolManager.calculateTotalRevenue().toFixed(2);
  document.getElementById("totalExpenses").textContent = "$" + schoolManager.calculateTotalExpenses().toFixed(2);
  document.getElementById("netProfit").textContent = "$" + schoolManager.calculateProfit().toFixed(2);
}

function updateCharts() {
  if (financialChartInstance) {
    financialChartInstance.destroy();
  }
  if (peopleChartInstance) {
    peopleChartInstance.destroy();
  }

  const ctx1 = document.getElementById("financialChart");
  if (ctx1) {
    const stats = schoolManager.generateStats();
    financialChartInstance = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: stats.financial.labels,
        datasets: [{
          label: "Amount ($)",
          data: stats.financial.data,
          backgroundColor: ["#4CAF50", "#880914", "#FFC107"],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  const ctx2 = document.getElementById("peopleChart");
  if (ctx2) {
    const stats = schoolManager.generateStats();
    peopleChartInstance = new Chart(ctx2, {
      type: "pie",
      data: {
        labels: stats.people.labels,
        datasets: [{
          label: "Count",
          data: stats.people.data,
          backgroundColor: ["#880914", "#b71c1c", "#d32f2f", "#ff5252", "#ff8a80"],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }
}

function handleAddStudent(event) {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const age = parseInt(document.getElementById("studentAge").value);
  const joinDate = new Date(document.getElementById("studentJoinDate").value);
  const fee = parseFloat(document.getElementById("studentFee").value);

  if (!name || age < 5 || age > 25 || fee < 0) {
    alert("Please provide valid input values!");
    return;
  }

  const student = new Student(schoolManager.generateId("S"), name, age, joinDate, fee);
  schoolManager.addStudent(student);
  displayStudentsTable();
  event.target.reset();
  alert("Student added successfully!");
}

function displayStudentsTable() {
  const tbody = document.getElementById("studentTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  schoolManager.students.forEach((student) => {
    const row = document.createElement("tr");
    const teacherName = student.getAssignedTeacher() ? student.getAssignedTeacher().getName() : "Not Assigned";

    row.innerHTML = `
      <td>${student.getId()}</td>
      <td>${student.getName()}</td>
      <td>${student.getAge()}</td>
      <td>${student.getJoinDate().toLocaleDateString()}</td>
      <td>$${student.getMonthlyFee().toFixed(2)}</td>
      <td>$${student.calculateTotalFees().toFixed(2)}</td>
      <td>${teacherName}</td>
      <td>
        <button class="btn-danger btn-small" onclick="removeStudent('${student.getId()}')">Remove</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

window.removeStudent = function (studentId) {
  if (confirm("Are you sure you want to remove this student?")) {
    schoolManager.removeEntityById(studentId);
    displayStudentsTable();
    alert("Student removed successfully!");
  }
};

function handleAddEmployee(event) {
  event.preventDefault();

  const type = document.getElementById("employeeType").value;
  const name = document.getElementById("employeeName").value.trim();
  const age = parseInt(document.getElementById("employeeAge").value);
  const joinDate = new Date(document.getElementById("employeeJoinDate").value);
  const salary = parseFloat(document.getElementById("employeeSalary").value);

  if (!type || !name || age < 18 || age > 70 || salary < 0) {
    alert("Please provide valid input values!");
    return;
  }

  let employee;
  const id = schoolManager.generateId("E");

  switch (type) {
    case "Teacher":
      employee = new Teacher(id, name, age, joinDate, salary);
      break;
    case "Supervisor":
      employee = new Supervisor(id, name, age, joinDate, salary);
      break;
    case "Janitor":
      employee = new Janitor(id, name, age, joinDate, salary);
      break;
    case "SecurityGuard":
      employee = new SecurityGuard(id, name, age, joinDate, salary);
      break;
  }

  schoolManager.addEmployee(employee);
  displayEmployeesTable();
  event.target.reset();
  alert("Employee added successfully!");
}

function displayEmployeesTable() {
  const tbody = document.getElementById("employeeTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  schoolManager.employees.forEach((employee) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${employee.getId()}</td>
      <td>${employee.getName()}</td>
      <td>${employee.constructor.name}</td>
      <td>${employee.getAge()}</td>
      <td>${employee.getJoinDate().toLocaleDateString()}</td>
      <td>$${employee.getMonthlySalary().toFixed(2)}</td>
      <td>$${employee.calculateSalary().toFixed(2)}</td>
      <td>${employee.getRoleDescription()}</td>
      <td>
        <button class="btn-danger btn-small" onclick="removeEmployee('${employee.getId()}')">Remove</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

window.removeEmployee = function (employeeId) {
  if (confirm("Are you sure you want to remove this employee?")) {
    schoolManager.removeEntityById(employeeId);
    displayEmployeesTable();
    alert("Employee removed successfully!");
  }
};

function populateRelationshipDropdowns() {
  const studentSelect = document.getElementById("selectStudent");
  if (studentSelect) {
    studentSelect.innerHTML = '<option value="">-- Select Student --</option>';
    schoolManager.students.forEach((student) => {
      const option = document.createElement("option");
      option.value = student.getId();
      option.textContent = `${student.getName()} (${student.getId()})`;
      studentSelect.appendChild(option);
    });
  }

  const teacherSelects = [
    document.getElementById("selectTeacher"),
    document.getElementById("selectTeacherForSupervisor"),
  ];

  teacherSelects.forEach((select) => {
    if (select) {
      select.innerHTML = '<option value="">-- Select Teacher --</option>';
      schoolManager.teachers.forEach((teacher) => {
        const option = document.createElement("option");
        option.value = teacher.getId();
        option.textContent = `${teacher.getName()} (${teacher.getId()})`;
        select.appendChild(option);
      });
    }
  });

  const supervisorSelect = document.getElementById("selectSupervisor");
  if (supervisorSelect) {
    supervisorSelect.innerHTML = '<option value="">-- Select Supervisor --</option>';
    schoolManager.supervisors.forEach((supervisor) => {
      const option = document.createElement("option");
      option.value = supervisor.getId();
      option.textContent = `${supervisor.getName()} (${supervisor.getId()})`;
      supervisorSelect.appendChild(option);
    });
  }
}

function handleAssignTeacher(event) {
  event.preventDefault();

  const studentId = document.getElementById("selectStudent").value;
  const teacherId = document.getElementById("selectTeacher").value;

  if (!studentId || !teacherId) {
    alert("Please select both student and teacher!");
    return;
  }

  const success = schoolManager.assignTeacherToStudent(teacherId, studentId);

  if (success) {
    displayRelationships();
    event.target.reset();
    alert("Teacher assigned to student successfully!");
  } else {
    alert("Error: Could not assign teacher to student.");
  }
}

function handleAssignSupervisor(event) {
  event.preventDefault();

  const teacherId = document.getElementById("selectTeacherForSupervisor").value;
  const supervisorId = document.getElementById("selectSupervisor").value;

  if (!teacherId || !supervisorId) {
    alert("Please select both teacher and supervisor!");
    return;
  }

  const success = schoolManager.assignSupervisorToTeacher(supervisorId, teacherId);

  if (success) {
    displayRelationships();
    event.target.reset();
    alert("Supervisor assigned to teacher successfully!");
  } else {
    alert("Error: Could not assign supervisor to teacher.");
  }
}

function displayRelationships() {
  const teacherStudentDiv = document.getElementById("teacherStudentRelationships");
  if (teacherStudentDiv) {
    teacherStudentDiv.innerHTML = "";

    if (schoolManager.teachers.length === 0) {
      teacherStudentDiv.innerHTML = "<p>No teacher-student relationships yet.</p>";
    } else {
      schoolManager.teachers.forEach((teacher) => {
        const div = document.createElement("div");
        div.className = "relationship-item";

        const studentsList = teacher.students.length > 0
          ? teacher.students.map((s) => s.getName()).join(", ")
          : "No students assigned";

        div.innerHTML = `
          <strong>${teacher.getName()}</strong> teaches:
          <span>${studentsList}</span>
        `;

        teacherStudentDiv.appendChild(div);
      });
    }
  }

  const supervisorTeacherDiv = document.getElementById("supervisorTeacherRelationships");
  if (supervisorTeacherDiv) {
    supervisorTeacherDiv.innerHTML = "";

    if (schoolManager.supervisors.length === 0) {
      supervisorTeacherDiv.innerHTML = "<p>No supervisor-teacher relationships yet.</p>";
    } else {
      schoolManager.supervisors.forEach((supervisor) => {
        const div = document.createElement("div");
        div.className = "relationship-item";

        const teachersList = supervisor.teachers.length > 0
          ? supervisor.teachers.map((t) => t.getName()).join(", ")
          : "No teachers assigned";

        div.innerHTML = `
          <strong>${supervisor.getName()}</strong> supervises:
          <span>${teachersList}</span>
        `;

        supervisorTeacherDiv.appendChild(div);
      });
    }
  }
}
