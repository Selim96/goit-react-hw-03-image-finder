import React, {Component} from "react";
import Searchbar from "./Searchbar";

class App extends Component {
  state = {
    imagesData: [],
    loader: false,
    
  }

  componentDidMount() {
    // запись тестового списка в локал сторедж
    // localStorage.setItem('contacts', JSON.stringify(defaultData));

    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts) {
      return this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('updated!!!!!!');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
    <div>
      <Searchbar />
        <ul class="gallery">
          <li class="gallery-item">
            <img src="" alt="" />
          </li>
        </ul>
    </div>
  );
  }
  
};

export default App;