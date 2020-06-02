import React, { Component } from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';

export default class Searchbar extends Component {
    render() {
        return (
          <div className="search">
             <form method = "get" action="https://www.google.com/search?q=">
                  <div className="searchbar">
                      <input type="text" id="q" name="q" title="Search" alt="Search Text" maxLength="256" />
                      <button type="submit" id="searchsubmit"><FiSearch /></button>
                  </div>
              </form>
          </div>
        )
    }
}
