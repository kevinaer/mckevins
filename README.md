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

## Where to start?
Go to the issues tab in the github main page. Find an issue you like and just post in it to claim! However an issue will be up for grabs if you don't work on it.

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
