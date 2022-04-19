import React, { Component } from "react";
import queryImagesApi from '../Api/Api';
import s from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import ErrorPic from "components/Error";
import Loader from "components/Loader/Loader";

class ImageGallery extends Component {
    state = {
        images: [],
        totalHits: '',
        status: 'idele',
        error: '',
        showModal: false,
        imageURL: '',
    }
    
    componentDidUpdate(prevProps, prevState) {
        const apiKey = '25806366-bb151d617166a7ad647d002f5';
        const prevName = prevProps.imageName;
        const currentName = this.props.imageName;
        if (prevName !== currentName) {
            this.setState({ status: 'pending', });
            setTimeout(() => {
                fetch(`https://pixabay.com/api/?q=${currentName}&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`).then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Something go wrong!`));
                }).then(respObj => {
                    if (respObj.hits.length === 0) {
                        return Promise.reject(new Error(`We can't find ${currentName}!`));
                    }
                    this.setState({ status: 'resolved', images: respObj.hits, totalHits: respObj.totalHits })
                }).catch(error => {
                    this.errorFunc(error);
                    this.setState({ error, status: 'rejected', })
                });
            }, 10000);
            
        }
    }

    modalShowClose = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    }

    extractUrl = (imageURL) => {
        this.setState({ imageURL });
    }

    errorFunc = (error) => {
        toast.error(`${error.message}`);
        return;
    }
// toast.error(error)
    render() {
        const {images, status, error, showModal, imageURL} = this.state;

        if (status === 'idele') {
            return <div></div>
        };

        if (status === 'pending') {
            return <Loader/>;
        };

        if (status === 'rejected') {
            return <ErrorPic />;
        };

        if (status === 'resolved') {
            return <>
                <ul className={s.ImageGallery}>
                {images.map(({ id, webformatURL, tags, largeImageURL,}) => {
                    return (
                        <ImageGalleryItem key={id} webImage={webformatURL} largeImage={largeImageURL} tags={tags} onClick={this.modalShowClose} extract={this.extractUrl}/>
                    );
                })}
                </ul>
                {showModal && <Modal onClose={this.modalShowClose}>
                    <img src={imageURL} alt="" className=""/>
                </Modal>}
            </>
        };
    }
}

export default ImageGallery;