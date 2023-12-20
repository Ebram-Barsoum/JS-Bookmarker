//window.localStorage.removeItem("bookmarks");
let nameInput = document.getElementById('site-name');
let urlInput = document.getElementById('site-URL');
let addBtn = document.getElementById('add-btn');
let content = document.getElementById('items');
let sites = [];

let validName , validURL;
// handling clearing inputs
function clear_inputs() {
  nameInput.value = urlInput.value = "";

  urlInput.classList.remove('is-valid');
  urlInput.classList.remove('is-invalid');

  nameInput.classList.remove('is-valid');
  nameInput.classList.remove('is-invalid');
}
// handling adding sites
function display_sites(list){
  let sz = list.length;
  if (sz == 0) {
    content.innerHTML = ` <div class="msg text-center fs-4">Thre Are No Sites Yet</div>`;
    return;
  }

    let items = '';

    for (let index = 0; index < sz; index++){
        items += `
        <div class="item  col-md-6 col-lg-3  px-2">
        <div class="content  d-flex flex-column gap-2 rounded-3 text-center px-2 pt-3">
          <div class="bookmark-img  fs-1 rounded-circle align-self-center d-flex justify-content-center align-content-center p-4">
            <span class=" translate-middle-y ">${sites[index].name[0]}</span>
          </div>
          <div class="name fs-5">${sites[index].name}</div>
          <div class="actions d-flex justify-content-between align-items-center">
            <a href="${sites[index].URL}" class="fs-4 visit btn border-0" target="blank"><i class="fa-regular fa-eye"></i></a>
            <button class="btn fs-4 border-0 delete-btn" onclick=delete_site(${index})><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
        `;
    }

    content.innerHTML = items;
    
}

addBtn.addEventListener('click', function(){
    
  if (!validName || !validURL) return;

    let site = {
        name: nameInput.value,
        URL: urlInput.value
    }

    sites.push(site);
    window.localStorage.setItem("bookmarks", JSON.stringify(sites));

    display_sites(sites);
    clear_inputs();
});

// handling deleting sites
function delete_site(index) {
  sites.splice(index, 1);
  window.localStorage.setItem("bookmarks", JSON.stringify(sites));
  display_sites(sites);
}

// validating inputs values
let nameRegEx = /^[A-Z][a-zA-Z]{4,9}$/;
let urlRegEx = /^((http){0,1}?(s){0,1}?:\/\/){0,1}(www\.){0,1}?(\w+\.\w{2,5})$/;

function validate_input(input,regEx) {
  if (regEx.test(input.value)) {
    input.classList.add('is-valid');
    return true;
  }

  input.classList.add('is-invalid');
  return false;
}
nameInput.addEventListener('input', function () {
  nameInput.classList.remove('is-valid');
  nameInput.classList.remove('is-invalid');

  validName = validate_input(nameInput, nameRegEx);
});

urlInput.addEventListener('input', function () {
  urlInput.classList.remove('is-valid');
  urlInput.classList.remove('is-invalid');

  validURL = validate_input(urlInput, urlRegEx);
});
//retrieving data from local stroage
function initialize() {
  if (!window.localStorage.getItem("bookmarks")) {
    content.innerHTML = ` <div class="msg text-center fs-4">Thre Are No Sites Yet</div>`;
    return;
    }

    sites = JSON.parse(window.localStorage.getItem("bookmarks"));
    display_sites(sites);
}

initialize();
