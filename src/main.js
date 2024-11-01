import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchData } from './js/pixabay-api';
import { createGallery } from './js/render-functions'

const form = document.querySelector(".input-forme");
const container = document.querySelector(".gallery");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const userInput = document.querySelector('#input-user').value.trim();

    if (userInput === '') {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term.',
        });
        return;
    }

    fetchData(userInput.toLowerCase())
        .then(data => {
            console.log('API Response:', data);
            if (!data.totalHits > 0) {
                iziToast.info({
                    title: 'No Results',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
            } else {
                container.insertAdjacentHTML("beforeend", createGallery(data.hits));
            }
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: 'Error fetching data',
            });
            console.error('Error fetching data:', error);
        });
}
