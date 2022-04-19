import React, { Component } from "react";
import queryImagesApi from '../Api/Api';
import s from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import ErrorPic from "components/Error";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";

class ImageGallery extends Component {
    state = {
        images: [],
        totalHits: '',
        per_page: 12,
        status: 'idele',
        error: '',
        showModal: false,
        imageURL: '',
    }
    apiKey = '25806366-bb151d617166a7ad647d002f5';
    url = 'https://pixabay.com/api/?';
    
    componentDidUpdate(prevProps, prevState) {
        
        const prevName = prevProps.imageName;
        const currentName = this.props.imageName;

        if (prevName !== currentName) {
            this.setState({ status: 'pending', });
            
                fetch(`${this.url}q=${currentName}&page=1&key=${this.apiKey}&image_type=photo&orientation=horizontal&per_page=12`).then(res => {
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
        const {images, status, per_page, showModal, imageURL} = this.state;

        if (status === 'idele') {
            return <div><p></p></div>
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
                {images.length === per_page && <Button onClick={this}/>}
                {showModal && <Modal onClose={this.modalShowClose}>
                    <img src={imageURL} alt="" className=""/>
                </Modal>}
            </>
        };
    }
}

export default ImageGallery;