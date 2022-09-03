const loadCategoris = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    // const url = `https://openapi.programming-hero.com/api/news/${search}`

    fetch(url)
        .then(res => res.json())
        .then(category => displayCategories(category.data.news_category))
        .catch(error => console.log(error))
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
        <a class="nav-link active text-black fs-4 px-3" onclick="loadDetails('${category_id}','${category_name}')" aria-current="page" href="#">${category_name}</a>
        `;
        catContainer.appendChild(li)
    });
}

const loadDetails = (id, name) => {
    toggleSpinners(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    // const container = document.getElementById('conter')
    // container.classList.remove('d-none')
    // const sortBy = document.getElementById('sortBy')
    // sortBy.classList.remove('d-none')
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data, name))
        .catch(error => console.log(error))

}

const displayDetails = (details, name) => {
    console.log(details)
    const sortBy = document.getElementById('sortBy')
    const counter = document.getElementById("conter")

    if (details.length === 0) {
        counter.classList.add("bg-light")
        sortBy.classList.add("d-none")
        counter.innerHTML = `<h3 class=" py-2 px-3">No Data Found</h3>`

    }
    else {
        sortBy.classList.remove("d-none")
        counter.classList.add("bg-light")
        counter.innerHTML = `<h3 class=" py-2 px-3">${details.length} items founds for ${name}</h3>`
    }
    // const viewContainer = document.getElementById('viewSection')
    // viewSection.innerHTML = `https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    // <div></div>
    // `

    const postContainer = document.getElementById('post_container');
    byView(details);
    postContainer.textContent = ""
    details.forEach((detail) => {

        const { author, details, title, rating, image_url, _id, thumbnail_url } = detail
        const div = document.createElement("div")
        div.classList.add("card", "mb-3")
        div.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title} </h5>
                <p class="card-text">${details.slice(0, 250)}...</p>
                <div class="card-text d-flex gap-5">
                    <div class="author d-flex">
                        <div><img class="me-2" src="${author.img}" alt=""  style="height: 54px; width: 54px;border-radius: 50%"></div>
                        <div>
                            <h5>${author.name ? author.name : "No data found"}</h5>
                            <p>${author.published_date ? author.published_date : "No data found"}</p>
                        </div>
                    </div>
              
                    <div class="rating  my-auto fw-semibold fs-4">${rating.number}</div>
                    <div class="rating  my-auto fw-semibold fs-4"><i class="bi bi-eye text-black me-3"></i>${detail.total_view ? detail.total_view : "No data Found"
            }</div >
        <button onclick="seeDetails('${_id}')" class="btn btn-light px-4  mx-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                </div >
            </div >
        </div >
    </div > `;

        postContainer.appendChild(div)
    });

    // byDefault(details);
    toggleSpinners(false)
}

const seeDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
        .then(res => res.json())
        .then(details => showModal(details.data[0]))
        .catch(error => console.log(error))
}
const showModal = data => {
    console.log(data)
    const { image_url, thumbnail_url, total_view, author, rating, title } = data
    document.getElementById("exampleModalLabel").innerHTML = `<h3>${title}</h3>`;
    document.getElementById("body").innerHTML = `
    <img src="${image_url}" class="w-100"  alt="">
   <div>
   <h5>Review: ${rating.badge}</h5>
   <h5>Total view: ${total_view}</h5>
   <h5>Published on ${author.published_date}</h5></div>
    `

}
loadCategoris()

const toggleSpinners = isloading => {
    const loaderSection = document.getElementById("loader")
    if (isloading) {
        loaderSection.classList.remove("d-none")
    }
    else {
        loaderSection.classList.add("d-none")
    }
}
// view_section

const byView = (detail) => {
    // console.log(detail)

    detail.sort((a, b) => b.total_view - a.total_view)
    return
}
