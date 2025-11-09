class Janitor extends Employee {
  constructor(id, name, age, joinDate, monthlySalary) {
    super(id, name, age, joinDate, monthlySalary);
  }

  getRoleDescription() {
    return "Maintains cleanliness and facility upkeep";
  }
}
