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
  

  const updateNews=async()=>{
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticle(parseData.articles);
    setLoading(false)
    settotalArticles(parseData.totalArticles)
    props.setProgress(100)
  }

  const fetchMoreData = async () =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(60);
    setArticle(article.concat(parseData.articles))
    setLoading(false)
    settotalArticles(parseData.totalArticles)
    props.setProgress(100);
  }

    return (
      <>
        <h1 className="text-center" style={{marginTop:'90px'}}>
          Insect-News Top Headlines on {capitalize(props.catagory)}
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={article && article.length}
          next={fetchMoreData}
          hasMore={article && article.length !== totalArticles}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {article && article.map((element) => {
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
      </>
    );
  }

News.defualtProps = {
  country: "in",
  pageSize: 8,
  catagory: "general",
};

export default News;
