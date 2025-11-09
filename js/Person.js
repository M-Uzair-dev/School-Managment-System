class Person {
  #id;
  #name;
  #age;
  #joinDate;

  constructor(id, name, age, joinDate) {
    // Store all parameters in private fields
    this.#id = id;
    this.#name = name;
    this.#age = age;
    this.#joinDate = joinDate;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getAge() {
    return this.#age;
  }

  getJoinDate() {
    return this.#joinDate;
  }

  getMonthsPassed() {
    const today = new Date();
    const joined = this.#joinDate;
    const yearsDiff = today.getFullYear() - joined.getFullYear();
    const monthsDiff = today.getMonth() - joined.getMonth();
    const totalMonths = yearsDiff * 12 + monthsDiff;
    return totalMonths > 0 ? totalMonths : 1;
  }

  getDetails() {
    return `ID: ${this.#id}, Name: ${this.#name}, Age: ${this.#age}`;
  }
}
