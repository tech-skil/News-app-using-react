import React, { Component } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Switcher from "../Component/Switcher";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      searchQuery: ''
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  onSearch = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.searchQuery);
  };

  handleSearchInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    return (
      <div className="bg-gray-100 dark:bg-[#08172c] dark:text-white h-auto py-4 px-4 sm:px-8 lg:px-10 2xl:px-20 md:text-sm">
        <div className="flex flex-row space-x-4 items-center justify-between">
          <div className="flex items-center justify-center space-x-4">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkBkN-ussyLSVUJWDUUsIm_JNLCRVmgQSquA&usqp=CAU"
                className="sm:w-20 rounded-sm w-20"
                alt="logo"
              />
            </div>
            <div className="flex justify-start text-base font-normal">
              <ul>
                <li className="sm:space-x-4 md:text-sm md:block hidden">
                  <Link
                    to="/business"
                    className="focus:border-b-2 focus:border-red-700 focus:text-red-700 active:bg-gray-50 hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                  >
                    Business
                  </Link>
                  <Link
                    to="/entertainment"
                    className="focus:border-b-2 focus:border-red-700 focus:text-red-700 active:bg-gray-50 hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                  >
                    Entertainment
                  </Link>
                  <Link
                    to="/"
                    className="focus:border-b-2 focus:border-red-700 focus:text-red-700 active:bg-gray-50 hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                  >
                    General
                  </Link>
                  <Link
                    to="/health"
                    className="focus:border-b-2 focus:border-red-700 focus:text-red-700 active:bg-gray-50 hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                  >
                    Health
                  </Link>
                  <Link
                    to="/science"
                    className="focus:border-b-2 focus:border-red-700 focus:text-red-700 active:bg-gray-50 hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                  >
                    Science
                  </Link>
                  <Link
                    to="/sports"
                    className="focus:border-b-2 focus:border-red-700 focus:text-red-700 active:bg-gray-50 hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                  >
                    Sports
                  </Link>
                  <Link
                    to="/technology"
                    className="focus:border-b-2 focus:border-red-700 focus:text-red-700 active:bg-gray-50 hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                  >
                    Technology
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-row items-center space-x-4">
            <div className="search flex flex-row h-[50%]">
              <input
                type="text"
                className="h-8 w-full placeholder:text-[0.8rem] rounded-l-md px-2"
                placeholder="Search the news"
                value={this.state.searchQuery}
                onChange={this.handleSearchInputChange}
              />
              <button
                className="px-6 -pl-6 py-1 w-fit bg-red-700 text-white rounded-r-md text-xs md:text-sm text-[0.8rem] hover:bg-red-800"
                onClick={this.onSearch}
              >
                Search
              </button>
            </div>
            <div>
              <Switcher />
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={this.toggleMenu}>
              {this.state.isOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-800 dark:text-gray-50" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-800 dark:text-gray-50" />
              )}
            </button>
          </div>
        </div>
        {this.state.isOpen && (
          <div className="md:hidden flex justify-start">
            <ul className="space-y-4 p-4">
              <li>
                <Link
                  to="/business"
                  className="hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  to="/entertainment"
                  className="hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                >
                  Entertainment
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                >
                  General
                </Link>
              </li>
              <li>
                <Link
                  to="/health"
                  className="hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                >
                  Health
                </Link>
              </li>
              <li>
                <Link
                  to="/science"
                  className="hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  to="/sports"
                  className="hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  to="/technology"
                  className="hover:border-b-2 hover:border-red-700 cursor-pointer hover:text-red-700"
                >
                  Technology
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}