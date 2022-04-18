import React, { Component } from "react";
import ImageGalleryItem from '../ImageGalleryItem';
import queryImagesApi from '../Api/Api';

class ImageGallery extends Component {
    state = {
        images: [],
        totalHits: '',
        status: 'idele'
    }
    // pending  //  error  //  resolve
    
    componentDidUpdate(prevProps, prevState) {
        const apiKey = '25806366-bb151d617166a7ad647d002f5';
        const prevName = prevProps.imageName;
        const currentName = this.props.imageName;
        if (prevName !== currentName) {
            fetch(`https://pixabay.com/api/?q=${currentName}&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`).then(res => res.json()).then(respObj => this.setState({ images: respObj.hits, totalHits: respObj.totalHits}));
        }
    }

    render() {
        // queryImagesApi(this.props.imageName);
        // const imageArray = respons.hits;
        const arr = this.state.images;
        return <div>
            {arr && <p>{arr[0].tags}</p>}
            </div>
        
            
                
                /* {imageArray.map(({id, webformatURL, largeImageURL, tags,}) => {
                    return (
                        <ImageGalleryItem id={id} webImage={webformatURL} tags={tags} />
                        // <Modal />
                        // <Button />
                )
            })} */
            
        
    }
}

export default ImageGallery;