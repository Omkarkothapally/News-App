import React, {useEffect,useState,useCallback} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  const capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() +string.slice(1);
  } 
  
  const updateNews =async ()=>{
    props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7a945ea2b7534bda88b3b051691b6e7b&page=${page}&pageSize=${props.pageSize}`;
    console.log(url);
    console.log(Response);
    setLoading(true);
    let data =await fetch(url);
    props.setProgress(70);
    let parsedData =await data.json();
    props.setProgress(70);
    setArticles(Array.isArray(parsedData.articles) ? parsedData.articles : [])
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false)
    props.setProgress(100);
    console.log(parsedData);
  };

  useEffect (()=>{
    updateNews();
  },[]);
    
  const fetchMoreData =async() =>{
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7a945ea2b7534bda88b3b051691b6e7b&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    console.log(url);
    try{
    let data =await fetch(url);
    let parsedData =await data.json();
    setArticles((prevArticles) => prevArticles.concat(Array.isArray(parsedData.articles) ? parsedData.articles : []));
    setTotalResults(parsedData.totalResults);
    }catch (error) {
      console.error('Error fetching more news:', error);
    }

  };
  


    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
       {loading && <Spinner/>}
       <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner/>}
       >

        <div className='container'>
          <div className='row'>
            {Array.isArray(articles) && articles.map((element)=>{
                return<div className='col-md-4 my-3' key={element.url}>
               <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
           })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
}
News.defaultProps ={
  country :'In',
  pageSize:8,
  category:"general"
}
News.propTypes ={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.oneOf(['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'])
}

export default News;

