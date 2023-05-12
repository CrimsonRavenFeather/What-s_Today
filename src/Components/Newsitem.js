import React, { Component } from 'react'

export default class Newsitem extends Component {
    render() {
        let {title,desc,imgUrl,newsUrl,author,publishdate}=this.props
        return (
            <div>
                <div className="card">
                    <img src={imgUrl?imgUrl:"https://www.shutterstock.com/image-photo/business-newspaper-on-wooden-desk-260nw-1444944959.jpg"} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{desc}</p>
                        <p className='text-secondary'>Published at {publishdate?Date(publishdate).slice(0,15):"..."}</p>
                        <div className="d-flex justify-content-between">
                        <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-primary">Know more</a>
                        <p className='text-secondary'>By {author?author:"unknown"}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
