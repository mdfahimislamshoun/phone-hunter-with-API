
const lodePhone = async (searchResult,isShowAll) => {
  const res = await fetch(
`https://openapi.programming-hero.com/api/phones?search=${searchResult}`
  );
  const phone = await res.json();
  phonesData = phone.data;
  // console.log(phonesData);
  displayPhone(phonesData,isShowAll);
};


const displayPhone = (phonesData,isShowAll) => {
//   console.log(phonesData);
const phoneContainer=document.getElementById("phone-container");
phoneContainer.textContent='';

// hide or show show all button
const showAllButton=document.getElementById("show_all_button");
if(phonesData.length>9 && !isShowAll){
    showAllButton.classList.remove("hidden")
}else{
showAllButton.classList.add("hidden")
}
// hide some phone
if(!isShowAll){
    phonesData=phonesData.slice(0,9);
}



  phonesData.forEach((phoneData) => {
// console.log(phoneData);
    // create a div for phone card
    const phoneCard = document.createElement("div");
    // add class list
    phoneCard.classList = `card w-72 bg-slate-100 text-center  p-5 shadow-2xl`;
    // add inner html
    phoneCard.innerHTML = `
        <figure><img src="${phoneData.image}" alt="phone" /></figure>
        <div class="card-body">
         <h2 class="text-center text-black text-2xl font-semibold">${phoneData.phone_name}</h2>
         <p class=" text-lg text-black font-medium text-center ">${phoneData.slug}</p>
         <div class="card-actions justify-center">
         <button onclick="showDetails('${phoneData.slug}')" class="btn bg-[#0D6EFD] hover:bg-[#357fef] text-white text-base border rounded-lg px-5 py-2">Show Details</button>
         </div>
        </div>
        `;
        // add or appendChild on phoneContainer
        phoneContainer.appendChild(phoneCard);
  });
  toggleLoading(false);
};

const showDetails=async (id)=>{
    // console.log(id );
     // load single phone data
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
     const singleData = await res.json();
     const singlePhoneData=singleData.data;
    //  console.log(singleData);
     showPhoneDetails(singlePhoneData);
 }

//  display the details modal
const showPhoneDetails=(singlePhone)=>{
console.log(singlePhone);
const phoneDetails=document.getElementById("phone-details");
phoneDetails.innerHTML=`
<img class=" text-center" src="${singlePhone.image
}" alt="phone image" />
<h3>${singlePhone.name} </h3>
<p>${singlePhone.slug}</P>
<p>${singlePhone.releaseDate
}</P>
`
    details.showModal();
}




const searchPhone=(isShowAll)=>{
const searchPhoneByName=document.getElementById("search-phone-name");
toggleLoading(true);
searchResult=searchPhoneByName.value;
lodePhone(searchResult,isShowAll);
}


const toggleLoading=(isLoading)=>{
  const loading=document.getElementById("load");
if(isLoading){
    loading.classList.remove("hidden")
}else{
    loading.classList.add("hidden")
}
}

// display all phone
const displayAll=()=>{
    searchPhone(true);
}

lodePhone();
