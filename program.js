/*
Make sure that you have installed module readline-sync
Type this into your terminal:
npm install readline-sync

*/
const fs = require("fs");
const readlineSync = require("readline-sync");
//Represents bank account
class Account {
    static balance = 0;
  constructor(Pin, Id) {
    this.pin = Pin;
    this.id = Id;
    this.transactions = []; 
  }
  
  //Method for money deposit
  deposit(amount) {
    try{
        
    Account.balance += amount;
    this.transactions.push({
        type: 'Deposit',
        amount: amount,
        description: `Deposited ${amount} KM`,
        date: new Date().toISOString()
    }); 
} catch (error){
    console.log(error.message);
}
  }
// Method for money withdrawal
  withdraw(amount) {
    if (Account.balance >= amount) {
      Account.balance -= amount;
     
      this.transactions.push({
        type: 'Withdrawal',
        amount: amount,
        description: `Withdrew ${amount} KM`,
        date: new Date().toISOString()
    }); 
      return true;
    }
    return false;
  }
  //Method for money tranfer
      transferFunds(anotherAccount, amount) {
        if (Account.balance >= amount) {
            Account.balance -= amount;
            anotherAccount.balance += amount;

            this.transactions.push({
                type: 'Transfer',
                amount: amount,
                description: `Transferred ${amount} KM to ${anotherAccount.name}`,
                date: new Date().toISOString()
            }); 
            anotherAccount.transactions.push({
                type: 'Transfer',
                amount: amount,
                description: `Received ${amount} KM from ${this.name}`,
                date: new Date().toISOString()
            }); 
        }
    }
 
  //Method to view transactions
  viewTransactions() {
    console.log(`Transaction history for ${this.name}:`);
    this.transactions.forEach((transaction) => {
      console.log(
        `${transaction.date}: ${transaction.type} - ${transaction.amount} KM - ${transaction.description}`
      );
    });
  }
//Method to view account 
  viewAccount(account) {
  try{

    console.log("");
    console.log("***********************");
    console.log("ID: " + account.id);
    console.log("Name: " + account.name);
    console.log("Balance: " + Account.balance);
    let sumOfIncome = this.transactions
      .filter((t) => t.type === "Deposit" || t.description.includes("Received"))
      .reduce((sum, t) => sum + t.amount, 0);
    let sumOfExpenses = this.transactions
      .filter(
        (t) => t.type === "Withdrawal" || t.description.includes("Transferred")
      )
      .reduce((sum, t) => sum + t.amount, 0);
      let max = Math.max(sumOfExpenses, sumOfIncome);
      console.log("************************");
    console.log("\n");
    console.log("Income vs Expenses graph \n");
    console.log("Income:   ");
    this.displayChart(sumOfIncome, max);
    console.log(` ${sumOfIncome} KM`);
    console.log("Expenses: ");
    this.displayChart(sumOfExpenses, max);
    console.log(` ${sumOfExpenses} KM`);
    console.log("\n");}
    catch(error){
        console.log(error.message);
    }
  }
  //Method for displaying the graph (income vs expenses)
  displayChart(sum, _max) {
  
    let barLength = ((sum / _max) * 50);  //adjusting the scale
    for (let i = 0; i < barLength; i++)
    {
        console.log("█");
    }
  }
}

class Transaction {
  constructor(id, type, amount, description) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.date = new Date().toLocaleString();
    this.description = description;
  }
}

class BankingSystem {
  static allAccounts = [];
  static file = "someFile.json";
 
  static count;
  static transactionFile = "transactions.json";


static async saveTransactionsToJson() {
    try {
        const transactions = BankingSystem.allAccounts.flatMap(
            (account) => account.transactions
        );

        if (!fs.existsSync(BankingSystem.transactionFile)) {
            console.log("Creating transactions.json because it doesn't exist.");
            await fs.promises.writeFile(BankingSystem.transactionFile, JSON.stringify([]));
        }

        const jsonString = JSON.stringify(transactions, null, 2);
        await fs.promises.writeFile(BankingSystem.transactionFile, jsonString);
        console.log("Transactions saved successfully.");
    } catch (error) {
        console.log(`Error saving transactions to JSON: ${error.message}`);
    }
}

  

