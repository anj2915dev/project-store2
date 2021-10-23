const icon = document.querySelector(".icon")
const serch = document.querySelector(".serch")
const btnBsket = document.querySelector(".btn-basket")
const module = document.querySelector(".module")
const section = document.querySelector("section")
const aside = document.querySelector("aside")
const productCenter = document.querySelector(".product-center")
const cartContent = document.querySelector(".cart-content")
const totaleQuntity = document.querySelector(".totale-quantity")
const totalePrice = document.querySelector(".totale-price")
const btnClearAll = document.querySelector(".cliear-all");


// import products in product data
import { products } from "./productDta.js";

// read product
class product {
    readProduct(prd) {
        return prd
    }
}

// basket product
let Cart = [];


let btnDom = [];


// ui product 
class Ui {
    // product in html 
    productDom(pr) {
        let result = ""
        pr.forEach(item => {
            result += `           <div
        class="product h-auto transition ease-in hover:scale-105 transform duration-700  bg-red-50  rounded-lg hover:shadow-xl shadow-md  ">
        <div class="  h-3/6  overflow-hidden rounded-t-lg w-full">
            <img src="${item.imageUrl}" class="w-full h-full" alt="">
        </div>
        <div class=" overflow-hidden rounded-b-lg  ">
            <div class=" h-full flex justify-center items-center    p-4">
                <h4 class=" text-purple-600  text-5xl">
                  ${item.title}

                </h4>
            </div>
            <div class=" h-full  p-4 flex flex-row-reverse justify-center items-center text-4xl font-bold">
                <span class=" m-2">${item.price}</span> <span>تومان</span>
            </div>
            <div class=" h-full flex  justify-center items-center ">
                <button
                    class=" btn-add-cart bg-green-600  hover:bg-purple-500 transition hover:shadow-md ease-in-out   transform  hover:scale-110 p-3  h-full text-center md:text-4xl rounded-lg text-3xl  text-white " data-id=${item.id}>
                    اضافه به سبد خرید
                </button>
            </div>
            <div class="   overflow-hidden  p-5 w-full bg-red-50 ">
                <p class="text-2xl text-center text-gray-700 font-bold flex justify-center items-center">
                    خرید بالای 100 تومن ارسال رایگان دارد
                </p>
            </div>
        </div>


    </div>`
            productCenter.innerHTML = result
        });


    }

    addedInbasket() {
        // read btn-add in product
        const btnAdd = [...document.querySelectorAll(".btn-add-cart")]
        btnDom = btnAdd;
        const btnItem = [...btnDom]
        btnItem.forEach(btn => {

            // read product id
            const id = btn.dataset.id







            btn.addEventListener("click", event => {

                console.log(id)
                event.target.disabled = true;
                event.target.innerText = "ثبت شده"

                const productItem = { ...storage.getProductId(id), quantity: 1 };
                console.log(productItem)
                Cart = [...Cart, productItem]
                storage.setProductCart(Cart);
                this.readCartInBascet(productItem)
                this.setSumPrice(Cart)
                console.log(storage.getcartProduct())

            })
        })


    }
    // read cart in basket
    readCartInBascet(itemCart) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class=" mt-3 flex flex-col rounded-md overflow-hidden  md:flex-row h-auto md:h-60 w-full bg-gray-100 ">
        <!-- image -->
        <div class=" w-full  h-2/3 md:w-1/3 md:h-full  bg-gr  ">
            <img src="${itemCart.imageUrl}" class="w-full h-full  " alt="">
        </div>
        <!-- constent -->
        <div class="md:flex w-full md:w-2/3  h-auto  ">
            <!-- peice and title -->
            <div class=" w-full md:w-1/2 h-full">
                <div class="  h-full flex justify-center items-center  md:h-1/2">
                    <h4>${itemCart.title}</h4>
                </div>
                <div class="  h-1/2  flex justify-center items-center  md:h-1/2">${itemCart.price}</div>
            </div>
            <!-- + and - -->
            <div class=" flex w-full md:w-1/2 h-full justify-between items-center ">
                <!-- + and - -->
                <div class=" flex md:flex-col sm:justify-evenly md:justify-evenly items-center md:w-1/2 justify-around w-2/3 h-full p-2 ">
                    <i
                        class="fas fa-plus bg-green-500 text-white text-center text-4xl p-2 md:p-4 rounded-md  cursor-pointer   transform transition hover:translate-y-1 hover:scale-105" data-id=${itemCart.id}></i>
                    <span class="md:text-5xl text-3xl  ">
                        ${itemCart.quantity}
                    </span>
                    <i class="fa fa-minus bg-red-600 text-white p-2  text-center text-4xl md:p-4 rounded-md  cursor-pointer   transform transition hover:translate-y-1 hover:scale-105" data-id=${itemCart.id}></i>

                </div>
                <!-- diete -->
                <div class=" w-1/3 flex justify-around md:justify-between items-center p-2 ">
                    <i class="fa fa-trash text-red-600 text-4xl md:text-6xl  cursor-pointer   transform transition hover:translate-y-1 hover:scale-105" aria-hidden="true" data-id=${itemCart.id}></i>


                </div>
            </div>
        </div>
    </div>
        `

        cartContent.appendChild(div)

    }
    setSumPrice(Cart) {
        let sum = 0;
        const sumPrice = Cart.reduce((acc, curr) => {
            sum += curr.quantity;
            return acc + curr.quantity * curr.price;

        }, 0)
        totalePrice.innerText = sumPrice;
        totaleQuntity.innerText = sum

    }
    setUp() {
        Cart = storage.getcartProduct() || [];
        Cart.forEach(element => this.readCartInBascet(element));


        this.setSumPrice(Cart)
    }
    cartLigic() {
        btnClearAll.addEventListener("click", () => this.removeDom())
    }
    removeDom() {
        // remove product in cart
        Cart.forEach(citem => this.removeitem(citem.id));
        // remove cart in Dom
        while (cartContent.children.length) {
            cartContent.removeChild(cartContent.children[0])
        }
    }

    removeitem(id) {
        // read product in id
        Cart = Cart.filter(c => c.id !== id);
        // update cart || seaved update
        storage.setProductCart(Cart);
        // update totale price
        this.setSumPrice(Cart);
    }


}

// save product in locale storage

class storage {
    static setproduct(product) {
        return localStorage.setItem("products", JSON.stringify(product))
    }
    static getProductId(id) {
        const _products = JSON.parse(localStorage.getItem("products"))
        return _products.find(p => p.id === parseInt(id))
    }
    // saved product cart
    static setProductCart(cart) {
        return localStorage.setItem("carts", JSON.stringify(cart))
    }
    static getcartProduct() {
        return JSON.parse(localStorage.getItem("carts"))
    }
}




document.addEventListener("DOMContentLoaded", e => {
    const pr = new product();
    const productItem = pr.readProduct(products)
    const ui = new Ui();
    ui.productDom(productItem)
    // saved in local storage
    storage.setproduct(productItem)
    // add product in basket
    ui.addedInbasket()
    ui.setUp();
    ui.cartLigic()
})
// search withe
icon.onclick = function () {
    serch.classList.toggle("activate")
}

// baskt open

btnBsket.addEventListener("click", () => {
    module.style.transform = "translateY(0vh)"
    module.style.opacity = 1;
})
// close basket
section.addEventListener("click", closeBasket)
aside.addEventListener("click", closeBasket)

function closeBasket() {
    module.style.transform = "translateY(-150vh)"
    module.style.opacity = 0;

}



