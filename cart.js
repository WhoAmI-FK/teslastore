const productsCart = JSON.parse(localStorage.getItem('cart'));
let overall = 0;
for (let pr of productsCart) {
    overall += pr.quantity;
}
document.querySelector("#bad").innerText = overall;
productsCart.forEach((item, index) => {
    console.log(item);
    if (item.quantity > 0) {
        document.querySelector('tbody').insertAdjacentHTML("beforeend", `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        </tr>
        `)
    }
});
document.querySelector("#cleaner").addEventListener('click', (e) => {
    e.preventDefault();
    for (let it of productsCart) {
        it.quantity = 0;
    }
    document.querySelector("#bad").innerText = 0;

    localStorage.setItem('cart', JSON.stringify(productsCart));
    document.querySelector('tbody').innerHTML = '';
})