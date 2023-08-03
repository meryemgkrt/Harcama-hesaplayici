/* HTML dom */
const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.querySelector("#add-btn");
const listArea = document.getElementById("list");
const statusChackbox = document.getElementById("status-check");
const sumInfo = document.getElementById("sum-info");
const deleteBtn = document.getElementById("delete");
const userInput = document.getElementById("user-input");
const select = document.querySelector("select");

//! izlediğiniz olaylar

addBtn.addEventListener("click", addExpense);
listArea.addEventListener("click", handleUpdate);
userInput.addEventListener("input", seveUser);
document.addEventListener("DOMContentLoaded", getUser);
select.addEventListener("change", handleFilter);
// toplamın değerini burada tutacağız
let sum = 0;
function updateSum(price) {
  sum += Number(price);

  // html'dki toplam alanı güncelleme
  sumInfo.innerText = sum;
}
// eventListener ile çalışılan fonksiyonlar
// olay hakkında bilgileri içeren bir parametre gider
function addExpense(event) {
  //sayfayı yenilenmesini engelleme
  event.preventDefault();
  /* alert(nameInput.value + priceInput.value); */

  // imputların biri bile boş ise  alertlerle fonksiyonu durdur
  if (!nameInput.value || !priceInput.value) {
    alert("Lütfen formu doldurunuz");
    return;
  }
  // inputlar dolu ise kart oluşturmak için HTML ye gönder
  // a-div oluşturma
  const expenseDiv = document.createElement("div");

  // b- dive clas ekleme
  expenseDiv.classList.add("expense");

  //Eğerki ödendi checkbox'ına tıklandı ise ödenidi classı ekle

  if (statusChackbox.checked === true) {
    expenseDiv.classList.add("payed");
  }

  //c- içerisinde HTML'i belirleme
  expenseDiv.innerHTML = `
           <h2 class="name">${nameInput.value}</h2>
           <h2 class="price">${priceInput.value}</h2>
          <div class="btns">
            <img id="edit" src="img/pay.png" alt="">
            <img id="delete" src="img/delete.png" alt="">
          </div>
`;

  //d- Oluşan elemanı Html'e gönder
  listArea.appendChild(expenseDiv);

  // Toplam alanı güncelleme

  updateSum(priceInput.value);

  // formu tamizleme
  nameInput.value = "";
  priceInput.value = "";
  statusChackbox.checked = false;
}
// sumun içindekini silme


// Listedeki bir elemana tıklayınca çalışır

function handleUpdate(event) {
  const ele = event.target;
  
//silme resminin kapsayıcısına erişme
  const parent = ele.parentElement.parentElement;

// yanlızca silme işleminde çalışacak kod
  if (ele.id === "delete") {
    
    // Elementi silme
    parent.remove();
    const price = parent.querySelector(".price").textContent;
    updateSum(Number(price) * -1);
    console.log(price);
  }
// Elemanın id'si edit ise onun payed classp varsa çıkar yoksa ekle
if(ele.id === 'edit'){
  parent.classList.toggle('payed')
}

}

// Kullanıcıyı locale kaydetme

function seveUser(event) {
  localStorage.setItem("username", event.target.value);
}

// Kullanıcı localde var ise onu alma

function getUser() {
  const username = localStorage.getItem("userName") || "";

  // Kullanıcı ismini inputa aktar
  userInput.value = username;
}

//Filitreleme kısmı

function handleFilter(event) {
  const selected = event.target.value;
  const items = list.childNodes;

 items.forEach((item) => {
  // selecetd alabileceği değerleri izleme
  switch (selected){
    case 'all':
      // hepsi seçilirse
      item.style.display ='flex';
      
      break;

      case 'payed':
        // yalnızca ödenenler
        if(item.classList.contains('payed')){
          item.style.display ="flex";

        }else{
          item.style.display ="none";
        }
        break;

        case 'not-payed':
          //yalnızca ödenmeyenleri izle
          if(!item.classList.contains('payed')){
            item.style.display = "flex";
          }else{
            item.style.display ="none";
          }
          break;
  }
  
 });
}
