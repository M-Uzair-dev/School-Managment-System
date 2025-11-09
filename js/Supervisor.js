class Supervisor extends Employee {
  constructor(id, name, age, joinDate, monthlySalary) {
    super(id, name, age, joinDate, monthlySalary);

    this.teachers = [];
  }

  assignTeacher(teacher) {
    this.teachers.push(teacher);
  }

  removeTeacher(teacherId) {
    this.teachers = this.teachers.filter(
      (teacher) => teacher.getId() !== teacherId
    );
  }

  getRoleDescription() {
    return `Supervises ${this.teachers.length} teachers.`;
  }

  getTeacherCount() {
    return this.teachers.length;
  }
}
