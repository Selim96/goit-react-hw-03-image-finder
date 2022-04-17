import React, { Component } from "react";
import queryImagesApi from '../Api/Api';


class Searchbar extends Component {
    state = {
        toSearch: '',
    }

    handlChange = (e) => {
    this.setState({ toSearch: e.currentTarget.value })
    console.log(this.state)
    }
    
    handlSubmit = () => {
        const searchQuery = this.state.toSearch;
        queryImagesApi(searchQuery);

    }

    render() {
        return (
            <header class="searchbar">
                <form class="form" onSubmit={this.handlSubmit}>
                    <button type="submit" class="button">
                        <span class="button-label">Search</span>
                    </button>

                    <input
                        class="input"
                        type="text"
                        name="input"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.toSearch}
                        onChange={this.handlChange}
                    />
                </form>
            </header>
        );
    }
}

export default Searchbar;