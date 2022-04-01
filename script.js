const url = 'data/products.json';
const products = document.getElementById('product-list');
let data;
getProducts(url);
async function getProducts(url) {
    const res = await fetch(url);
    data = await res.json();
    showProducts(data);
}

function showProducts(data) {
    for (let product of data) {
        const productCard = `
        <div class="col">
        <div class="card shadow-sm">
            <img id="prdimg" src="${product.image}" alt="">

            <div class="card-body">
                <h2>${product.name}</h2>
                <p class="card-text">${product.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button data-id="${product.id}" id="buy" type="button" class="btn btn-sm btn-danger">Purchase</button>
                    </div>
                    <small class="text-danger">${product.price}</small>
                </div>
            </div>
        </div>
    </div>
        `
        products.insertAdjacentHTML('beforeend', productCard);
    }
    bindEvent();
}

function bindEvent() {
    let cartProducts = data;
    const buyBtns = document.querySelectorAll('#buy');
    let overall = 0;
    if (JSON.parse(localStorage.getItem('cart'))) {
        cartProducts = JSON.parse(localStorage.getItem('cart'));
        for (let ind of cartProducts) {
            overall += ind.quantity;
        }
    } else {
        for (let prd of cartProducts) {
            prd.quantity = 0;
        }
    }
    document.querySelector("#bad").innerText = overall;

    buyBtns.forEach(buyBtn => {
        buyBtn.addEventListener('click', (e) => {
            let id = e.target.dataset.id;
            for (let prd of cartProducts) {
                if (prd.id === id) {
                    prd.quantity++;
                    overall++;
                }
            }
            document.querySelector("#bad").innerText = overall;

            localStorage.setItem('cart', JSON.stringify(cartProducts));
        })
    })
}