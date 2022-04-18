import React, { Component } from "react";
import queryImagesApi from '../Api/Api';
import s from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';


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
            
            fetch(`https://pixabay.com/api/?q=${currentName}&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`).then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`картинок по запросу ${currentName} нет!`));
            }).then(respObj => this.setState({status: 'resolved', images: respObj.hits, totalHits: respObj.totalHits })).catch(error => this.setState({ error, status: 'rejected', }));
        }
    }

    modalShow = (imageURL) => {
        this.setState(({ showModal }) => ({
            showModal: !showModal, imageURL: imageURL,
        }))
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
            return <p>Загружаем картинки...</p>;
        };

        if (status === 'rejected') {
            return <h2>{error.message}</h2>;
        };

        if (status === 'resolved') {
            return <>
                <ul className={s.ImageGallery}>
                {images.map(({ id, webformatURL, tags, largeImageURL,}) => {
                    return (
                        <ImageGalleryItem key={id} webImage={webformatURL} largeImage={largeImageURL} tags={tags} onClick={this.modalShow} />
                    );
                })}
                </ul>
                {showModal && <Modal>
                    <img src={imageURL} alt="" className=""/>
                </Modal>}
            </>
        };
    }
}

export default ImageGallery;