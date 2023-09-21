const card_container=document.getElementById("card_cont");
let test;
const main_load=async()=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const category_data=await res.json();
    const categories=category_data.data;
    display_button(categories);
    // console.log(categories);
    // console.log(categories[0].category_id);
    const alldata=await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
    const card_data=await alldata.json();
    const cards=card_data.data;
    console.log(cards);
    card_container.textContent='';
    test=1000;
    add_card(cards,false);
}

const display_button=(categories)=>{
// cat =categories;
// console.log(categories);
    const button_div=document.getElementById("button");
    categories.forEach(
        category=>{
            const new_button=document.createElement("button");
            
            new_button.innerHTML=
            `
            <h3 class="text-base font-medium">  ${category.category}</h3>
            `
            new_button.classList.add("btn","hover:bg-primary", "hover:text-white");
            const id=category.category;
            new_button.id=id;
            new_button.onclick = async()=>{
                loader(true);
                test=category.category_id;
                const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${category.category_id}`)
                const card_data=await res.json();
                const cards=card_data.data;
                console.log(cards);
                card_container.textContent='';
                add_card(cards,false);
            };
            button_div.appendChild(new_button);
        }
    )
}

const sortview=async()=>{
console.log(test);
loader(true);
// test=category.category_id;
const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${test}`)
const card_data=await res.json();
const cards=card_data.data;
console.log(cards);
card_container.textContent='';
add_card(cards,true);

}

let original, hour, rest_sec1, min, sec;
const add_card=(cards,issort)=>
{
    const len=cards.length;
    if(issort){
        cards.sort((a, b) => (parseFloat(a.others.views)*1000 < parseFloat(b.others.views)*1000) ? 1 :-1)
    }
    
    if(len>0){
        cards.forEach(
            
            card=>{
                console.log(card);
                original=parseInt(card.others.posted_date);
                hour=parseInt(original/3600);
                rest_sec1=parseInt(original-(hour*3600));
                min=parseInt(rest_sec1/60);
                sec=parseInt(rest_sec1-(min*60));
                
                const new_card=document.createElement('div');

                if(card.authors[0].verified){
                    new_card.innerHTML=`
                    <figure><img src=${card.thumbnail} alt="videos!" class="h-[200px] rounded-lg"/></figure>
                    
                    <div class="card-body px-1">
                    <div class="flex gap-3">
    
                    <div class="avatar">
                    <div class="w-10 h-10 rounded-full">
                      <img src=${card.authors[0].profile_picture}/>
                    </div>
    
                  </div>
                        
                  <div>
                        <h2 class="card-title">${card.title}</h2> 
                        <div class="flex ">
                        <p class="flex-grow-0 mr-4">
                            ${card.authors[0].profile_name} 
                           
                        </p>
                        <img src="./images/check.png" width="20" class="rounded-full text-base"/> 
                        </div>
                        <p>${card.others.views} views</p>
                    </div>
    
                    </div>
                        
                      </div>
                
                `
                }
                else{
                    new_card.innerHTML= `
                     <figure><img src=${card.thumbnail} alt="videos!" class="h-[200px] rounded-lg"/></figure>
            
                    <div class="card-body px-1">
                    <div class="flex gap-3">
    
                    <div class="avatar">
                    <div class="w-10 h-10 rounded-full">
                      <img src=${card.authors[0].profile_picture}/>
                    </div>
    
                  </div>
                        
                  <div>
                        <h2 class="card-title">${card.title}</h2> 
                        
                        <p>
                            ${card.authors[0].profile_name} 
                           
                        </p>
                       
                        <p>${card.others.views} views</p>
                    </div>
    
                    </div>
                        
                      </div>
                
            `
            
                }
                
                // <div id="time" class="absolute right-3 top-36 bg-black  text-white p-2 rounded-lg">
                
                // <p>
                //     ${hour} hrs ${min} min ${sec} sec ago
                // </p> 

                // </div>
            if(card.others.posted_date){
            const divv=document.createElement('div');
            divv.innerHTML=`
            <p>
                     ${hour} hrs ${min} min ${sec} sec ago
                 </p> 

            `
            divv.classList.add("absolute", "right-3","top-36", "bg-black",  "text-white", "p-2", "rounded-lg");
            new_card.appendChild(divv);
            }
            new_card.classList.add("card", "w-72","relative");
            card_container.classList.add( "grid", "grid-cols-1", "md:grid-cols-2" ,"lg:grid-cols-4" );
            card_container.classList.remove( "h-[50vh]","flex","flex-col","items-center");
             card_container.appendChild(new_card);
            
            }
    
        )
    }
    else{
        card_container.innerHTML=
        `
        <figure >
        <img src="./images/Icon.png" alt="videos!" class="h-[200px]"/>
        </figure>

        <p class="text-4xl font-bold">Oops!! Sorry, There is no content here</p>
          
        `
       card_container.classList.remove( "grid", "grid-cols-1", "md:grid-cols-2" ,"lg:grid-cols-4" );
        card_container.classList.add( "h-[50vh]","flex","flex-col","items-center");
       
    }
    
    loader(false)
}


const loader=isloading=>{
    const loaderid=document.getElementById("spin");
    if(isloading){
        loaderid.classList.remove("hidden");
    }
    else{
        loaderid.classList.add("hidden");
    }
}

const sort_view=()=>{

}
main_load();
// card_load();
