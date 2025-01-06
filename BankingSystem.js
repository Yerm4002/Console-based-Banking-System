const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const DATA_FILE = 'accountList.json';
const TRANSACTION_FILE = 'transactionList.json';

class Account {
  constructor(pin, id, name, balance = 0) {
    this.pin = pin;
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.transactions = [];
  }

  deposit(amount) {
    try {
      this.balance += amount;
      this.transactions.push({
        type: 'Deposit',
        amount: amount,
        description: `Deposited ${amount} KM`,
        date: new Date().toISOString(),
      });
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  withdraw(amount) {
    try {
      if (this.balance >= amount) {
        this.balance -= amount;
        this.transactions.push({
          type: 'Withdrawal',
          amount: amount,
          description: `Withdrew ${amount} KM`,
          date: new Date().toISOString(),
        });
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  transferFunds(anotherAccount, amount) {
    try {
      if (this.balance >= amount) {
        this.balance -= amount;
        anotherAccount.balance += amount;

        this.transactions.push({
          type: 'Transfer',
          amount: amount,
          description: `Transferred ${amount} KM to ${anotherAccount.name}`,
          date: new Date().toISOString(),
        });
        anotherAccount.transactions.push({
          type: 'Transfer',
          amount: amount,
          description: `Received ${amount} KM from ${this.name}`,
          date: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  viewTransactions() {
    try {
      console.log(`Transaction history for ${this.name}:`);
      this.transactions.forEach(transaction => {
        console.log(
          `${transaction.date}: ${transaction.type} - ${transaction.amount} KM - ${transaction.description}`
        );
      });
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  viewAccount() {
    try {
      console.log('');
      console.log('***********************');
      console.log('ID: ' + this.id);
      console.log('Name: ' + this.name);
      console.log('Balance: ' + this.balance);
      let sumOfIncome = this.transactions
        .filter(t => t.type === 'Deposit' || t.description.includes('Received'))
        .reduce((sum, t) => sum + t.amount, 0);
      let sumOfExpenses = this.transactions
        .filter(
          t => t.type === 'Withdrawal' || t.description.includes('Transferred')
        )
        .reduce((sum, t) => sum + t.amount, 0);
      console.log('************************');
      console.log('\n');
      console.log('Income vs Expenses graph \n');
      console.log('Income:   ');
      this.displayChart(sumOfIncome, 1000);
      console.log(` ${sumOfIncome} KM`);
      console.log('Expenses: ');
      this.displayChart(sumOfExpenses, 1000);
      console.log(` ${sumOfExpenses} KM`);
      console.log('\n');
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  displayChart(sum, max) {
    try {
      let barLength = (sum / max) * 50;
      for (let i = 0; i < barLength; i++) {
        process.stdout.write('█');
      }
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }
}

class BankingSystem {
  constructor() {
    this.accounts = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE);
        const parsedData = JSON.parse(data);
        return parsedData.map(acc => {
          const account = new Account(acc.pin, acc.id, acc.name, acc.balance);
          account.transactions = acc.transactions;
          return account;
        });
      }
      return [];
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  saveData() {
    try {
      const data = JSON.stringify(this.accounts, null, 2);
      fs.writeFileSync(DATA_FILE, data);
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  saveTransactionData(transaction) {
    try {
      const transactionData = JSON.stringify(transaction, null, 2);
      fs.appendFileSync(TRANSACTION_FILE, transactionData + '\n');
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  createAccount(name, pin) {
    try {
      const id = Math.floor(1000 + Math.random() * 9000);

      if (this.isIdTaken(id)) {
        this.createAccount(name, pin);
        return;
      }

      if (pin < 1000) {
        console.log(
          "PIN must be 4-digits and first digit of PIN can't be zero"
        );
        return;
      } else if (pin > 9999) {
        console.log("PIN can't have more than 4 digits");
        return;
      }

      const newAccount = new Account(pin, id, name);
      this.accounts.push(newAccount);
      this.saveData();
      console.log(`Account created for ${name}. ID: ${id}, PIN: ${pin}`);
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  isIdTaken(id) {
    try {
      return this.accounts.some(account => account.id === id);
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  findAccountById(id) {
    try {
      return this.accounts.find(account => account.id === id);
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  deposit(id, pin, amount) {
    try {
      const account = this.findAccountById(id);
      if (account && account.pin === pin) {
        account.deposit(amount);
        this.saveData();
        this.saveTransactionData({
          id: account.id,
          name: account.name,
          amount: amount,
          type: 'Deposit',
        });
        console.log(`Deposit successful. New balance: ${account.balance} KM`);
      } else {
        console.log('Invalid account or PIN.');
      }
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  withdraw(id, pin, amount) {
    try {
      const account = this.findAccountById(id);
      if (account && account.pin === pin) {
        if (account.withdraw(amount)) {
          this.saveData();
          this.saveTransactionData({
            id: account.id,
            name: account.name,
            amount: amount,
            type: 'Withdrawal',
          });
          console.log(
            `Withdrawal successful. New balance: ${account.balance} KM`
          );
        } else {
          console.log('Insufficient funds.');
        }
      } else {
        console.log('Invalid account or PIN.');
      }
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  transfer(fromId, fromPin, toId, amount) {
    try {
      const fromAccount = this.findAccountById(fromId);
      const toAccount = this.findAccountById(toId);
      if (fromAccount && fromAccount.pin === fromPin && toAccount) {
        if (fromAccount.balance >= amount) {
          fromAccount.transferFunds(toAccount, amount);
          this.saveData();
          this.saveTransactionData({
            id: fromAccount.id,
            name: fromAccount.name,
            amount: amount,
            type: 'Transfer',
          });
          console.log(
            `Transfer successful. New balance: ${fromAccount.balance} KM`
          );
        } else {
          console.log('Insufficient funds.');
        }
      } else {
        console.log('Invalid account details.');
      }
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  viewTransactions(id, pin) {
    try {
      const account = this.findAccountById(id);
      if (account && account.pin === pin) {
        account.viewTransactions();
      } else {
        console.log('Invalid account or PIN.');
      }
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }

  mainMenu() {
    try {
      console.log(
        `\nWelcome to the Banking System! Choose an option below:\n` +
          `1. Create an account\n` +
          `2. Deposit money\n` +
          `3. Withdraw money\n` +
          `4. Transfer funds\n` +
          `5. View transaction history\n` +
          `6. View account\n` +
          `7. Exit`
      );

      rl.question('Enter your choice: ', choice => {
        switch (choice) {
          case '1':
            rl.question('Enter your first name: ', firstName => {
              rl.question('Enter your surname: ', surname => {
                const name = firstName + ' ' + surname;
                rl.question('Enter a 4-digit PIN: ', pin => {
                  rl.question(
                    'Confirm account creation? (yes/no): ',
                    confirm => {
                      if (confirm.toLowerCase() === 'yes') {
                        this.createAccount(name, parseInt(pin));
                      } else {
                        console.log('Account creation cancelled.');
                      }
                      this.mainMenu();
                    }
                  );
                });
              });
            });
            break;
          case '2':
            rl.question('Enter your account ID: ', id => {
              let attempts = 0;
              const askPin = () => {
                rl.question('Enter your PIN: ', pin => {
                  if (attempts >= 3) {
                    console.log('Too many failed attempts. Returning to menu.');
                    this.mainMenu();
                    return;
                  }
                  const account = this.findAccountById(parseInt(id));
                  if (account && account.pin === parseInt(pin)) {
                    rl.question('Enter the amount to deposit: ', amount => {
                      rl.question('Confirm deposit? (yes/no): ', confirm => {
                        if (confirm.toLowerCase() === 'yes') {
                          this.deposit(
                            parseInt(id),
                            parseInt(pin),
                            parseFloat(amount)
                          );
                        } else {
                          console.log('Deposit cancelled.');
                        }
                        this.mainMenu();
                      });
                    });
                  } else {
                    attempts++;
                    console.log('Invalid PIN. You have ' + (4 - attempts) + ' attempts left.');
                    askPin();
                  }
                });
              };
              askPin();
            });
            break;
          case '3':
            rl.question('Enter your account ID: ', id => {
              let attempts = 0;
              const askPin = () => {
                rl.question('Enter your PIN: ', pin => {
                  if (attempts >= 3) {
                    console.log('Too many failed attempts. Returning to menu.');
                    this.mainMenu();
                    return;
                  }
                  const account = this.findAccountById(parseInt(id));
                  if (account && account.pin === parseInt(pin)) {
                    rl.question('Enter the amount to withdraw: ', amount => {
                      rl.question('Confirm withdrawal? (yes/no): ', confirm => {
                        if (confirm.toLowerCase() === 'yes') {
                          this.withdraw(
                            parseInt(id),
                            parseInt(pin),
                            parseFloat(amount)
                          );
                        } else {
                          console.log('Withdrawal cancelled.');
                        }
                        this.mainMenu();
                      });
                    });
                  } else {
                    attempts++;
                    console.log('Invalid PIN. You have ' + (4 - attempts) + ' attempts left.');
                    askPin();
                  }
                });
              };
              askPin();
            });
            break;
          case '4':
            rl.question('Enter your account ID: ', fromId => {
              let attempts = 0;
              const askPin = () => {
                rl.question('Enter your PIN: ', fromPin => {
                  if (attempts >= 3) {
                    console.log('Too many failed attempts. Returning to menu.');
                    this.mainMenu();
                    return;
                  }
                  const fromAccount = this.findAccountById(fromId);
                  if (fromAccount && fromAccount.pin === fromPin) {
                    rl.question('Enter the recipient account ID: ', toId => {
                      rl.question('Enter the amount to transfer: ', amount => {
                        rl.question('Confirm transfer? (yes/no): ', confirm => {
                          if (confirm.toLowerCase() === 'yes') {
                            this.transfer(
                              parseInt(fromId),
                              parseInt(fromPin),
                              parseInt(toId),
                              parseFloat(amount)
                            );
                          } else {
                            console.log('Transfer cancelled.');
                          }
                          this.mainMenu();
                        });
                      });
                    });
                  } else {
                    attempts++;
                    console.log('Invalid PIN. You have ' + (4 - attempts) + ' attempts left.');
                    askPin();
                  }
                });
              };
              askPin();
            });
            break;
          case '5':
            rl.question('Enter your account ID: ', id => {
              let attempts = 0;
              const askPin = () => {
                rl.question('Enter your PIN: ', pin => {
                  if (attempts >= 3) {
                    console.log('Too many failed attempts. Returning to menu.');
                    this.mainMenu();
                    return;
                  }
                  const account = this.findAccountById(parseInt(id));
                  if (account && account.pin === parseInt(pin)) {
                    account.viewTransactions();
                    this.mainMenu();
                  } else {
                    attempts++;
                    console.log('Invalid PIN. You have ' + (4 - attempts) + ' attempts left.');
                    askPin();
                  }
                });
              };
              askPin();
            });
            break;
          case '6':
            rl.question('Enter your account ID: ', id => {
              let attempts = 0;
              const askPin = () => {
                rl.question('Enter your PIN: ', pin => {
                  if (attempts >= 3) {
                    console.log('Too many failed attempts. Returning to menu.');
                    this.mainMenu();
                    return;
                  }
                  const account = this.findAccountById(parseInt(id));
                  if (account && account.pin === parseInt(pin)) {
                    account.viewAccount();
                    this.mainMenu();
                  } else {
                    attempts++;
                    console.log('Invalid PIN. You have ' + (4 - attempts) + ' attempts left.');
                    askPin();
                  }
                });
              };
              askPin();
            });
            break;
          case '7':
            console.log('Exiting the banking system. Goodbye!');
            rl.close();
            break;
          default:
            console.log('Invalid choice. Please try again.');
            this.mainMenu();
        }
      });
    } catch (error) {
      console.log('Error occurred: ' + error.message);
    }
  }
}

const bank = new BankingSystem();
bank.mainMenu();