  static async loadTransactionsFromJson() {
    if (fs.existsSync(BankingSystem.transactionFile)) {
      try {
        const jsonString = await fs.promises.readFile(
          BankingSystem.transactionFile,
          "utf-8"
        );
        if (jsonString.trim()) {
          const transactions = JSON.parse(jsonString) || [];

    
          for (const account of BankingSystem.allAccounts) {
            account.transactions = transactions.filter(
              (t) => t.id === account.id
            );
          }
        }
      } catch (error) {
        console.log(
          "Error reading the transactions JSON file. The file might be corrupted."
        );
      }
    }
  }
  //In constructor, program loads the data from someFile.json to the allAccounts List, same for transactions
  constructor() {
    const file = "someFile.json";

    if 
    (fs.existsSync(file)) {
      try {
        const jsonString = fs.readFileSync(file, "utf8");
        if (jsonString.trim()) {
          BankingSystem.allAccounts = JSON.parse(jsonString);
        } else {
          BankingSystem.allAccounts = [];
        }
        BankingSystem.count = BankingSystem.allAccounts.length;
      } catch (error) {
        console.log(
          "Error reading the JSON file. The file might be corrupted."
        );
        BankingSystem.allAccounts = [];
      }
    }
  }
  getAccountByPin(id) {
    let account;
    let chanceCount = 4;
    try{
    while (chanceCount > 0) {
      const pin = parseInt(readlineSync.question("To confirm it's you, enter your account pin: "), 10);
      account = new Account(BankingSystem.allAccounts.find(a => a.id === id && a.pin === pin));
  
      if(account === undefined) {
        console.log("Incorrect PIN, try again.");
        chanceCount--;
        if (chanceCount === 0) {
          console.log("You have exceeded the number of attempts.");
          this.menu();
        }
        console.log(`${chanceCount} more attempts left.`);
      }
      else{
        return account;
      }
    }}
    catch(error){
        console.log("Invalid input try again");
    }
    return null;
  }
  
  getAccountById() {
    let account;
    let chanceCount = 4;
    while (true) {
      try {
        const id = parseInt( readlineSync.question("Enter the ID: "), 10);
        account = new Account(BankingSystem.allAccounts.find((a) => a.id === id));

        if (account ===  undefined) {
          console.log("Account not found, try again\n");
          chanceCount--;

          console.log(
            `${chanceCount} more chances left, try again`
          );
          if(chanceCount===1){
            console.log("One last chance!");
          }
         else if (chanceCount === 0) {
          chanceCount = 4;
            console.log("Going back to menu....");
            this.menu();
          }

          continue;
        }
        return this.getAccountByPin(account.id);
      } catch (e) {
        console.log("Invalid input, try again");
      }
    }
   
    
            
  } 

  static async loadAccountsFromJson() {
    if (fs.existsSync(BankingSystem.file)) {
      try {
        const jsonString = await fs.promises.readFile(
          BankingSystem.file,
          "utf-8"
        );
        if (jsonString.trim()) {
          BankingSystem.allAccounts = JSON.parse(jsonString);
        } else {
          BankingSystem.allAccounts = [];
        }
        BankingSystem.count = BankingSystem.allAccounts.length;
      } catch (error) {
        console.log(
          "Error reading the JSON file. The file might be corrupted."
        );
        BankingSystem.allAccounts = [];
      }
    }

    BankingSystem.loadTransactionsFromJson();
  }

  loadAccounts() {
    if (fs.existsSync(BankingSystem.file)) {
      try {
        const jsonString = fs.readFileSync(BankingSystem.file, "utf8");
        if (jsonString.trim()) {
          BankingSystem.allAccounts = JSON.parse(jsonString);
        }
        BankingSystem.count = BankingSystem.allAccounts.length;
      } catch (error) {
        console.log(
          "Error reading the JSON file. The file might be corrupted."
        );
        BankingSystem.allAccounts = [];
      }
    }
  }
 

  doesTheAccountRepeat(id, name) {
    return BankingSystem.allAccounts.some(
      (account) => account.id === id && account.name === name
    );
  }
//First time creating an account
  createAccount() {
    let firstName, surname, name, pin, answer, confirmation, id;
  
    while (true) {
      firstName = readlineSync.question(`Please enter your name: `);
      surname = readlineSync.question(`Please enter your surname: `);
  
      if (/\d/.test(firstName) || /\d/.test(surname)) {
        console.log(
          "Oops! It looks like you made a typo, please enter your full name again.\n"
        );
        continue;
      } 
      else break;
    }
    console.log("Confirm your personal data (y/n)? "); 
    answer = readlineSync.question("");
    
    while (answer !== "y" && answer !== "n" && answer !== "Y" && answer !== "N") {
        console.log("Invalid input, try again!");
        console.log("Confirm your personal data (y/n)? "); 
        answer = readlineSync.question("");
    }
    
    if (answer === "n" || answer === "N") {
        console.log("\n");
        this.createAccount();
    }
  
    name = firstName + " " + surname;
  
 while(true){
        pin = parseInt(readlineSync.question(`Enter your 4-digit PIN: `));
        if (pin < 1000 || pin > 9999) {
          console.log("Invalid PIN, please enter a 4-digit PIN.");
          continue; }
        confirmation = readlineSync.question(`Confirm this PIN (y/n): `);
        if (confirmation === "n") {
          console.log("PIN not confirmed, let's try again.");
          continue; 
        } else if (confirmation === "y") {
          break;} 
       else {
        console.log("Invalid input, please enter 'y' or 'n'.");
        break; 
      }
 }
    id = Math.floor(Math.random() * (10000000 - 1000000)) + 1000000;
  
    while (this.doesTheAccountRepeat(id)) {
      id = Math.floor(Math.random() * (10000000 - 1000000)) + 1000000;
    }
    console.log(`Your ID: ${id}`);
    console.log(`Your PIN: ${pin}`);
    console.log("You will use these for logging into your account.");
  
    let account = new Account(pin, id, name);
    BankingSystem.allAccounts.push(account);
  
    this.saveHistoryToJson(); 
  
    console.log("You have officially created your bank account!");
  }
 
