let menus = {
    makanan: [
        {nama:"Nasi Goreng", harga:13000, img:"nasi goreng.jpg"},
        {nama:"Mie Goreng", harga:13000, img:"mie goreng.jpg"},
        {nama:"Nasi Telur Pontianak", harga:13000, img:"telur pontianak.jpg"},
        {nama:"Chicken Katsu Curry", harga:15000, img:"katsu curry.jpg"},
        {nama:"Beef Satay", harga:20000, img:"sate daging.jpg"},
        {nama:"Sate Ayam", harga:18000, img:"sate ayam.jpg"}
    ],
    minuman: [
        {nama:"Ice Tea", harga:5000, img:"ice tea.jpg"},
        {nama:"Orange Juice", harga:7000, img:"orange juice.jpg"},
        {nama:"Lemon Tea", harga:7000, img:"lemon tea.jpg"},
        {nama:"Iced Americano", harga:12000, img:"iced americano.jpg"},
        {nama:"Ice Coffee Aren", harga:15000, img:"aren.jpg"},
        {nama:"Hazelnut Latte", harga:15000, img:"hazelnut.jpg"}
    ],
    snack: [
        {nama:"Onion Rings", harga:12000, img:"onion rings.jpg"},
        {nama:"Mix Platter", harga:16000, img:"mix.jpg"},
        {nama:"Kentang Goreng", harga:12000, img:"kentang.jpg"},
        {nama:"Caramel Cheesecake", harga:16000, img:"ciskek.jpg"},
        {nama:"Mango Puding", harga:13000, img:"mango puding.jpg"},
        {nama:"Ice Cream", harga:13000, img:"eskrim.jpg"}
    ]
};

let cart = [];
let total = 0;
let dataKeuangan = [];
let nomor = 1;

/* navigasi */
function showPage(id){
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    if(id === "keuangan"){
        renderKeuangan(); // 🔥 refresh data saat buka halaman
    }
}

function back(){
    showPage("home");
}

/* tampil menu */
function showMenu(kategori){
    let list = document.getElementById("menuList");
    list.innerHTML = "";

    menus[kategori].forEach(item=>{
        let div = document.createElement("div");
        div.className = "menu-item";

        div.innerHTML = `
            <img src="${item.img}">
            <p><b>${item.nama}</b></p>
            <p>Rp ${item.harga}</p>
        `;

        div.onclick = ()=> tambahCart(item);
        list.appendChild(div);
    });
}

/* tambah cart + qty */
function tambahCart(item){
    let existing = cart.find(i => i.nama === item.nama);

    if(existing){
        existing.qty++;
    } else {
        cart.push({...item, qty:1});
    }

    renderCart();
}

/* render cart */
function renderCart(){
    let list = document.getElementById("cart");
    list.innerHTML = "";
    total = 0;

    cart.forEach((i,index)=>{
        let subtotal = i.harga * i.qty;
        total += subtotal;

        let li = document.createElement("li");

        li.innerHTML = `
            ${i.nama} <br>
            <button onclick="kurangQty(${index})">➖</button>
            ${i.qty}
            <button onclick="tambahQty(${index})">➕</button>
            = Rp ${subtotal}
        `;

        list.appendChild(li);
    });

    document.getElementById("total").innerText = "total: Rp " + total;
}

/* qty */
function tambahQty(index){
    cart[index].qty++;
    renderCart();
}

function kurangQty(index){
    cart[index].qty--;

    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }

    renderCart();
}

/* pembayaran */
function prosesCash(){
    let uang = prompt("masukkan uang:");
    let kembali = uang - total;
    selesai("cash", kembali);
}

function prosesQR(){
    alert("QRIS: 08123456789");
    selesai("qr", 0);
}

/* 🔥 selesai + masuk ke keuangan */
function selesai(metode,kembalian){

    dataKeuangan.push({
        no: nomor,
        total: total,
        metode: metode
    });

    nomor++;

    let isi = "";
    cart.forEach(i=>{
        isi += `<p>${i.nama} x${i.qty} = Rp ${i.harga * i.qty}</p>`;
    });

    document.getElementById("isiStruk").innerHTML = `
        ${isi}
        <hr>
        <p>total: Rp ${total}</p>
        <p>metode: ${metode}</p>
        ${metode=="cash" ? "<p>kembalian: Rp "+kembalian+"</p>" : ""}
    `;

    showPage("struk");

    cart = [];
    total = 0;
    renderCart();
}

/* 🔥 tampilkan keuangan */
function renderKeuangan(){
    let tbody = document.getElementById("dataKeuangan");
    tbody.innerHTML = "";

    dataKeuangan.forEach(d=>{
        let row = `<tr>
            <td>${d.no}</td>
            <td>Rp ${d.total}</td>
            <td>${d.metode}</td>
        </tr>`;

        tbody.innerHTML += row;
    });
}