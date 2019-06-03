# WebAuthn workshop

## Quick start

Start the back-end http://localhost:3001/
```
cd server
yarn
yarn start
```

Start the front-end http://localhost/3000/
```
cd client
yarn
yarn build
yarn start
```

## Getting the files

If you have [Git](https://git-scm.com/downloads) installed, you can run

```
git clone https://github.com/bplowry/webauthn_workshop.git
```

Otherwise, navigate to https://github.com/bplowry/webauthn_workshop and click `Clone or Download > Download ZIP`

## Prerequisites

* Install [Node.js](https://nodejs.org/en/) (LTS version is fine)
* Install [yarn](https://yarnpkg.com/en/)

## Getting started

This repo consists of an Express back-end and a React front-end. You'll need to run both for the app to function. To do so, open two terminal windows.

### Running the front-end (client)

In one terminal window, run:
```
cd client
yarn
```

You have a couple of options after this point. If you don't intend on changing the front-end code, and just want it running, you can run 
```
yarn build
```

This will create a production build that can be accessed at http://localhost:3001/ (after you've built the back-end). This is not _required_ but can simplify the workflow if you don't intend on changing the front-end. It is closer to how the app will run in production, but it won't automatically detect changes to your front-end code.

If you intend to change the front-end code, it's easier to run

```
yarn start
```

This will run a development build of the app at http://localhost:3000/, which will update automatically when you make changes.

Regardless of which option you choose, you'll still need to run the back-end.

### Running the back-end (server)

In a second terminal window, run:
```
cd server
yarn
yarn start
```

The back-end will be available at http://localhost:3001/ (which will actually display the front-end, if you've run `yarn build` for that project)

If you want to test that it's working, you can try going to http://localhost:3001/api/health in your browser. You should see something like
```
{ status: 'ok' }
```
