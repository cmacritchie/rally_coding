//functions
function add(n1: number, n2: number, n3) {
    return n1 + n2 + n3
}

let number2: number
number2 = 7
//number2 = 'hi' //will throw error
console.log(add(3, number2, 6))

enum Role { admin = 'Administrator', qa = 'Quality Assurance', dev = "Software Developer" }

//Object type and Assign
const person: {
    name:string,
    occupation: string,
    age: number
    testTuple: [number, string ] //Tuple
} = {
    name:'Craig',
    occupation: Role.dev,
    age: 30,
    testTuple: [7, 'James Bond']
}

console.log(person)

let favouriteActivites: string[];
favouriteActivites = ["hellow"]
favouriteActivites.push('hockey', 'snowboarding');
let otherActivities = <string []> []
otherActivities.push('eating', 'excercising');
let toDoList: string[] =[];
toDoList.push('stretch', 'groceries');


console.log(favouriteActivites);
console.log(otherActivities)
console.log(toDoList);

const maxWell = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking']
  };

  for (const hobby of maxWell.hobbies){
      console.log(hobby.toUpperCase())
  }

  //Union 

  function union(input1: number | string, input2: number | string, resultConversion: typePreference) {
      let result
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;  // the + in front parses to a number
      } else {
        result = input1.toString() + " and "  +input2.toString() + " are teaming up one last time";
      }
      return result;
    } 

    enum typePreference { asNumber = "as-number", asText = 'as-Text', }
    enum checker { checker1, checker2, checker3 }

    console.log(union(7, 8, typePreference.asNumber))
    console.log(union('batman', "robin", typePreference.asText ))


//type Aliases

type CombineAble = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function union2(input1: CombineAble, input2: CombineAble, resultConversion: ConversionDescriptor) {
    let result
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;  // the + in front parses to a number
      } else {
        result = input1.toString() + " and "  +input2.toString() + " are teaming up one last time";
      }
      return result;
    } 

    console.log(union2(4, 6, 'as-text'))

    //function types
    function printResult (n1: number): void {
        console.log("result ", n1)
    }

    function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
        const result = n1 + n2;
        cb(result);
    }

   addAndHandle(2, 4, (result) => {
        console.log(result)
    })

    let userInput: unknown;
    let userName: string;
    
    userInput = 5;
    userInput = 'Max';
    if (typeof userInput === 'string') {
      userName = userInput;
    }
    
    //never keyword
    function generateError(message: string, code: number): never {
      throw { message: message, errorCode: code };
      // while (true) {}
    }
    
    console.log("updated")
    generateError('An error occurred!', 500);
