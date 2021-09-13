import React from "react";
import axios from "axios";

import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Searchbar from "./components/Searchbar";
import Loader from "./components/Loader";
import Modal from "./components/Modal";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "22710862-ad31ee603fc8e39b27d5b9240";

export default class App extends React.Component {
  state = {
    images: [],
    searchName: "",
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate() {
    const response = await this.fetchImages();
    const images = this.reducingResponseKeys(response);
    if (this.state.images.length === 0) {
      this.setState({ images: images });
      this.incrementDataState();
    }
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  }

  onLoadMoreImages = async () => {
    this.setState({ isLoading: true });
    const response = await this.fetchImages();
    const images = this.reducingResponseKeys(response);
    if (images.length !== 0) {
      this.setState((prevState) => {
        return { images: [...prevState.images, ...images] };
      });
    }
    this.incrementDataState();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  onSubmit = (newSearchName) => {
    this.setState({ isLoading: true });
    this.resetDataState();
    this.updateSearchNameState(newSearchName);
  };

  incrementDataState = () => {
    this.setState((prevState) => {
      return {
        page: (prevState.page += 1),
      };
    });
  };

  resetDataState = () => {
    this.setState({
      images: [],
      searchName: "",
      page: 1,
      bigModalImage: undefined,
    });
  };

  updateSearchNameState = (newSearchName) => {
    this.setState({ searchName: newSearchName });
  };

  fetchImages = async () => {
    try {
      const searchParam = `${this.state.searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`;
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${searchParam}`
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  reducingResponseKeys = (data) => {
    const newArrayImages = data.hits.map((el) => ({
      id: el.id,
      webformatURL: el.webformatURL,
      largeImageURL: el.largeImageURL,
    }));
    return newArrayImages;
  };

  updateStateBigModalImage = () => {
    this.setState({ bigModalImage: undefined });
  };

  findBigModalImage = (smallImage) => {
    const { images } = this.state;
    const bigModalImage = images.find(
      (image) => image.webformatURL === smallImage
    );
    this.setState({ bigModalImage: bigModalImage.largeImageURL });
  };

  onClickImage = (e) => {
    this.findBigModalImage(e.target.src);
  };

  render() {
    return (
      <>
        {this.state.bigModalImage !== undefined && (
          <Modal
            bigModalImage={this.state.bigModalImage}
            hideModal={this.updateStateBigModalImage}
          />
        )}
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          images={this.state.images}
          onClickImage={this.onClickImage}
        />
        {this.state.isLoading && <Loader />}
        {this.state.images.length !== 0 && (
          <Button onClick={this.onLoadMoreImages} />
        )}
      </>
    );
  }
}
