import {loadPokemonInfo} from 'actions'
import {Provider, connect} from 'react-redux'
import store from 'store'

class App extends React.Component {
  render () {
    const {pokemon, isLoading, error} = this.props
    return <div>
      <button onClick={() => this.props.loadPokemon(1)}>Search Pokemon</button>
      { isLoading ? <h3>Searching ...</h3> : null }
      {
        !isLoading && pokemon.id
        ? <div>
          <p>
            <span>Name:</span>
            <span>{pokemon.name}</span>
          </p>
          <p>
            <span>Experience:</span>
            <span>{pokemon.base_experience}</span>
          </p>
          <p>
            <span>Height:</span>
            <span>{pokemon.height}</span>
          </p>
          <p>
            <span>Weight</span>
            <span>{pokemon.weight}</span>
          </p>
        </div>
        : null
      }
      { error || null }
    </div>
  }
}

const mapStateToProps = state => {
  return {...state}
}

const mapDispatchToProps = dispatch => {
  return {
    loadPokemon (id) {
      dispatch(loadPokemonInfo(id))
    }
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

class Root extends React.Component {
  render () {
    return <Provider {...{store}}>
      <AppContainer />
    </Provider>
  }
}

export default Root
