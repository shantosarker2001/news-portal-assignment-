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
        <a class="nav-link text-black fs-4 px-3" onclick="loadDetails('${category_id}')" aria-current="page" href="#">${category_name}</a>
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
    details.forEach(detail => {
        // console.log(detail)
        const { author, details, title, total_view, rating, image_url } = detail
        console.log(author, details, title, total_view, rating, image_url)
    })
}
loadCategoris()