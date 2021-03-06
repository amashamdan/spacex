import React, { Component } from "React";
import "./App.css";
import Cards from "../Cards/Cards";
import Video from "../Video/Video";
import Spinner from "../Spinner/Spinner";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Paginator from "../Paginator/Paginator";
import Controls from "../Controls/Controls";
import { getLaunches } from "../../graphql/requests";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            dataLength: 0,
            selectedVideo: null,
            paginationSizes: [5, 10, 20],
            paginationSize: 10,
            page: 1
        }
        this.setSelectedVideo = this.setSelectedVideo.bind(this);
        this.updatePageNumber = this.updatePageNumber.bind(this);
        this.updatePaginationSize = this.updatePaginationSize.bind(this);
    }

    componentDidMount() {
        const { paginationSize, page } = this.state;

        getLaunches(paginationSize, page).then((result) => {
            let a = [...result.data.data.launches]
            this.setState({
                data: a.sort((a, b) => {
                    return new Date(a.launch_date_local).getTime() - new Date(b.launch_date_local).getTime();
                }),
                dataLength: result.data.data.launches.length
            })
        }).catch((error) => {
            this.setState({ data: "ERROR" });
        })
    }

    render() {
        const { data, selectedVideo, paginationSize, page, dataLength, paginationSizes } = this.state;

        let content;

        if (!data) {
            content = <Spinner />;
        } else if (data === "ERROR") {
            content = <p>ERROR</p>;
        } else {
            const shownData = this.getShownData(data, paginationSize, page);
            content = <div className="content-container">
                <Controls paginationSize={paginationSize} updatePaginationSize={this.updatePaginationSize} paginationSizes={paginationSizes} />
                <div className="level video-cards-container">
                    <Cards data={shownData} selectedVideo={selectedVideo} setSelectedVideo={this.setSelectedVideo} />
                    <Video selectedVideo={selectedVideo} setSelectedVideo={this.setSelectedVideo} />
                </div>
                <Paginator paginationSize={paginationSize} page={page}  updatePageNumber={this.updatePageNumber} dataLength={dataLength} />
            </div>;
        }

        return <div>
            <Header />
            <div className="app-content">
                {content}
            </div>
            <Footer />
        </div>
    }

    getShownData(data, paginationSize, page) {
        const startIndex = (page - 1) * paginationSize;
        const endIndex = Math.min(page * paginationSize, data.length);

        return data.slice(startIndex, endIndex);
    }

    setSelectedVideo(selectedVideo) {
        this.setState({ selectedVideo });
    }

    updatePageNumber(newPageNumber) {
        this.setState({ page: newPageNumber });
    }

    updatePaginationSize(size) {
        this.setState({ paginationSize: size, page: 1 });
    }
}