const url = 'https://pixabay.com/api/?';
const apiKey = '25806366-bb151d617166a7ad647d002f5';

const queryImagesApi = async searchQuery => {
    const respons = fetch(`${url}${apiKey}&q=${searchQuery}&image_type=photo&pretty=true`);
    console.log(respons);
}

export default queryImagesApi;