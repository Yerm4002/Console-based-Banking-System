# Console-Based Banking System

## Description
The **Console-Based Banking System** is a command-line application designed to help users manage their finances. It allows them to create accounts, deposit and withdraw money, transfer funds, and view their transaction history. This project simulates core banking functions in a simplified manner, and is implemented in three programming languages: **C#**, **Python**, and **JavaScript**. It serves as an excellent introduction to programming concepts such as **syntax**, **object-oriented programming (OOP)**, and **data storage management**.

## Project Goals
The primary goal of this project is to familiarize developers with basic programming concepts by creating a simplified banking system. The focus is on:
- Basic programming syntax
- Object-oriented programming (OOP) principles
- Data management using simple file storage (JSON)

## Technologies Used
- **C#** with **.NET Core** (IDE: Microsoft Visual Studio)
- **Python** (IDE: PyCharm)
- **JavaScript** with **Node.js** (IDE: Visual Studio Code)

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
4. **Run the application** using the IDE or terminal:
   - For C#: `dotnet run`
   - For Python: `python (name_of_the_project).py`
   - For JavaScript: `node (name_of_the_project).js`

## Features

- **Create a Bank Account**: Allow users to set up a new bank account by entering their details and generating a personal PIN.
- **Deposit Money**: Users can deposit funds into their account by providing their account ID, PIN, and the deposit amount.
- **Withdraw Money**: Allows users to withdraw funds, with validation for sufficient balance.
- **Transfer Funds**: Transfer funds between accounts, ensuring the correct ID, PIN, and amount are provided.
- **View Transaction History**: View a list of past transactions stored in the JSON file.
- **View Account Information**: Users can check their account details such as balance, ID, and a graphical representation of income vs. expenses (displayed as a bar chart).

## Usage
When the application starts, users are prompted to select an option by entering the corresponding number:

1. **Create an Account**: Enter your name and generate a unique PIN.
2. **Deposit Money**: Provide your account ID, PIN, and the amount to deposit.
3. **Withdraw Money**: Provide your account ID, PIN, and the amount to withdraw.
4. **Transfer Funds**: Specify your account ID, PIN, transfer amount, and the recipient’s account ID.
5. **View Transaction History**: Enter your account ID and PIN to view your transaction history.
6. **View Account Settings**: Check your account details, including balance and a graphical report.

## Configuration
All data is stored in two **JSON files** for simplicity:
- One file for account data
- One file for transaction records
These files are read and written to by the application during runtime.

## Error Handling
The application includes basic error-handling mechanisms:
- **Invalid Option**: If a user selects a non-existent option, the system will prompt them to enter a valid choice.
- **Invalid Account ID**: Users will have 3 chances to enter the correct account ID; otherwise, they will be asked to try again.
- **Insufficient Funds**: The system will prevent transactions that exceed the available balance and alert the user accordingly.
