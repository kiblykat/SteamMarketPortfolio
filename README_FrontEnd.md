# Bank Account

Your job is to design and implement a *single-page web application* GUI that handles user input and output. The following writeup and sample input/output are CLI representation of the UI. You should adapt them to suitable web interface accordingly. 

There is no requirement to integrate with a backend service nor external database. 

Your UI should be aesthetically pleasing, styled properly, consistent, and intuitive. The code pertaining to styling should be structured idiomatically as per your chosen framework / library. 

It is highly preferable to provide automated tests in your solution.

## Problem Statement

You're designing a simple banking system that handles operations on bank accounts. At the moment, your system is capable of three features:
- depositing an amount
- withdrawing an amount
- printing account statement

When account is created, its balance is 0.

When launching the application, it prompts user for actions:
```
Welcome to AwesomeGIC Bank! What would you like to do?
Deposit
Withdraw
Print statement
Quit
```

User should be to select any of the options from the UI.

## Deposit
Upon selecting `Deposit` from the UI, application prompts user for amount:
```
Please enter the amount to deposit:
```

User is then able to enter:
```
500
```

Then system responds with:
```
Thank you. $500.00 has been deposited to your account.
Is there anything else you'd like to do?
Deposit
Withdraw
Print statement
Quit
```

## Withdraw
Upon selecting `Withdraw` from the UI, system then responds with:
```
Please enter the amount to withdraw:
```

User is able to enter:
```
100
```

Then system responds with:
```
Thank you. $100.00 has been withdrawn.
Is there anything else you'd like to do?
Deposit
Withdraw
Print statement
Quit
```
You can ignore where the withdrawn amount goes for now.

## Print Statement
Upon choosing to `Print statement` from the UI, system then responds with:
```
Date                  | Amount  | Balance
8 Jul 2022 11:12:30AM | 500.00  | 500.00
8 Jul 2022 11:14:15AM | -100.00 | 400.00
```

## Quit
When user chooses to `Quit`, system responds with:
```
Thank you for banking with AwesomeGIC Bank.
Have a nice day!
```
