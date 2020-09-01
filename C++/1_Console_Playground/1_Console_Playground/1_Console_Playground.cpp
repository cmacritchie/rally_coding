// 1_Console_Playground.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <string>
//#include <cmath>
using namespace std;

class MyFirstClass {
public:
    int myNum = 5;
    string myString = "my String";
    MyFirstClass(int thisNum, string thisString) {
        myNum = thisNum;
        myString = thisString;
    }

    string AboutMe() {
        return "This is my String: " + myString;
    }

    void unusedMethod();

};

void MyFirstClass::unusedMethod() {
    cout << "Unused Method";
}

int main()
{
   /* int x;
    cout << "put an integer and I'll double it: ";
    cin >> x;
    cout << "Your double number is: " << (x*2) << endl;
    string greeting = "hello Y'all";
    cout << greeting; 
    std::string fullName;
    std::cout << "What is your full name name?";
    getline (cin, fullName);
    std::cout << "your name is: " + fullName;
    */
    //cout << sqrt(64);
   /* string food = "Pizza";
    string* ptr = &food;   
    cout << food << "\n";
    cout << &food << "\n";  //address of food
    cout << ptr << "\n"; //variable with address of food
    
    */
    MyFirstClass myclass(69, "Hello World");
    cout << myclass.myNum << " " << myclass.myString;
    cout << myclass.AboutMe();
    myclass.unusedMethod();
   
    return 0; 
}







// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
