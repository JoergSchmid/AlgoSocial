# AlgoSocial
Post some algorithms with React and Java Spring!

## How to run using docker

#### Build docker images
```
cd backend
docker build -t algoback .
cd ..
cd frontend
docker build -t algofront .
```

#### Start Application
`
docker compose up
`

Open http://localhost:3000 to access the frontend application.

Open http://localhost:8080/graphiql to access the GraphQL interface.
