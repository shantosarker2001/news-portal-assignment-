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
        console.log(category_id, category_name)
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
        .then(data => console.log(data))
}
loadCategoris()