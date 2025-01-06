import json
import re
import random
from datetime import datetime
from operator import truediv

class BankAccount:
    def __init__(self,account_id,account_name,account_pin):
        self.accountId=account_id
        self.accountName=account_name
        self.accountBalance=0
        self.accountPin=account_pin
    def deposit(self,amount):
        amount=float(amount)
        if amount > 0:
           self.accountBalance += amount
    def withdraw(self,amount):
        amount=float(amount)
        if amount>0:
            self.accountBalance -= amount

class BankSystem:
    def __init__(self):
        self.accounts= []
        try:
            with open("accounts.json", "r") as f:
                data = json.load(f)
                for account in data:
                    bank_account = BankAccount(account['Account Id'],
                                               account['Account Name'],
                                               account['Account PIN'])
                    bank_account.accountBalance = account['account Balance']
                    self.accounts.append(bank_account)
        except (FileNotFoundError, json.JSONDecodeError):
            self.accounts = []
    #Main menu methods
    def createAccount(self):
        try:
            while True:
                name=self.nameCreation()
                id=self.generateId()
                pin=self.pinCreation()
                balance = 0
                if not self.checkNameExists(name):
                    p1 = BankAccount(id, name,pin)
                    self.accounts.append(p1)
                    self.saveAccToJson()
                    print("Account successfully created! ")
                    print(f"Your account ID is: {id}")
                    input("Press any key to continue...")
                    break
                else:
                    print(f"Account already exists uder the name of: {name}")
                    input("Press any key to continue...")
                    break
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            input("Press any key to continue...")
    def depositAcc(self ):
        someAccount=self.getValidID()
        someAccount= self.findAcc(someAccount)
        if not someAccount:
            print("Account not found")
            input("Press any key to continue...")
            return
        amount = float(self.getValidNum())
        if amount<=0:
            print("Invalid amount, please enter an amount higher than 0")
            return
        confirm = input(f"Are you sure you want to deposit {amount:.2f} KM to: {someAccount.accountId}? (Y/N)").strip()
        if confirm.lower() != "y":
            print("Deposit canceled.")
            input("Press any key to continue...")
            return
        pin=self.checkPin(someAccount.accountId)
        if pin:
            someAccount.deposit(amount)
            self.saveAccToJson()
            self.saveTransaction(someAccount.accountId, amount, "Deposit")
            print("Funds deposited successfully")
            print(f"Account balance: {someAccount.accountBalance} KM")
            input("Press any key to continue...")
        else:
            input("Press any key to continue...")
            return
    def withdrawAcc(self):
        someAccount=self.getValidID()
        someAccount= self.findAcc(someAccount)
        if not someAccount:
            print("Account not found")
            return
        amount=float(self.getValidNum())
        if amount<=0:
            print("Invalid amount, please enter an amount higher than 0")
            return
        if amount>someAccount.accountBalance:
            print("Insufficient funds in the account")
            input("Press any key to continue...")
            return
        confirm = input(f"Are you sure you want to withdraw {amount:.2f} KM from: {someAccount.accountId}? (Y/N): ").strip()
        if confirm.lower() != "y":
            print("Withdrawal canceled.")
            input("Press any key to continue...")
            return
        pin = self.checkPin(someAccount.accountId)
        if pin:
            someAccount.withdraw(amount)
            self.saveAccToJson()
            self.saveTransaction(someAccount.accountId, amount, "Withdrawal")
            print("Funds withdrawn successfully")
            print(f"Account balance: {someAccount.accountBalance} KM")
            input("Press any key to continue...")
        else:
            input("Press any key to continue...")
            return
    def transfer(self):
        someAccount=self.getValidID("Enter your ID number: ")
        someAccount =self.findAcc(someAccount)
        if not someAccount:
            print("Account not found")
            input("Press any key to continue...")
            return
        otherAccount=self.getValidID("Enter the recipients ID number: ")
        otherAccount = self.findAcc(otherAccount)
        if not otherAccount:
            print("Recepient's Account not found")
            input("Press any key to continue...")
            return
        if someAccount.accountId == otherAccount.accountId:
            print("Cannot transfer funds to the same account")
            input("Press any key to continue...")
            return
        amount = float(self.getValidNum())
        if amount<=0:
            print("Invalid amount, please enter an amount greater than 0")
            input("Press any key to continue...")
            return
        if amount>someAccount.accountBalance:
            print("Insufficient funds for this transaction")
            input("Press any key to continue...")
            return
        confirm = input(f"Are you sure you want to transfer {amount:.2f} KM to: {otherAccount.accountId}? (Y/N)").strip()
        if confirm.lower() != "y":
            print("Transfer canceled.")
            input("Press any key to continue...")
            return
        pin=self.checkPin(someAccount.accountId)
        if pin:
            someAccount.withdraw(amount)
            self.saveAccToJson()
            self.saveTransaction(someAccount.accountId, amount, "Transfer out")
            otherAccount.deposit(amount)
            self.saveAccToJson()
            self.saveTransaction(otherAccount.accountId, amount, "Transfer in")
            print("Transfer successful")
            input("Press any key to continue...")
        else:
            input("Press any key to continue...")
            return
    def showHistory(self):
        id = self.getValidID()
        id=int(id)
        try:
            with open("transactions.json", "r") as f:
                    transactions = json.load(f)
                    if transactions:
                        pin=self.checkPin(id)
                        if pin:
                            print("Transaction history: ")
                            accountFound = False
                            for transaction in transactions:
                                if transaction['Account ID'] == id:
                                    print(f"Transaction type: {transaction['Transaction type']},"
                                          f" Amount: {transaction['Amount']} KM, "f"Date & Time: {transaction['Timestamp']}")
                                    accountFound = True
                            if not accountFound:
                                print("No history for this account")
                                input("Press any key to continue...")
                        else:
                            input("Press any key to continue...")
                            return
                    else:
                        print("No transaction history has been found")
                    input("Press any key to continue...")
        except json.JSONDecodeError:
            print("No transactions done yet")
            input("Press any key to continue...")
        except FileNotFoundError:
            print("File not found")
            input("Press any key to continue...")
    def viewAccount(self):
        try:
            someAccount = self.getValidID("Enter the ID of the account: ")
            account = self.findAcc(int(someAccount))
            if not account:
                print("Account not found")
                input("Press any key to continue...")
                return
            pin=self.checkPin(someAccount)
            if pin:
                print("***********************")
                print(f"ID: {account.accountId}")
                print(f"Name: {account.accountName}")
                print(f"Balance: {account.accountBalance} KM")
                print("***********************")
                try:
                    with open("transactions.json", "r") as f:
                        transactions = json.load(f)
                except (FileNotFoundError, json.JSONDecodeError):
                    transactions = []
                sum_of_income = sum(
                    float(t["Amount"])
                    for t in transactions
                    if t["Account ID"] == int(someAccount)
                    and (t["Transaction type"] == "Deposit" or
                         t["Transaction type"] == "Transfer in")
                )
                sum_of_expenses = sum(
                    float(t["Amount"])
                    for t in transactions
                    if t["Account ID"] == int(someAccount)
                    and (t["Transaction type"] == "Withdrawal" or
                         t["Transaction type"] == "Transfer out")
                )
                print("Ledger graph: ")
                print("Income:   ", end="")
                self.displayChart(sum_of_income)
                print(f" {sum_of_income} KM")
                print("Expenses: ", end="")
                self.displayChart(sum_of_expenses)
                print(f" {sum_of_expenses} KM")
                input("Press any key to continue...")
            else:
                input("Press any key to continue...")
                return False
        except Exception as e:
            print(f"An error occurred: {e}")
            input("Press any key to continue...")
    #Json file methods
    def saveAccToJson(self):
        try:
            with open("accounts.json", "w") as f:
                accounts_data = [
                    {
                        "Account Id": account.accountId,
                        "Account Name": account.accountName,
                        "account Balance": account.accountBalance,
                        "Account PIN": account.accountPin
                    }
                    for account in self.accounts
                ]
                json.dump(accounts_data, f, indent=4)
        except IOError as e:
            print(f"Error saving accounts to file: {e}")
    def saveTransaction(self,accountId,amount,transactionType):
        try:
            with open("transactions.json", "r") as f:
                try:
                    transactions = json.load(f)
                except json.JSONDecodeError:
                    transactions = []
        except FileNotFoundError:
            transactions = []
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        transactions.append({"Account ID": accountId, "Transaction type": transactionType,
                             "Amount": float(amount), "Timestamp": timestamp})
        with open("transactions.json", "w") as f:
            json.dump(transactions, f, indent=4)
    #helper functions for main menu methods
    def nameCreation(self):
        while True:
            name_ = input("Enter your first name: ").strip()
            surname = input("Enter your surname: ").strip()
            if len(name_)<2 or len(surname)<2:
                print("Name and Surname must have atleast 2 characters")
                continue
            name = name_ + " " + surname
            if self.inputValidation(name, ABCPattern):
                return name
            print("error: please enter a valid alphabetic character")
    def generateId(self):
        while True:
            id = random.randint(1000, 9999)
            if not self.checkIdExists(id):
                return id
    def pinCreation(self):
        while True:
            pin=input("Please a 4 digit numeric pin number: ").strip()
            if self.inputValidation(pin,IDPattern) and len(pin)==4:
                confirmation=input("Confirm your PIN: ").strip()
                if confirmation==pin:
                    return pin
                else:
                    print("Pins do not match, try again")
            else:
                print("invalid PIN, must be axaactly 4 numeric digits")
    def checkPin(self,someId):
        account=self.findAcc(someId)
        if not account:
            print("Account not found")
            return False
        chances=3
        while chances>0:
            somePin=input("Please enter your PIN number: ").strip()
            if account.accountPin==somePin:
                print("Access approved")
                return True
            else:
                chances -= 1
                print(f"Incorrect PIN number, try again {chances} chances left")
        print("try limit exceeded, access denied")
        return False
    def checkNameExists(self,someName):
        someName=someName.lower()
        for x in self.accounts:
            if x.accountName.lower()==someName:
                return True
    def checkIdExists(self, someId):
        someId=int(someId)
        for x in self.accounts:
            if x.accountId==someId:
                return True
    def findAcc(self,someId):
        try:
            for x in self.accounts:
                if x.accountId==int(someId):
                    return x
        except ValueError:
            pass
        return None
    def displayChart(self, sum):
        if sum<=1000:
            divisor=50
        elif sum<=100000:
            divisor=1000
        else:
            divisor=100000
        bar_length = int(sum / divisor)
        print("█" * bar_length, end="")
    def inputValidation(self,someInput, pattern):
        return bool(re.match(pattern, someInput))
    def getValidID(self,message="Enter the ID number: "):
        while True:
            chosenID = input(message).strip()
            if self.inputValidation(chosenID, IDPattern):
                return chosenID
            else:
                print("Invalid input, please enter a valid ID: ")
    def getValidNum(self):
        while True:
            amount = input("Enter the amount: ").strip()
            if self.inputValidation(amount, amountPattern) and float(amount) > 0:
                return amount
            else:
                print("Invalid input, please enter a valid amount: ")
    #main menu and bank app
    def BankMenu(self):
        print("***********************")
        print("Bank menu: ")
        print("1.Create a bank account")
        print("2.Deposit funds")
        print("3.Withdraw funds")
        print("4.Transfer funds")
        print("5.View transaction history")
        print("6.View Account")
        print("7.Exit")
        print("***********************")
    def BankApp(self):
        while (True):
            self.BankMenu()
            option = input("Choose an option: ").strip()
            match (option):
                case "1":
                    self.createAccount()
                case "2":
                    print("*** DEPOSIT ***")
                    self.depositAcc()
                case "3":
                    print("*** WITHDRAW ***")
                    self.withdrawAcc()
                case "4":
                    print("*** TRANSFER ***")
                    self.transfer()
                case "5":
                    print("*** TRANSACTION HISTORY ***")
                    self.showHistory()
                case "6":
                    print("*** ACCOUNT INFORMATION***")
                    self.viewAccount()
                case "7":
                    while True:
                        confirm = input("Are you sure you want to exit? (Y/N) ").strip()
                        if confirm.lower() != "y":
                            break
                        else:
                            print("Exiting...")
                            exit()
                case _:
                    print("Option nonexistent, please choose one of the 7 options")
                    input("Press any key to continue")

#patterns for input validation and helper functions
ABCPattern= r'^[a-zA-Z\s]+$'
IDPattern= r'^\d+$'
amountPattern= r'^\d+(\.\d+)?$'

#main program

bank= BankSystem()
bank.BankApp()





