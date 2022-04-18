const url = 'https://pixabay.com/api/?';
const apiKey = '25806366-bb151d617166a7ad647d002f5';

const queryImagesApi = async searchQuery => {
    const respons = fetch(`${url}q=${searchQuery}&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`).then(res => res.json()).then(respObj => this.setState({ images: respObj.hits, totalHits: respObj.totalHits}));
}

export default queryImagesApi;