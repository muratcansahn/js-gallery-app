let photos = [];
const fetchImages = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=50"
    );
    photos = await response.json();
    displayPhotos(photos);
  } catch (error) {
    console.log(error);
  }
};
fetchImages();
const search = document.querySelector(".searchWrapper");
search.addEventListener("keyup", (e) => {
  const searchValue = e.target.value;
  const filteredPhotos = photos.filter((photo) => {
    return photo.title.toLowerCase().includes(searchValue.toLowerCase());
  });
  //   console.log(filteredPhotos);

  //   console.log(e.target.value);
  displayPhotos(filteredPhotos);
});
const displayPhotos = (data = []) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  data.forEach((photo) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("galleryItem");
    galleryItem.innerHTML = `
        <img src=${photo.thumbnailUrl} alt=${photo.title} />
        <button onclick=deletePhoto(${photo.id})>Delete Photo</button>
        `;
    gallery.appendChild(galleryItem);
  });
};
const deletePhoto = (id) => {
  console.log(confirm);
  if (confirm("Are you sure you want to delete this photo?") == true) {
    const newPhotos = photos.filter((photo) => photo.id !== id);
    photos = newPhotos;
    displayPhotos(newPhotos);
  }
};

addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", () => {
  title = document.querySelector("#title");
  url = document.querySelector("#url");
  const form = document.getElementById("form");

  const newPhoto = {
    id: Date.now(),
    title: title.value,
    thumbnailUrl: url.value,
  };
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
    photos.push(newPhoto);
  }

  displayPhotos(photos);
});
