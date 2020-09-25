//Interfaces

abstract class Company {
    static fiscalYear = 2020
    static createEmployee(name: string) {
        return { name }
    }
}

class Department extends Company {
    // private readonly id: string
    protected employees: string[] =[] //only accessed from function

    constructor(private readonly id: string, public name: string, public description: string) {
       super() // this.id = id;
    // this.name = n;
    }

    describe(this:Department) {
        console.log(`Department (${this.id}): ${this.name}`)
    }

    addEmployee(employee: string) {
        this.employees.push(employee)
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
      }
}

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
      super(id, 'IT', 'computer specialists');
      this.admins = admins;
    }
  }

  const it = new ITDepartment('d1', ['Max']);
  it.addEmployee('Andrew Mac')
  console.log(it)

  class AccountingDepartment extends Department {
    private lastReport: string;

    get mostRecentReport() {
        if(this.lastReport) {
            return this.lastReport;
        }
        throw new Error('no report found')
    }

    set mostRecentReport(value: string) {
        if(!value) {
            throw new Error('You need a valid value')
        }
        this.addReport(value);
    }

    constructor( id: string, private reports: string[]) {
          super(id, 'Accounting', 'money in and money out')
          this.lastReport = reports[0];
      }
  
      addEmployee(name: string) {
        if (name === 'Max') {
          return;
        }
        this.employees.push(name);
      }

      addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text
      }

      printReports() {
        console.log(this.reports);
      }
}

const accounting = new AccountingDepartment('a1', [])
accounting.addReport('expenses')
accounting.addReport('other stuff')
accounting.addEmployee('Steve')
accounting.addEmployee('Dougie')
accounting.printReports()
accounting.printEmployeeInformation()
console.log(accounting.mostRecentReport);

console.log(Company.createEmployee("New Guy"))
console.log(Company.fiscalYear)
