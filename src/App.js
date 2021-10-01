import {Component} from 'react';
import Header from './header';
import Body from './body';
import './App.css';

class App extends Component {
  render() {
    return(
      <section className="sec">
        <Header/>
        <Body/>
      </section>

    )
  }
}

export default App;