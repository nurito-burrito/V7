# V7

Cypress project with Mailslurp integration to cover e2e testing of user registration by intercepting the registration email link and navigating to the registration flow.

![Kapture 2023-09-01 at 09 15 55](https://github.com/nurito-burrito/V7/assets/44758040/7b42b136-4169-4e30-986c-99196b42de21)


## clone this repo to a local directory
```git clone git@github.com:nurito-burrito/V7.git```

## install the node_modules
```npm install```

## create a new file named .env in the root of your project
run ```touch .env``` 
In your new .env file, add a new key=value pair for mailslurp api key
For example ```MAILSLURP_API_KEY=123```

## to run all tests in headless mode
```npx cypress run```

## to run specific test in headless mode
```npx cypress run --spec cypress/e2e/login_tests.cy.js```

## to run the tests in cypress ui
```npx cypress open```


