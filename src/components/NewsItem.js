import React from "react";
import Button from "./Button";
const NewsItem =(props)=> {
    const [isHidden, setIsHidden] = useState(false);
    let { title, description, imageUrl, newsUrl, author, date,source } = props;

    if (isHidden) return null;
    return (
      <div className="my-3">
        <div className="card">
          <div style={
            { display:'flex',
              justifyContent:'flex-end',
              position:'absolute',
              right:'0'
             }
          }>
        <span className="badge rounded-pill bg-danger">
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
            </div>
            <img
  src={
    !imageUrl
      ? "https://img.etimg.com/thumb/msid-108326970,width-1200,height-630,imgsize-52706,overlay-economictimes/photo.jpg" // Fallback URL
      : imageUrl
  }
  className="card-img-top"
  alt="..."
/>
          
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description} ...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-dark">
              Read More
            </a>
                  <div className="mt-2">
            <Button onClick={() => setIsHidden(true)} />
          </div>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;
