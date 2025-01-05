using System.Text.Json;
using System.Text.Json.Serialization;

namespace Bank
{

    //Represents bank account
    public class Account 
    {
      
        public int Pin { get; private set; }
        public int Id { get; private set; }
        public string Name { get; private set; }
        public double Balance { get; private set; }

        [JsonIgnore] //Ignore this property during Json serialization
        public List<Transaction> Transactions { get; set; } = new List<Transaction>();


        [JsonConstructor] //Constructor that will be called during object deserialization in json
        public Account(int pin, int id, string name, double balance = 0)
        {
            Pin = pin;
            Id = id;
            Name = name;
            Balance = balance;
        }

        //Deposit method
        public void Deposit(double amount)
        {
            Balance += amount;
            var transaction = new Transaction(Id, "Deposit", amount, $"Deposited {amount} KM");
            
            Transactions.Add(transaction);
            
        }

        // Method or money withdrawal
        public bool Withdraw(double amount)
        {
            if (Balance >= amount)
            {
                Balance -= amount;
                Transactions.Add(new Transaction(Id, "Withdrawal", amount, $"Withdrew {amount} KM"));
                
                return true;
            }
            return false;
        }

        //Method for money transfer
        public void TransferFunds(Account another, double amount)
        {

                Balance -= amount;
                another.Balance += amount;

                Transactions.Add(new Transaction(Id, "Transfer", amount, $"Transferred {amount} KM to {another.Name}"));
                another.Transactions.Add(new Transaction(another.Id, "Transfer", amount, $"Received {amount} KM from {Name}"));
           
        }

        //View Transactions
        public void ViewTransactions()
        {
            Console.WriteLine($"Transaction history for {Name}:");
            foreach (var transaction in Transactions)
            {
                Console.WriteLine($"{transaction.Date}: {transaction.Type} - {transaction.Amount} KM - {transaction.Description}");
            }
        }

        //View Account
        public void ViewAccount()
        {
            Console.WriteLine("");
            Console.WriteLine("***********************");
            Console.WriteLine("ID: " + Id);
            Console.WriteLine("Name: " + Name);
            Console.WriteLine("Balance: " + Balance);

           
            var sumOfIncome = Transactions
                .Where(t => t.Type.Equals("Deposit") || t.Description.Contains("Received"))
                .Sum(t => t.Amount);

            var sumOfExpenses = Transactions
                .Where(t => t.Type.Equals("Withdrawal") || t.Description.Contains("Transferred"))
                .Sum(t => t.Amount);

            Console.WriteLine("************************");

            Console.WriteLine("\n");
            Console.WriteLine("Income vs Expenses graph \n");

            double max = Math.Max(sumOfExpenses, sumOfIncome);

            Console.Write("Income:   ");
            DisplayChart(sumOfIncome, max);
            Console.WriteLine($" {sumOfIncome} KM"); 

            Console.Write("Expenses: ");
            DisplayChart(sumOfExpenses, max);
            Console.WriteLine($" {sumOfExpenses} KM");

            Console.WriteLine("\n");
            
        }


        //Method for displaying the graph (income vs expenses)
        public void DisplayChart(double sum, double _max)
        {

            int barLength = (int)((sum / _max) * 50);  //adjusting the scale
            for (int i = 0; i < barLength; i++)
            {
                Console.Write("█");
            }
        }

       

    }

    //Class for transactions
    public class Transaction
    {
        public int Id { get; private set; }

        public string Type { get; private set; }
        public double Amount { get; private set; }
        public string Date { get; private set; }
        public string Description { get; private set; }

        public Transaction(int Id, string type, double amount, string description)
        {
            this.Id = Id;
            Type = type;
            Amount = amount;
            Date = DateTime.Now.ToString(); 
            Description = description;
        }
    }

    //Banking System class (it contains list of all accounts, transactions, methods for deposit, money withdrawal and transfer
    public class BankingSystem
        {

        private static List<Account> allAccounts = new List<Account>();
        private const string file = "someFile.json";
        private static int chanceCount = 4;
        private static int count;
        private const string transactionFile = "transactions.json";


