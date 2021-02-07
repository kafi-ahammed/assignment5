const button = document.getElementById('search-button');
const input = document.getElementById('input');
const resultsContainer = document.querySelector('.results');
const popup = document.querySelector('.popup-container');
const cardParent = document.querySelector('.card-parent');
const cardBtn = document.querySelector('.cardButton');
popup.style.display = 'none';
const showResultOnUI = function(name,url,id){
    const html = `<div class="col-sm-6 mb-4 col-md-4 col-lg-3 ">
                    <div class="row m-2 card-parent " >
                        <div class="card" data-id="${id}" style="">
                          <img src="${url}" class="card-img-top" alt="...">
                          <div class="card-body bg-custom-gray">
                            <p class="card-text item-name text-center">${name}</p>
                          </div>
                        </div>
                    </div>
                </div>`;
    resultsContainer.insertAdjacentHTML('beforeend',html);
//    console.log(html);
}

const showError = function(value){
    const html = `<div class="col-12 error-message">
                            <div class=" m-2 ">
                                <div class="card" style="">
                                  <h1 class="card-text display-1 text-center">${value} not found!</h1>
                                  <div class="card-body bg-custom-gray">
                                    <p class="card-text text-center">Try something else!</p>
                                  </div>
                                </div>
                            </div>
                        </div>`;
            resultsContainer.innerHTML = html;
}

const search = function(value){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`).then(res=>res.json()).then(data=>{
        const obj = data.meals;
        if(!obj){
            showError(value);
            return;
        }
//        console.log(obj);
        resultsContainer.innerHTML = '';
        obj.forEach(arr=>{
            const name = arr.strMeal;
            const url = arr.strMealThumb;
            const id = arr.idMeal;
            
            showResultOnUI(name,url,id);
//            console.log(arr.strMeal);
//            console.log(arr.strMealThumb);
        })
    });
}

const temp = function(obj){
    let htmlList = '';
        for(let i=1;i<=20;i++){
            
            const ingNm = `strIngredient${i}`;
            if(!obj[ingNm]){
                
            }else{
//            console.log(ingNm);
//            console.log(obj[ingNm]);
               
            htmlList += `<li class="list-group-item bn">✔ ${obj[ingNm]}</li>`
//            console.log(htmlList);
            }
        }
    return htmlList;
    }
    

const showDetails = function(obj){
    popup.style.display = 'block';
//    console.log(obj);
    const html = `<div class="row ">
                    <div class="card custom-card" style="">
                       <div class="cardButton">X</div>
                      <img src="${obj.strMealThumb}" class="card-img-top" alt="...">
                    </div>
                    <div class="inner-text">
                        <h4 class='title  p-4 text-bold'>${obj.strMeal}</h4>
                        <p class="px-4 text-bold">Ingredients</p>
                        <ul class="list-group my-bg check cw-1">
                            ${temp(obj)}
                        </ul>
                    </div>
                    <div class="ingredients-lists">

                    </div>
                </div>`;
    popup.innerHTML = html;
//    console.log(html);
    
    
}


const findMoreAboutThisItem = function(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res=>res.json()).then(data=>{
        showDetails(data.meals[0]);
    });
}

resultsContainer.addEventListener('click',function(e){
    if(!e.target.closest('.card-parent')) return;
//    console.log(e.target.closest('.card-parent').firstElementChild.dataset.id);
    const id = e.target.closest('.card-parent').firstElementChild.dataset.id;
    findMoreAboutThisItem(id);
})


button.addEventListener('click',function(e){
    e.preventDefault();
    const value = input.value;
    if(!value) return;
//    console.log(value);
    search(value);
    input.value = '';
    
})

popup.addEventListener('click',function(e){
    if(e.target.classList.value !== 'cardButton') return;
    popup.style.display = 'none';
    
})



