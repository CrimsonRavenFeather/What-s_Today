import React, { Component } from 'react'
import Newsitem from './Newsitem'
import { parse } from 'postcss';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country: "in",
        pagesize: 9,
        category: "sports"
    }

    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        // console.log("this is a state")
        this.state = {
            loading: true,
            article: [],
            page: 1,
            total: 9,
            totalres: 0
        }
    }

    async componentDidMount() {
        console.log(this.state.page)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=9`
        this.props.setProgress(10)
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedata = await data.json()
        this.props.setProgress(70)
        this.setState({
            article: parsedata.articles,
            totalres: parsedata.totalResults
        })
        this.props.setProgress(100)
    }

    nextnews = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalres / this.state.total)) {

        }

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=9&page=${this.state.page + 1}`

        let data = await fetch(url)
        let parsedata = await data.json()

        this.setState({
            article: parsedata.articles,
            page: this.state.page + 1
        })

        console.log(this.state.page)
    }

    prevnews = async () => {
        if (this.state.page - 1 < 0) {

        }

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=9&page=${this.state.page - 1}`

        let data = await fetch(url)
        let parsedata = await data.json()

        this.setState({
            article: parsedata.articles,
            page: this.state.page - 1
        })

        console.log(this.state.page)
    }

    fetchMoreData = async () => {
        console.log(this.state.page)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=035ae653c79d44638b5690255f31e764&pageSize=9&page=${this.state.page + 1}`

        let data = await fetch(url)
        let parsedata = await data.json()

        this.setState({
            article: this.state.article.concat(parsedata.articles),
            totalres: parsedata.totalResults,
            page: this.state.page + 1
        })
    }

    render() {
        // if (this.state.loading) {
        //     return (<div className="text-center my-4"><div className="spinner-border" role="status"></div></div>)
        // }

        return (
            <div className='container my-3'>
                <h1 className="text-center my-4" style={{paddingTop:'60px'}}>Today's top {this.props.category} headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalres}
                    loader={<div className="text-center my-4"><div className="spinner-border" role="status"></div></div>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.article.map((element) => {
                                return <div className="col-md-4 my-2" key={element.url}>
                                    <Newsitem title={element.title ? element.title.slice(0, 44) : ""} desc={element.description ? element.description.slice(0, 88) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishdate={element.publishedAt.slice(0, 10)} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>



                {/* <div className="container d-flex justify-content-between my-3">
                        <button type="button" disabled={this.state.page - 1 === 0} className="btn btn-primary" onClick={this.prevnews}>&larr; Prev</button>
                        <button type="button" disabled={this.state.page + 1 === Math.ceil(this.state.totalres / this.state.total)} className="btn btn-primary" onClick={this.nextnews}>Next &rarr;</button>
                    </div> */}
            </div>
        )

    }
}
