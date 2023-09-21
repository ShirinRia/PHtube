const card_container=document.getElementById("card_cont");

const main_load=async()=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const category_data=await res.json();
    const categories=category_data.data;
    display_button(categories);
    // console.log(categories);
    // console.log(categories[0].category_id);
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
                const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${category.category_id}`)
                const card_data=await res.json();
                const cards=card_data.data;
                console.log(cards);
                card_container.textContent='';
                add_card(cards);
            };
            button_div.appendChild(new_button);
        }
    )
}



const add_card=(cards)=>
{
    const len=cards.length;
    
    cards.sort((a, b) => (parseFloat(a.others.views)*1000 < parseFloat(b.others.views)*1000) ? 1 :-1)
    if(len>0){
        cards.forEach(
            
            card=>{
                // const c=parseFloat(card.others.views)*1000;
                // console.log(c);
                // card_container.textContent='';
                
                const new_card=document.createElement('div');
            new_card.innerHTML=
            `
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
                        <p>${card.authors[0].profile_name}</p>
                        <p>${card.others.views} views</p>
                    
                    </div>
    
                    </div>
                        
                      </div>
                
            `
            new_card.classList.add("card", "w-72");
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