        //Saves transactions to transactios.json
        private static void SaveTransactionsToJson()
        {
            try
            {
                string jsonString = JsonSerializer.Serialize(allAccounts.SelectMany(a => a.Transactions).ToList(), new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(transactionFile, jsonString);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error saving transactions to JSON: {e.Message}");
            }
        }

    //Reads the data from transactions.json and store them to Transaction list of the account class
        private static void LoadTransactionsFromJson()
        {
            if (File.Exists(transactionFile)) //checks if the file exists at the defined path
            {
                try
                {
                    string jsonString = File.ReadAllText(transactionFile); //reads all data from the json file
                    if (!string.IsNullOrWhiteSpace(transactionFile)) //checks if it is null
                    {
                       var transactions = JsonSerializer.Deserialize<List<Transaction>>(jsonString) ?? new List<Transaction>(); //If the string is not empty, program will deserialize the contents from json file,
                                                                                                                                //otherwise it initilises transactions as an empty list

                        foreach (var account in allAccounts) //initializes transactions to accounts wit corresponding id
                        {
                            account.Transactions = transactions.Where(t => t.Id == account.Id).ToList();
                        }

                    }
                }
                catch (JsonException)
                {
                    Console.WriteLine("Error reading the transactions JSON file. The file might be corrupted.");
                }
            }
        }

        //In constructor, program loads existing data from someFile.json to the allAccounts List, same for transactions
        public BankingSystem()
        {
            if (File.Exists(file))
            {
                try
                {
                    string jsonString = File.ReadAllText(file);
                    if (!string.IsNullOrWhiteSpace(jsonString))
                    {
                        allAccounts = JsonSerializer.Deserialize<List<Account>>(jsonString); //Deserelizes the objects and places them in the list
                    }

                    else
                    {
                       allAccounts =  new List<Account>();
                    }
                    count = allAccounts.Count;
                }
                catch (JsonException)
                {
                    Console.WriteLine("Error reading the JSON file. The file might be corrupted.");
                    allAccounts = new List<Account>();
                }
            }

            LoadTransactionsFromJson(); 
        }

        //Gets the account based on id
        public Account GetAccountById ()
        {
            int chanceCount = 4;
            Account account;
            while (true)
            {

                try
                {
                    Console.Write("Enter the ID: ");
                    int id = int.Parse(Console.ReadLine());
                    account = allAccounts.FirstOrDefault(a => a.Id == id); //checks if any object of type account contains the same id

                    if (account == null)
                    {

                        chanceCount--;
                        Console.WriteLine("Account not found, try again\n");

                        if (chanceCount == 1)
                        {
                            Console.WriteLine("One last chance!");
                            continue;
                        }

                        if (chanceCount == 0)
                        {
                            chanceCount = 4;
                            Console.WriteLine("Going back to menu....");
                            Menu();
                        }

                        else
                        {
                            Console.WriteLine($"{chanceCount} more chances left");
                            continue;

                        }
                    }

                        break;
                }

                catch (FormatException e)
                {
                    Console.WriteLine("Invalid input try again");
                }

                }
               

            return account;
        }

        //Confirms the user by entering the pin
        public bool GetAccountByPin (int _id)
        {
            int chanceCount = 4;
            bool response = false;
            Account account;
            
            while (true)
            {

                try
                {
                    Console.Write("To confirm is you, enter your account pin: ");
                    int pin = int.Parse(Console.ReadLine());
                    account = allAccounts.FirstOrDefault(a => a.Pin == pin && a.Id == _id); //checks if the object has the same id and pin to confirm the account

                    if (account == null)
                    {
                        
                        chanceCount--;
                        Console.WriteLine("Account not found, try again\n"); //user has three chances otherwise program terminates user's request and gets back to menu

                        if (chanceCount == 1)
                        {
                            Console.WriteLine("One last chance!");
                            continue;
                        }

                        if (chanceCount == 0)
                        {
                            Console.WriteLine("Going back to menu....");
                            Menu();
                        }

                        else
                        {
                            Console.WriteLine($"{chanceCount} more chances left");
                            continue;

                        }
                       
                    }

                    else
                    {
                        response = true;
                        break;
                    }

                   

                    
                }

                catch (FormatException e)
                {
                    Console.WriteLine("Invalid input try again");
                }

            }

            return response;
        }


        //Saves entered data to someFile.josn

        private static void SaveHistoryToJson()
            {
                try
                {
                    string jsonString = JsonSerializer.Serialize(allAccounts, new JsonSerializerOptions { WriteIndented = true });
                    File.WriteAllText(file, jsonString);
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error saving to JSON: {e.Message}");
                }
            }

        //First time creating an account
            public void CreateAccount()
        {
            while (true)
            {
                try
                {
                    ErrorHandling:
                    Console.Write("Please enter your name: ");
                    string firstName = Console.ReadLine();

                    Console.Write("Please enter your surname: ");
                    string surname = Console.ReadLine();

                    if (firstName.Any(char.IsDigit) || surname.Any(char.IsDigit)) //In case user enters a digit instead of letter (no name can contain numbers)
                    {
                        Console.WriteLine("Opps! It looks like you made a typo, please enter your full name\n");
                        goto ErrorHandling; // returns back to 375 line of the code
                    }

                    string name = firstName + " " + surname;

                    TypoHandling:
                    Console.Write($"Confirm your personal data (y/n)? "); //Confirmation

                    string answer = Console.ReadLine();

                    if (answer.Equals("n") || answer.Equals("N")) //If the user made a mistake, there is opportunity to fix it
                    {
                        Console.WriteLine("\n");
                        goto ErrorHandling;
                        
                    }

                    if (!(answer.Equals("y") || answer.Equals("n") || answer.Equals("Y") || answer.Equals("N"))) {
                        Console.WriteLine("Invald input, try again!");
                        goto TypoHandling;

                    
                    }


                NoToConfirmation:
                    Console.Write("Generate your PIN (Pin must contain 4 digits and first digit cannot be 0): ");


                    int pin = int.Parse(Console.ReadLine());

                    if (pin < 1000 || pin > 9999)
                    {
                        Console.WriteLine("Invalid password, please follow the instructions");
                        goto NoToConfirmation;
                    }

                    Console.WriteLine("Confirm this pin? (y/n)");

                    string confirmation = Console.ReadLine();

                    if (confirmation.ToLower().Equals("n"))
                    {
                        Console.WriteLine("Repeat the process...");
                        goto NoToConfirmation; //gets back to 429 line if the user enters n
                    }

                    if (!(confirmation.ToLower().Equals("y") || confirmation.ToLower().Equals("n")))
                    {
                        Console.WriteLine("Invalid input try again");
                        goto NoToConfirmation; 
                    }


                    IdRepetition2: 
                    Random number = new Random();
                    int id = number.Next(1000, 10000);

                    if (DoesTheIdRepeat(id)) //Checks if the same id is used in the allAccounts list
                    {
                        id = number.Next(1000, 10000);
                        goto IdRepetition2; //If it does, program generates the new one and checks it
                    }

                    Console.WriteLine($"Your ID: " +id);
                    Console.WriteLine($"Your PIN: " + pin);
                    Console.WriteLine("You will use these for loggin in your account");


                    count++;
                    var account = new Account(pin, id, name); //Creates new object of class type Account

                    allAccounts.Add(account); //Adds it to allAccounts List
                    SaveHistoryToJson(); //Stores all data to Json

                    Console.WriteLine($"You have officially created your bank account!");
                    break;
                }
                catch (FormatException) //Checks if the user entered right data 
                {
                    Console.WriteLine("Invalid input. Please follow the instructions.");
                    WaitForUser();
                }
            }
            WaitForUser();
            Console.WriteLine("\n");
            
            
        }

        //Method for money deposit
        public void DepositMoney()
        {
         try
            {
                var account = GetAccountById(); 



            EnterAmount:
                Console.Write("Enter the amount to deposit: "); 


                double amount = double.Parse(Console.ReadLine());


                if (amount < 0)
                {
                    Console.WriteLine("Invalid input, try again");
                    goto EnterAmount;

                }

                if (GetAccountByPin(account.Id))
                {

                WrongInput:
                    Console.Write("Confirm the deposit? (y/n): ");
                    string answer = Console.ReadLine();
                    if (!(answer.Equals("y") || answer.Equals("n") || answer.Equals("Y") || answer.Equals("N")))
                    {
                        Console.WriteLine("Invalid input, try again");
                        goto WrongInput;
                    }

                    if (answer.Equals("n") || answer.Equals("N"))
                    {
                        Console.WriteLine("Going back to menu...");
                        Menu();
                    }

                    if (answer.Equals("y") || answer.Equals("Y"))
                    {


                        account.Deposit(amount);
                        Console.WriteLine($"Deposit successful. New balance: {account.Balance}\n");
                        SaveHistoryToJson();
                        SaveTransactionsToJson();

                    }


                }
            }

            catch (FormatException e) { Console.WriteLine("Invalid input! Request declined.\n"); WaitForUser(); Menu(); }
         

                    
            }
        
        //Money withdrawal method
        public void WithdrawMoney()
        {
            
               try
                {
                    var account = GetAccountById();

                     NegativeInput:

                    Console.WriteLine("Enter the amount to withdraw: ");
                    double amount = double.Parse(Console.ReadLine());

                    if (amount <= 0)
                    {
                        Console.WriteLine("Invalid input error, try again");
                    goto NegativeInput;

                    }


                    if (GetAccountByPin(account.Id))
                    {
                    WrongInput:
                        Console.Write("Confirm the withdrawal? (y/n): ");
                        string answer = Console.ReadLine();
                        if (!(answer.Equals("y") || answer.Equals("n") || answer.Equals("Y") || answer.Equals("N")))
                        {
                            Console.WriteLine("Invalid input, try again");
                            goto WrongInput;
                        }

                        if (answer.Equals("n") || answer.Equals("N"))
                        {
                            Console.WriteLine("Going back to menu...");
                            Menu();
                        }

                    }

                    if (!account.Withdraw(amount)) //If user is trying to withdraw more than allowed
                    {
                        Console.WriteLine("Insufficient funds. Withdrawal request declined\n");
                    WaitForUser();
                    Menu();

                    }

                    Console.WriteLine("Withdrawal successfull. New Balance: " + account.Balance + "\n");
                    SaveHistoryToJson();
                    SaveTransactionsToJson();

                   

                }

                catch (FormatException e) { Console.WriteLine("Invalid input! Request declined"); WaitForUser();  Menu(); }


            
            WaitForUser();
            
                
            }
        



        public void TransferMoney()
        { 
            
                try
                {
                    var account = GetAccountById();
                    string answer;


                    Console.Write("Enter the amount: ");
                    double amount = Double.Parse(Console.ReadLine());
                    if (amount <= 0 || account.Balance <= amount)
                    {
                        Console.WriteLine($"Insufficient funds! Transfer declined.");
                        WaitForUser();
                        Menu();
                    }

                    if (GetAccountByPin(account.Id))
                    {

                        Console.Write("Next step is entering ID of the receiver.\n");

                    RepeatTheProcess:

                        var account2 = GetAccountById();

                        if (account == account2) //If user enters his/her ID instead of receiver's
                        {
                            Console.WriteLine("Invalid input, please enter ID of the receiver");
                            goto RepeatTheProcess;
                        }


                    WrongInput:
                        Console.Write("Confirm transaction. (y/n): "); 
                        answer = Console.ReadLine();
                        if (!(answer.Equals("y") || answer.Equals("n") || answer.Equals("Y") || answer.Equals("N")))
                        {
                            Console.WriteLine("Invalid input, try again");
                            goto WrongInput;
                        }

                        if (answer.Equals("n") || answer.Equals("N"))
                        {
                            Console.WriteLine("Going back to menu...");
                            Menu();
                        }

                        
                            account.TransferFunds(account2, amount);
                            Console.WriteLine("Transfer successful! New Balance: " + account.Balance + "\n");
                            SaveTransactionsToJson();
                            SaveHistoryToJson();
                           
                        

                    }
                }

                catch (FormatException e) { Console.WriteLine("Invalid input! Request Declined"); WaitForUser();  Menu(); }
               
            

            WaitForUser();     

            
        }

        public void ViewTransactionHistory()
        {
            
                var account = GetAccountById();
                if (GetAccountByPin(account.Id))
                    account.ViewTransactions();

            WaitForUser();
          

            

        }

        public void ViewBankAccount()
        {
            
            
                var account = GetAccountById();
                if (GetAccountByPin(account.Id))
                    account.ViewAccount();

            WaitForUser();





        }

        public void Menu()
        {
            while (true)
            {
                Console.WriteLine("Welcome to the Banking system! Choose an option below:\n" +
                                  "1. Create an account\n" +
                                  "2. Deposit money\n" +
                                  "3. Withdraw money\n" +
                                  "4. Transfer funds\n"+
                                  "5. View Transaction History\n"+
                                  "6. View Account\n"+
                                  "7. Exit\n");

                try
                {
                    int option = int.Parse(Console.ReadLine());

                    switch (option)
                    {
                        case 1:
                            CreateAccount();
                            break;
                        case 2:
                            DepositMoney();
                            break;
                        case 3:
                            WithdrawMoney();
                            break;

                        case 4:
                            TransferMoney();
                            break;

                        case 5:
                            ViewTransactionHistory();
                            break;

                        case 6:
                            ViewBankAccount();
                            break;
                        case 7:
                            Console.WriteLine("Exiting the banking system. Goodbye!");
                            Environment.Exit(0);
                            break;
                        default:
                            Console.WriteLine("Invalid option. Please choose between 1 and 5.");
                            break;
                    }
                }
                catch (FormatException)
                {
                    Console.WriteLine("Invalid input. Please enter a number.");
                }
            }
        }

        public void WaitForUser()
        {
            Console.WriteLine("Press any key to continue...");
            Console.ReadKey(intercept: true);

        }

        public static bool DoesTheIdRepeat(int id)
        {
            return allAccounts.Any(a => a.Id == id);
        }

       

        public static void Main(string[] args)
        {
            BankingSystem bank = new BankingSystem();
            bank.Menu();
        }
    }
}
