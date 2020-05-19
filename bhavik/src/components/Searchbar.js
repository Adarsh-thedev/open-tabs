import React, { Component } from 'react';
import google from '../assets/google.svg';
import{FiSearch} from 'react-icons/fi';
import './styles.css';

export default class Searchbar extends Component {
    render() {
        return (
          <div className="search">
             <form method = "get" action="https://cse.google.com/cse/publicurl">
                  <div className="searchbar">
                      <FiSearch />
                      {/* <input placeholder="&#128269;" type="text" id="q" name="q" title="Search" alt="Search Text" maxlength="256" /> */}
                      <input type="text" id="q" name="q" title="Search" alt="Search Text" maxlength="256" />
                      <input type="hidden" id="cx" name="cx" value="008051653802709586379:hdkkje5v5c1" />
                      {/* <input type="image" id="searchSubmit" name="submit" src={google} width="20" height="20" alt="Go" title="Submit Search Query" /> */}
                  </div>
              </form>
          </div>
        )
    }
}
