class SecurityGuard extends Employee {
  constructor(id, name, age, joinDate, monthlySalary) {
    super(id, name, age, joinDate, monthlySalary);
  }

  getRoleDescription() {
    return "Ensures campus safety and security";
  }
}
