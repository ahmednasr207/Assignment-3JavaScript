var siteNameInput = document.getElementById("SiteName");
var siteUrlInput = document.getElementById("SiteURL");
var printContainer = document.getElementById("print");
var deleteLayer = document.getElementById("layer");
var addButton = document.getElementById("btnadd");
var updateButton = document.getElementById("btnUpdate");
var deleteConfirmed=document.getElementById("deleteConfirmed");
var btnadd= document.getElementById("btnadd");
var cancelDelete= document.getElementById("cancelDelete");
var cancelUpdate= document.getElementById("CancelUpdate");
var body = document.getElementById("bodyy");
var Bookmarkk = document.getElementById("Bookmark");
var sunn = document.getElementById("sunn");
var moonn = document.getElementById("moonn");
var uladdres= document.getElementById("uladdres");

var urlList = [];



if (JSON.parse(localStorage.getItem("UrlList")) == null) {
    urlList = [];
} else {
    urlList = JSON.parse(localStorage.getItem("UrlList"));
    displayUrls();
}


btnadd.addEventListener("click", function() {

   if(siteNameInput.value !== "" && siteUrlInput.value!=="" && !urlList.some(urlList=>urlList.name.toLowerCase() === siteNameInput.value.toLowerCase())) {
    var urlItem = {
        name: siteNameInput.value,
        url: siteUrlInput.value,
    };

    urlList.push(urlItem);
    localStorage.setItem("UrlList", JSON.stringify(urlList));
    displayUrls();
    clearInputs();}


})




function displayUrls() {



    var storedUrls = JSON.parse(localStorage.getItem("UrlList"));
    printContainer.innerHTML = "";
    
    for (var i = 0; i < storedUrls.length; i++) {
        printContainer.innerHTML += `
        <ul class="list-unstyled  li-1  d-grid text-center ">
            <li>${i + 1}</li>
            <li class="fw-bold text-break">${storedUrls[i].name}</li>
            <li><a class="btn btn-success" href="${storedUrls[i].url}" target="_blank"><i class="fa-regular fa-eye"></i> Visit</a></li>
            <li><button class="btn delete-btn btn-danger" onclick="confirmDelete(${i})"><i class="fa-solid fa-trash"></i> Delete</button></li>
            <li><button class="btn  btn-primary " onclick="prepareUpdate(${i})"><i class="fa-solid fa-pen-to-square"></i> Update</button></li>
        </ul>
        `;
    
}
}

function clearInputs() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

var currentDeleteIndex;

function confirmDelete(index) {  
    deleteLayer.classList.replace("d-none", "d-flex");
    currentDeleteIndex = index;
}

deleteConfirmed.addEventListener("click", function() {

    deleteLayer.classList.replace("d-flex", "d-none");
    urlList.splice(currentDeleteIndex, 1);
    localStorage.setItem("UrlList", JSON.stringify(urlList));
    displayUrls();

})


cancelDelete.addEventListener("click", function() {


     deleteLayer.classList.replace("d-flex", "d-none");
})



var currentUpdateIndex;

function prepareUpdate(index) {
    updateButton.classList.replace("d-none", "d-flex");
    addButton.classList.add("d-none");
    cancelUpdate.classList.replace("d-none", "d-flex");
    document.querySelectorAll(".delete-btn").forEach(function(btn) {
        btn.disabled = true;
    });

    currentUpdateIndex = index;
    siteNameInput.value = urlList[currentUpdateIndex].name;
    siteUrlInput.value = urlList[currentUpdateIndex].url;
}


updateButton.addEventListener("click", function() {
    cancelUpdate.classList.replace("d-flex", "d-none");
       if(siteNameInput.value !== "" && siteUrlInput.value!=="" ) {

      updateButton.classList.replace("d-flex", "d-none");
    addButton.classList.remove("d-none");
    
    document.querySelectorAll(".delete-btn").forEach(function(btn) {
        btn.disabled = false;
    });

    urlList[currentUpdateIndex].name = siteNameInput.value;
    urlList[currentUpdateIndex].url = siteUrlInput.value;
    
    localStorage.setItem("UrlList", JSON.stringify(urlList));
    displayUrls();
    clearInputs();
}})

cancelUpdate.addEventListener("click",function(){
updateButton.classList.replace("d-flex", "d-none");
    cancelUpdate.classList.replace("d-flex", "d-none");
    addButton.classList.remove("d-none");
      document.querySelectorAll(".delete-btn").forEach(function(btn) {
        btn.disabled = false;
    });
    clearInputs();

})

siteNameInput.addEventListener("input", function(e) {
    var validName = /^[\u0600-\u06FFa-zA-Z]+(?:\s[\u0600-\u06FFa-zA-Z]+)*$/;

    if (validName.test(e.target.value)) {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        btnadd.disabled=false;
        updateButton.disabled=false;
    } else {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
updateButton.disabled=true;
btnadd.disabled=true;
    }
});


siteUrlInput.addEventListener("input", function(e) {
var validURL = /^(https?:\/\/)?([\w\.-]+)\.([a-z]{2,6})(\/[\w\.-]*)*\/?$/i;

    if (validURL.test(e.target.value)) {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        btnadd.disabled=false;
                updateButton.disabled=false;
    } else {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        updateButton.disabled=true;
        btnadd.disabled=true;
    }
});




function darky() {
    if (body.classList.contains("bg-darkk")) {
        body.classList.replace("bg-darkk", "bg-white");
        sunn.classList.add("d-none");
        moonn.classList.remove("d-none");
        Bookmarkk.classList.replace("text-light", "text-dark");
        uladdres.classList.replace("bg-light","bg-dark");
        body.classList.replace("text-dark","text-white");
        printContainer.classList.replace("text-white" ,"text-dark")
cancelUpdate.classList.replace("btn-outline-light","btn-outline-dark");
        console.log(sunn,moonn,Bookmarkk);
    } else {
        body.classList.replace("bg-white", "bg-darkk");
        sunn.classList.remove("d-none");
        moonn.classList.add("d-none");
        Bookmarkk.classList.replace("text-dark", "text-light");
        uladdres.classList.replace("bg-dark","bg-light");
      body.classList.replace("text-white","text-dark");

        printContainer.classList.replace("text-dark" ,"text-white")
cancelUpdate.classList.replace("btn-outline-dark","btn-outline-light");

                console.log(sunn,moonn,Bookmarkk);

    }
}

