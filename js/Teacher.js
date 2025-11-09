class Teacher extends Employee {
  students;
  supervisor;
  constructor(id, name, age, joinDate, monthlySalary) {
    super(id, name, age, joinDate, monthlySalary);
    this.students = [];
    this.supervisor = null;
  }
  assignStudent(student) {
    this.students.push(student);
  }
  removeStudent(studentId) {
    this.students = this.students.filter(
      (student) => student.getId() !== studentId
    );
  }
  setSupervisor(supervisor) {
    this.supervisor = supervisor;
  }
  getRoleDescription() {
    return `Responsible for teaching ${this.students.length} students.`;
  }
  getStudentCount() {
    return this.students.length;
  }
}
