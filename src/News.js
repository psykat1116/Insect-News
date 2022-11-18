import React from "react";
import {useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

const News=(props)=>{
  const [article, setArticle] = useState([])
  const [Loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalArticles, settotalArticles] = useState(0)

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    updateNews()
    document.title = `Insect-News | ${capitalize(props.catagory)}`;
    //eslint-disable-next-line
  }, [])
  
  // async componentDidMount() {
  //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=ea6c135a167440daace246c3c7fcedca&page=1&pageSize=${props.pageSize}`
  //   this.setState({loading:true})
  //   let data = await fetch(url);
  //   let parseData = await data.json()
  //   this.setState({articles: parseData.articles,totalArticles: parseData.totalResults,loading: false})
  //   this.updateNews();
  // }

  const updateNews=async()=>{
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticle(parseData.articles);
    setLoading(false)
    settotalArticles(parseData.totalArticles)
    // this.setState({ articles: parseData.articles });
    // this.setState({
    //   loading: false,
    //   totalArticles: parseData.totalResults,
    // });
    props.setProgress(100)
  }

  // const handlePrevious = async () => {
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=ea6c135a167440daace246c3c7fcedca&page=${this.state.page-1}&pageSize=${props.pageSize}`
  //   // this.setState({loading:true})
  //   // let data = await fetch(url);
  //   // let parseData = await data.json()
  //   // this.setState({articles: parseData.articles})
  //   // this.setState({
  //   //   page: this.state.page-1,
  //   //   loading: false
  //   // })
  //   // this.setState({ page: this.state.page - 1 });
  //   setPage(page-1)
  //   updateNews();
  // };

  // const handleNext = async () => {
  //   // if(this.state.page+1 <= Math.ceil(this.state.totalArticles/props.pageSize))
  //   // {
  //   //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=ea6c135a167440daace246c3c7fcedca&page=${this.state.page+1}&pageSize=${props.pageSize}`
  //   //   this.setState({loading:true})
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json()
  //   //   this.setState({articles: parseData.articles})
  //   //   this.setState({
  //   //     page: this.state.page+1,
  //   //     loading: false
  //   //   })
  //   // }
  //   // this.setState({ page: this.state.page + 1 });
  //   setPage(page+1)
  //   updateNews();
  // };

  const fetchMoreData = async () =>{
    // this.setState({page: this.state.page + 1});
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    // this.setState({ loading: true });
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(60);
    // this.setState({ articles: this.state.articles.concat(parseData.articles)});
    setArticle(article.concat(parseData.articles))
    setLoading(false)
    settotalArticles(parseData.totalArticles)
    // this.setState({
    //   loading: false,
    //   totalArticles: parseData.totalResults,
    // });
    props.setProgress(100);
  }

    return (
      <>
        <h1 className="text-center" style={{marginTop:'90px'}}>
          Insect-News Top Headlines on {capitalize(props.catagory)}
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length !== totalArticles}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {article.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-5">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevious}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }

News.defualtProps = {
  country: "in",
  pageSize: 8,
  catagory: "general",
};

// News.PropTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// };

export default News;
