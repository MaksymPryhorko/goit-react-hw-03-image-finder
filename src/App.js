import React from "react";

import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Searchbar from "./components/Searchbar";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import FetchApi from "./services/";

export default class App extends React.Component {
  state = {
    images: [],
    searchName: "",
    page: 1,
    isLoading: false,
    bigModalImage: "",
    showModal: false,
  };

  async componentDidUpdate() {
    if (this.state.images.length === 0) {
      const images = await FetchApi(this.state);
      this.setState({ images: images });
      this.incrementPage();
    }

    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  }

  onLoadMoreImages = async () => {
    this.setState({ isLoading: true });
    const images = await FetchApi(this.state);

    if (images.length !== 0) {
      this.setState((prevState) => {
        return { images: [...prevState.images, ...images] };
      });
    }

    this.incrementPage();

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  onSubmit = async (newSearchName) => {
    this.setState({ isLoading: true });
    this.resetDataState();
    this.updateSearchNameState(newSearchName);
  };

  incrementPage = () => {
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
    });
  };

  updateSearchNameState = (newSearchName) => {
    this.setState({ searchName: newSearchName });
  };

  findBigModalImage = (smallImage) => {
    const { images } = this.state;
    const bigModalImage = images.find(
      (image) => image.webformatURL === smallImage
    );
    return bigModalImage.largeImageURL;
  };

  onClickImage = (e) => {
    const bigModalImage = this.findBigModalImage(e.target.src);
    this.setState({ bigModalImage: bigModalImage });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <>
        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={this.state.bigModalImage} alt="Not found." />
          </Modal>
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
