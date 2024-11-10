# Console-based Banking System

## Description
The Console-based Banking System is a command-line application that allows users to create accounts, deposit and withdraw money, transfer funds, and view their transaction history to manage their finances. It is built as a simplified simulation of core banking functions, implemented in **C#**, **Python**, and **JavaScript**. This project is a great starting point for those looking to learn fundamental programming concepts, including syntax, object-oriented programming (OOP), and an introduction to database management.

## Project Goals
The goal of this project is to learn the fundamentals of programming by developing a simple simulation of a banking system. The project focuses on understanding basic programming syntax, OOP concepts, and working with data storage in three different languages.

## Technologies Used
- **C#** with **.NET Core** (IDE: Microsoft Visual Studio)
- **Python**  (IDE: PyCharm)
- **JavaScript** with **Node.js** (IDE: VS Code)


## Installation
1. **Download the project files** from GitHub.
2. **Ensure you have the correct IDE** for the programming language:
   - For C#, use **Microsoft Visual Studio**.
   - For Python, use **PyCharm**.
   - For JavaScript, use **VS Code** with Node.js.
3. **Install the required software**:
   - **C#**: Install the **.NET SDK**.
   - **Python**: Install **Python 3.x**.
   - **JavaScript**: Install **Node.js**.
4. **Run the application** 
   - using the IDE or the terminal:
   - If you use the terminal 
      - Specify the directory of the script you stored in your device then enter the following:
         - For C#: `dotnet run`
         - For Python: `python <BankingSystem>.py`
         - For JavaScript: `node <BankingSystem>.js`

## Features
- **Create a Bank Account**
- **Deposit Money**
- **Withdraw Money**
- **Transfer Funds**
- **View Transaction History**

## Usage
The application will prompt the user to choose one of the following options by entering the corresponding number:
1. **Create an Account**: Enter the name and ID for the new account.
2. **Deposit Money**: Enter the account ID and the amount to deposit.
3. **Withdraw Money**: Enter the account ID and the amount to withdraw.
4. **Transfer Funds**: Enter the account ID, the amount to transfer, and the target account ID.
5. **View Transaction History**: Enter the account ID to view a list of transactions from the JSON file.


## Configuration
All data, including user names, IDs, and transactions, are stored in a single **JSON file** for simplicity and easy management. This file is read and written by the application during the runtime.

## Error Handling
Application involves simple error-handling mechanisms. Examples of error handling include:
- **Invalid Choice Number**: If user chose non-existent option (e.g. User enters 6 when there are 5 options) application will prompt the user to enter the right input
- **Invalid ID**: If user enters wrong account ID, the application will display an error message and prompt the user to enter a valid account ID. User will have 3 chances to enter the right ID.
- **Insufficient Balance**: If a user tries to withdraw or transfer more funds than are available, the system will alert the user and block the transaction.


