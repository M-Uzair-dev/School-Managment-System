class Employee extends Person {
  #monthlySalary;

  constructor(id, name, age, joinDate, monthlySalary) {
    super(id, name, age, joinDate);

    this.#monthlySalary = monthlySalary;
  }

  getMonthlySalary() {
    return this.#monthlySalary;
  }

  calculateSalary() {
    const monthsWorked = this.getMonthsPassed();

    const totalSalary = this.#monthlySalary * monthsWorked;

    return totalSalary;
  }

  getRoleDescription() {
    return "General employee role";
  }

  getDetails() {
    return (
      `Employee ID: ${this.getId()}, Name: ${this.getName()}, ` +
      `Age: ${this.getAge()}, Monthly Salary: $${this.#monthlySalary}, ` +
      `Role: ${this.getRoleDescription()}`
    );
  }
}
