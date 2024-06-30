import React, { Component } from "react";
import Article from "./Article";
import Loading from "./Loading";
import Articleloading from "../assets/scrollLoding.gif";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 15,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
    apikey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
    searchQuery: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      isSearching: false,
      error: null,
    };
  }

  async componentDidMount() {
    await this.updateNews();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState({ isSearching: true }, () => {
        this.updateNewsBySearch(this.props.searchQuery);
      });
    }
  }

  async updateNews() {
    try {
      this.props.setProgress(5);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
      this.props.setProgress(20);
      this.setState({ loading: true, error: null });
      let response = await fetch(url);
      this.props.setProgress(50);
      let data = await response.json();
      console.log("API Response:", data); // Log the entire response

      if (data.status === "ok" && Array.isArray(data.articles)) {
        this.setState({
          articles: data.articles,
          totalResults: data.totalResults || 0,
          loading: false,
          isSearching: false,
        });
      } else {
        throw new Error(data.message || "Failed to fetch news");
      }
      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false, error: error.message || "An unexpected error occurred" });
    }
  }

  async updateNewsBySearch(query) {
    try {
      this.props.setProgress(5);
      const url = `https://newsapi.org/v2/everything?q=${query}&from=2024-05-30&sortBy=publishedAt&apiKey=${this.props.apikey}`;
      this.props.setProgress(20);
      this.setState({ loading: true, error: null });
      let response = await fetch(url);
      this.props.setProgress(50);
      let data = await response.json();
      console.log("Search API Response:", data); // Log the entire response

      if (data.status === "ok" && Array.isArray(data.articles)) {
        this.setState({
          articles: data.articles,
          totalResults: data.totalResults || 0,
          loading: false,
          page: 1,
          isSearching: false,
        });
      } else {
        throw new Error(data.message || "Failed to fetch search results");
      }
      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching search results:", error);
      this.setState({ loading: false, error: error.message || "An unexpected error occurred" });
    }
  }

  fetchMoreData = async () => {
    try {
      const nextPage = this.state.page + 1;
      let url;
      if (this.props.searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}from=2024-05-30&sortBy=publishedAt&apiKey=${this.props.apikey}&page=${nextPage}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${nextPage}&pagesize=${this.props.pagesize}`;
      }
      let response = await fetch(url);
      let data = await response.json(); 
      console.log("Fetch More Data Response:", data); // Log the entire response
      
      if (data.status === "ok" && Array.isArray(data.articles)) {
        if (data.articles.length === 0) {
          this.setState({ loading: false });
        } else {
          this.setState(prevState => ({
            articles: prevState.articles.concat(data.articles),
            totalResults: data.totalResults || prevState.totalResults,
            page: nextPage,
          }));
        }
      } else {
        throw new Error(data.message || "Failed to fetch more articles");
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
      this.setState({ error: error.message || "Failed to fetch more articles" });
    }
  };

  render() {
    const { articles, loading, isSearching, error } = this.state;

    return (
      <div className="sm:mx-10 dark:bg-[#273954]">
        <h1 className="sm:text-5xl text-2xl font-medium text-center py-4 sm:py-10">
          {this.props.searchQuery ? `Search Results for "${this.props.searchQuery}"` : "Today's Latest News!"}
        </h1>
        {loading && <Loading />}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !isSearching && articles && articles.length > 0 && (
          <InfiniteScroll
            dataLength={articles.length}
            next={this.fetchMoreData}
            hasMore={articles.length < this.state.totalResults}
            loader={
              <div className="flex items-center justify-center mt-20">
                <img src={Articleloading} alt="Loading articles..." />
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 sm:space-x-6">
              {articles.map((element, index) => (
                <div key={element.url || index} className="mx-2 sm:mx-0">
                  <Article
                    description={element.description || "No description available"}
                    title={element.title || "No title available"}
                    urlimg={element.urlToImage}
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
        {!loading && !isSearching && (!articles || articles.length === 0) && !error && (
          <p className="text-center">No articles found.</p>
        )}
      </div>
    );
  }
}