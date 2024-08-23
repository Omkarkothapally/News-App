import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  const capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() +string.slice(1);
  } 
  
  const updateNews =async ()=>{
    props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try{
    let data =await fetch(url);
    props.setProgress(70);
    let parsedData =await data.json();
    props.setProgress(70);
    setArticles((prevArticles) => prevArticles.concat(Array.isArray(parsedData.articles) ? parsedData.articles : []));
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }catch{
      console.error('Error fetching news:', error);
      setArticles([]);
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect (()=>{
    updateNews();
  },[]);
    
  const fetchMoreData =async() =>{
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    try{
    let data =await fetch(url);
    let parsedData =await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  } catch{
      console.error('Error fetching more news:', error);
      setArticles((prevArticles) => prevArticles || []);     
  }
  };

    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
       {loading && <Spinner/>}
       <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={articles && articles.length < totalResults}
        loader={<Spinner/>}
       >
        <div className='container'>
          <div className='row'>
            {Array.isArray(articles) && articles.map((element))=>{
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
  country :'in',
  pageSize:8,
  category:"general"
}
News.propTypes ={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News;
