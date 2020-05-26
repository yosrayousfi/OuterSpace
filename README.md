# OuterSpace

OuterSpace is a social media app using the Model-View-Controller pattern, Express and external NASA API.


## Demo on Heroku

https://outer-space.herokuapp.com/


## Local Setup

### Prerequisites

- Node and NPM installed locally
- MongoDB installed and running locally


### Setup

0. Open new terminal window and go to OuterSpace repo folder
1. `npm install`
2. Create a new file called `.env` and add the following content:

```
PORT=3000
ENV=development
GITHUB_ID=xxx
GITHUB_SECRET=sss
SESSION_SECRET=zzz

CLOUDINARY_NAME=aaa
CLOUDINARY_KEY=bbb
CLOUDINARY_SECRET=ccc
```

## Development

0. Open new terminal window and go to OuterSpace repo folder
1. `npm run dev`
2. Open http://localhost:3000 in your browser
