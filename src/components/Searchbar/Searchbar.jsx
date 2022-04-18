import React, { Component } from "react";
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

class Searchbar extends Component {
    state = {
        toSearch: '',
    }

    handlChange = (e) => {
        this.setState({ toSearch: e.currentTarget.value.toLowerCase(), });
    }

    handlSubmit = (e) => {
        e.preventDefault();
        const searchQuery = this.state.toSearch;
        
        if (searchQuery.trim() === '') {
            toast.error('please, enter name!!!!');
            return;
        }
        this.props.onSubmit(searchQuery);
        this.setState({ toSearch: '' });
    }

    render() {
        return (
            <header className={s.Searchbar}>
                <form className={s.SearchForm} onSubmit={this.handlSubmit}>
                    <button type="submit" className={s.SearchFormButton}>
                        <span className={s.SearchFormButtonLabel}>Search</span>
                    </button>
                    <input
                        className={s.SearchFormInput}
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