import React from 'react'
import ReactDOM from 'react-dom'
import App from './navigation/index'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { initializeStore } from './redux/store'
import { saveState } from './redux/localStorage'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
const API_URL = process.env.API_URL

const httpLink = createHttpLink({ uri: 'https://ica-api-zxtagzmnej.now.sh/graphql' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const store = initializeStore()

store.subscribe(() => {
  saveState({
     ica: store.getState().ica
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
