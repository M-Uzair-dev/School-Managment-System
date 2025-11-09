class SchoolManager {
  students;
  employees;
  teachers;
  supervisors;
  idCounter;
  constructor() {
    this.students = [];
    this.employees = [];
    this.teachers = [];
    this.supervisors = [];

    this.idCounter = 1;
  }

  generateId(type) {
    const id = type + String(this.idCounter).padStart(3, "0");
    this.idCounter++;
    return id;
  }

  addStudent(student) {
    this.students.push(student);
  }

  addEmployee(employee) {
    this.employees.push(employee);
    if (employee instanceof Teacher) {
      this.teachers.push(employee);
    } else if (employee instanceof Supervisor) {
      this.supervisors.push(employee);
    }
  }

  findStudentById(studentId) {
    return this.students.find((student) => student.getId() === studentId);
  }

  findEmployeeById(employeeId) {
    return this.employees.find((employee) => employee.getId() === employeeId);
  }

  findTeacherById(teacherId) {
    return this.teachers.find((teacher) => teacher.getId() === teacherId);
  }

  findSupervisorById(supervisorId) {
    return this.supervisors.find(
      (supervisor) => supervisor.getId() === supervisorId
    );
  }

  assignTeacherToStudent(teacherId, studentId) {
    const teacher = this.findTeacherById(teacherId);
    const student = this.findStudentById(studentId);

    if (!teacher || !student) {
      return false;
    }

    student.assignTeacher(teacher);
    teacher.assignStudent(student);

    return true;
  }

  assignSupervisorToTeacher(supervisorId, teacherId) {
    const supervisor = this.findSupervisorById(supervisorId);
    const teacher = this.findTeacherById(teacherId);

    if (!supervisor || !teacher) {
      return false;
    }

    teacher.setSupervisor(supervisor);
    supervisor.assignTeacher(teacher);

    return true;
  }

  removeEntityById(id) {
    const studentIndex = this.students.findIndex((s) => s.getId() == id);
    if (studentIndex !== -1) {
      const student = this.students[studentIndex];

      const teacher = student.getAssignedTeacher();
      if (teacher) {
        teacher.removeStudent(id);
      }

      this.students.splice(studentIndex, 1);
      return true;
    }

    const employeeIndex = this.employees.findIndex((e) => e.getId() === id);
    if (employeeIndex !== -1) {
      const employee = this.employees[employeeIndex];

      if (employee instanceof Teacher) {
        const teacherIndex = this.teachers.findIndex((t) => t.getId() === id);
        this.teachers.splice(teacherIndex, 1);

        if (employee.supervisor) {
          employee.supervisor.removeTeacher(id);
        }

        employee.students.forEach((student) => {
          student.assignTeacher(null);
        });
      }

      if (employee instanceof Supervisor) {
        const supervisorIndex = this.supervisors.findIndex(
          (s) => s.getId() === id
        );
        this.supervisors.splice(supervisorIndex, 1);

        employee.teachers.forEach((teacher) => {
          teacher.supervisor = null;
        });
      }

      this.employees.splice(employeeIndex, 1);
      return true;
    }

    return false;
  }

  calculateTotalRevenue() {
    let totalRevenue = 0;

    for (const student of this.students) {
      totalRevenue += student.calculateTotalFees();
    }

    return totalRevenue;
  }

  calculateTotalExpenses() {
    let totalExpenses = 0;

    for (const employee of this.employees) {
      totalExpenses += employee.calculateSalary();
    }

    return totalExpenses;
  }

  calculateProfit() {
    const revenue = this.calculateTotalRevenue();
    const expenses = this.calculateTotalExpenses();
    return revenue - expenses;
  }

  generateStats() {
    return {
      financial: {
        labels: ["Revenue", "Expenses", "Profit"],
        data: [
          this.calculateTotalRevenue(),
          this.calculateTotalExpenses(),
          this.calculateProfit(),
        ],
      },
      people: {
        labels: [
          "Students",
          "Teachers",
          "Supervisors",
          "Janitors",
          "Security Guards",
        ],
        data: [
          this.students.length,
          this.teachers.length,
          this.supervisors.length,
          this.employees.filter((e) => e instanceof Janitor).length,
          this.employees.filter((e) => e instanceof SecurityGuard).length,
        ],
      },
    };
  }

  clearAllData() {
    this.students = [];
    this.employees = [];
    this.teachers = [];
    this.supervisors = [];
    this.idCounter = 1;
  }
}
