const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const { createStore } = require('./utils')
const LaunchAPI = require('./datasources/launch')
const UserAPI = require('./datasources/user')
const resolvers = require('./resolvers')

const store = createStore()

const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  }),
  resolvers,
})

server.listen().then(() => {
  console.log(`
    Server is running!
    Listen on port 4000
    Explore at https://studio.apollographql.com.dev
  `)
})
