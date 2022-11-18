import React from 'react'

const NewsItem=(props)=> {
    let {title,description,imageUrl,newsUrl,author,date} = props;

    return (
      <div className='my-3'>
        <div className="card" style={{width:"18rem"}}>
          <img className="card-img-top" src={imageUrl} alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title} <span class="badge badge-pill badge-success bg-success">New</span></h5>
              <p className="card-text">{description}</p>
              <p classNmae="card-text"><small classNmae="text-muted"> Updated on {new Date(date).toGMTString()} by {!author?"Unknown":author} </small></p>
              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
