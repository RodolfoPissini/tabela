import { Component } from "react";
import "./App.css";

class Header extends Component {
  state = {
    user: [],
  };
  componentDidMount() {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          user: response.results,
        });
      });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="header-company">
        <div>
          <h1>Company</h1>
        </div>
        <div>
          {user.map((user) => (
            <div key={user.id} className="usuario">
              <h2> Bem Vindo: {user.name.first}</h2>
              <img src={user.picture.medium} alt="user"className="user"/>
            </div>
          ))}
        </div>
        
      </div>
    );
  }
}
export default Header;
