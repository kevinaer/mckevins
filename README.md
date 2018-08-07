# McKevin's Mobile App
You can visit the app at http://mckevins.herokuapp.com
## Installation

### Node
You can install Node through installs found [here!](https://nodejs.org/en/download/) 

Alternatively you can install Node by running the following on your command line.

#### Mac
```
$ brew install node
```

#### Linux
```
$ sudo apt-get update
$ sudo apt-get install nodejs
$ sudo apt-get install npm
```

### MongoDB (for local tests)
Just follow the link [here](https://docs.mongodb.com/manual/installation/) to install based on your computer.

## Where to start?
Go to the issues tab in the github main page. Find an issue you like and just post in it to claim! However an issue will be up for grabs if you don't work on it.

### Useful links
Here are a few useful links for if you need to learn some skills before starting. If you find other useful links, feel free to let me know or create a PR!

-[TutorialsPoint tutorial for express for learning how to create routes](https://www.tutorialspoint.com/expressjs/index.html)

-[Scotchio's mongoose tutorial for learning how to work with MongoDB and create/use models](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)

-[React's tutorial for learning the basics of react](https://reactjs.org/tutorial/tutorial.html)

-[Scotchio's react-redux tutorial for learning actions and reducers](https://scotch.io/tutorials/build-a-bookshop-with-react-redux-i-react-redux-flow)

-[Material-ui's docs for learning how to create bootstrap'd react components](https://material-ui.com/)

-[Jest's docs for learning how to write unit tests in jest](https://jestjs.io/docs/en/getting-started)

-[Medium's quick guide to writing unit tests with jest and enzyme](https://medium.com/wehkamp-techblog/unit-testing-your-react-application-with-jest-and-enzyme-81c5545cee45)

## Commands for development

### Linting
To lint at any point run `npm run lint`. Linting will occur before every commit. 

### Starting up dev server
To start the server and client run `npm run dev`.

### Submitting your changes
In order to contribute, you must submit a pull request to be reviewed. This is a way of making sure that master isn't fucked by a bad commit or something.

First start by creating a new branch
```
$ git checkout -b <BRANCH>
```

Once you start a new branch you can start making changes. In order to commit your changes run
```
$ git add .
$ git commit -m "<COMMIT MESSAGE>"
```

Then you push to a new branch in the repo.
```
$ git push -u origin <BRANCH>
```

Finally when you go the website you can click on create PR button that appears when you push your new branch.