  doesThePinRepeat(pin) {
    return BankingSystem.allAccounts.some(account => account.pin === pin);
  }
  
  saveHistoryToJson() {
    try {
      const jsonString = JSON.stringify(BankingSystem.allAccounts, 2);
      fs.writeFileSync(BankingSystem.file, jsonString);
    } catch (error) {
      console.log(`Error saving to JSON: ${error.message}`);
    }
  }
  


  depositMoney() {
    try{
    const account = this.getAccountById();
    if (account) {
        let amount;
        while (true) {
            amount = parseFloat(readlineSync.question(`Enter the amount to deposit: `));
            if (amount >= 0) break;
            else console.log("Amount must be positive, enter the amount again.");
        }
        let answer = readlineSync.question("Confirm the deposit? (y/n): ");
        if (answer.toLowerCase() === "y") {
            account.deposit(amount);
            console.log("Transaction added:", account.transactions[account.transactions.length-1]);
            this.saveHistoryToJson();
            BankingSystem.saveTransactionsToJson();
            console.log(`Deposit successful. New balance: ${Account.balance}`);
        } else {
            console.log("Going back to menu...");
        }
    }
}catch(error){
    console.log(error.message);
}
}

  
withdrawMoney() {
    const account = this.getAccountById();
    if (account) {
        let amount;
        while (true) {
            amount = parseFloat(readlineSync.question(`Enter the amount to withdraw: `));
            if (amount > 0) break;
            else console.log("Amount must be positive, enter the amount again.");
        }
        let answer = readlineSync.question("Confirm the withdrawal? (y/n)");
        if (answer.toLowerCase() === "y") {
            if (account.withdraw(amount)) {
                this.saveHistoryToJson();
                BankingSystem.saveTransactionsToJson();
                console.log(`Withdrawal successful. New balance: ${Account.balance}`);
            } else {
                console.log("Insufficient funds.");
            }
        } else {
            console.log("Going back to menu...");
        }
    }
}

        transferMoney() {
            try {
                let account = this.getAccountById();
                if (!account) {
                    console.log(`Account not found, try again.`);
                    return; // Exit the function if account is not found
                }
        
                let amount = parseFloat(readlineSync.question(`Enter the amount: `));
                while (amount <= 0) {
                    console.log(`Amount must be positive, try again.`);
                    amount = parseFloat(readlineSync.question(`Enter the amount: `));
                }
        
                if (!account.withdraw(amount)) {
                    console.log(`Insufficient funds, try again.`);
                    return; // Exit if withdrawal fails
                }
        
                let id1 = parseInt(readlineSync.question(`Enter ID of the account you are transferring money to: `));
                let account2 = BankingSystem.allAccounts.find((a) => a.id === id1);
                if (!account2) {
                    console.log("Account not found, try again.");
                    return; // Exit if account2 is not found
                }
        
                account.transferFunds(account2, amount);
                this.saveHistoryToJson();
                console.log(`Transfer successful. New balance: ${Account.balance}`);
            } catch (error) {
                console.log(`Invalid input. Please enter a valid amount`);
            }}
  viewTransactionsHistory() {
    try {
      let account = this.getAccountById();
      while (!account) {
        console.log(`Account not found, try again.`);
        id = parseInt(readlineSync.question(`Enter your account ID: `));
      }
      account.viewTransactions();
    } catch (error) {
      console.log(`Invalid input. Please enter a valid ID.`);
    }
  }
  viewBankAccount() {
    let account = this.getAccountById();
      account.viewAccount(account);
    
  }

 menu() {
    while (true) {
      try {
        let option =
          readlineSync.question(
            "Welcome to the Banking system! Choose an option below:\n" +
              "1. Create an account\n" +
              "2. Deposit money\n" +
              "3. Withdraw money\n" +
              "4. Transfer funds\n" +
              "5. View Transaction History\n" +
              "6. View Bank account\n" +
              "7. Exit\n"
          );
          option = parseInt(option);
          if (isNaN(option)) {
            throw new Error("Invalid input. Please enter a number!");
          }
        switch (option) {
          case 1:
            this.createAccount();
            break;
          case 2:
            this.depositMoney();
            break;
          case 3:
            this.withdrawMoney();
            break;transf
          case 4:
            this.transferMoney();
            break;
          case 5:
            this.viewTransactionsHistory();
            break;
          case 6:
            this.viewBankAccount();
            break;
          case 7:
            console.log(`Exiting the banking system. Goodbye!`);
            process.exit();
            break;
          default:
            console.log(
              `Invalid option. Please choose number between 1 and 7.`
            );
            break;
        }
      } catch (error) {
        console.log(`Invalid input. Please enter a number.`);
      }
    }
  }

  doesTheAccountRepeat(id) {
    return BankingSystem.allAccounts.some((account) => account.id === id);
  }
}

let bank = new BankingSystem();
bank.menu();
