const loadCategoris = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(category => displayCategories(category.data.news_category))
}
const displayCategories = category => {
    // console.log(category)
    const catContainer = document.getElementById("list_container")
    category.forEach(data => {
        // console.log(data)
        const { category_id, category_name } = data
        // console.log(category_id, category_name)
        const li = document.createElement('li')
        li.classList.add("nav-item")
        li.innerHTML = `
        <a class="nav-link active text-black fs-4 px-3" onclick="loadDetails('${category_id}')" aria-current="page" href="#">${category_name}</a>
        `;
        catContainer.appendChild(li)
    });
}
const loadDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}
const displayDetails = (details) => {
    // console.log(details)
    const postContainer = document.getElementById('post_container');
    postContainer.textContent = ""
    details.forEach(detail => {
        // console.log(detail)
        // if (detail == "null") {
        //     const errorMessage = document.getElementById("error");
        //     errorMessage.classList.remove("d-none")
        //     return;
        // }
        const { author, details, title, total_view, rating, image_url, _id } = detail
        // console.log(author, details, title, total_view, rating, image_url)
        const div = document.createElement("div")
        div.classList.add("card", "mb-3")
        div.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.slice(0, 250)}...</p>
                <div class="card-text d-flex gap-5">
                    <div class="author d-flex">
                        <div><img class="me-2" src="${author.img}" alt=""  style="height: 54px; width: 54px;border-radius: 50%"></div>
                        <div>
                            <h5>${author.name}</h5>
                            <p>${author.published_date}</p>
                        </div>
                    </div>
              
                    <div class="rating  my-auto fw-semibold fs-4">${rating.number}</div>
                    <button onclick="seeDetails('${_id}')" class="btn btn-light px-4  ms-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                </div>
            </div>
        </div>
    </div>`;
        postContainer.appendChild(div)
    })
}

const seeDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
        .then(res => res.json())
        .then(details => showModal(details.data[0]))
}
const showModal = data => {
    console.log(data)
    const { thumbnail_url, total_view, author, rating, title } = data
    document.getElementById("exampleModalLabel").innerHTML = `<h3>${title}</h3>`;
    document.getElementById("body").innerHTML = `
    <img src="${thumbnail_url}" class="w-100"  alt="">
   <div>
   <h5>Review: ${rating.badge}</h5>
   <h5>Total view: ${total_view}</h5>
   <h5>Published on ${author.published_date}</h5></div>
    `

}
loadCategoris()