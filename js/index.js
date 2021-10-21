const icon = document.querySelector(".icon")
const serch = document.querySelector(".serch")
const btnBsket = document.querySelector(".btn-basket")
const module = document.querySelector(".module")
const section = document.querySelector("section")
const aside = document.querySelector("aside")
const productCenter=document.querySelector(".product-center")


// import products in product data
import { products } from "./productDta.js";

// read product
class product{
readProduct(prd){
return prd
}
}


// ui product 
class Ui{
// product in html 
productDom(pr){
    let result=""
    pr.forEach(item => {
        result+=`           <div
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
                    class=" bg-green-600  hover:bg-purple-500 transition hover:shadow-md ease-in-out   transform  hover:scale-110 p-3  h-full text-center md:text-4xl rounded-lg text-3xl  text-white ">
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
    productCenter.innerHTML=result
    });
}
}




document.addEventListener("DOMContentLoaded",e=>{
    const pr=new product();
   const productItem=pr.readProduct(products)
   const ui=new Ui();
   ui.productDom(productItem)
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
section.addEventListener("click",closeBasket )
aside.addEventListener("click",closeBasket)

function closeBasket(){
    module.style.transform = "translateY(-150vh)"
    module.style.opacity = 0;

}



