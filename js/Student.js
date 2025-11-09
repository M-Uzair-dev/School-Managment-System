class Student extends Person {
  #monthlyFee;
  #assignedTeacher;

  constructor(id, name, age, joinDate, monthlyFee) {
    super(id, name, age, joinDate);

    this.#monthlyFee = monthlyFee;
    this.#assignedTeacher = null;
  }

  getMonthlyFee() {
    return this.#monthlyFee;
  }

  getAssignedTeacher() {
    return this.#assignedTeacher;
  }

  assignTeacher(teacher) {
    this.#assignedTeacher = teacher;
  }

  calculateTotalFees() {
    const months = this.getMonthsPassed();

    const totalFees = this.#monthlyFee * months;

    return totalFees;
  }

  getDetails() {
    const teacherName = this.#assignedTeacher
      ? this.#assignedTeacher.getName()
      : "Not Assigned";

    return (
      `Student ID: ${this.getId()}, Name: ${this.getName()}, ` +
      `Age: ${this.getAge()}, Monthly Fee: $${this.#monthlyFee}, ` +
      `Teacher: ${teacherName}`
    );
  }
}
