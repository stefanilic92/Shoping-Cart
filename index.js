let allTotal = 0; // Definisali smo da je na pocetku ukupna cena 0 

function addToCart(element) {

    // closest - uzimamo ceo div, u ovom slucaju sliku, naziv i cenu
    let mainEl = element.closest('.single-item');

    //  Ovde radimo query selektor nad nasom promenljivom mainEl
    // uzimamo cenu i pomocu innerText samo text klase price umesto celog paragrafa

    let price = mainEl.querySelector('.price').innerText;

    // Uzimamo ime pomocu query selektora nad nasom promenljivom mainEl
    // Obzirom da nema id ili clasu, uzimamo pomogu taga i dodajemo innerText da izucemo samo ime a ne ceo h3 element

    let name = mainEl.querySelector('h3').innerText;

    // Uzimamo vrednost input polja pomocu query selektora nase promeljive mainEl
    // Pomocu taga input, obrati paznju da za input ne pisemo innerText nego VALUE !!!

    let quantity = mainEl.querySelector('input').value;

    /* Mozemo uzeti vrednost elementa pre buttona (vrednost input polja)
     
     let input = element.previousElementSibling;
     
     console.log(input.value); // vrednost input polja
     */

    let cartItems = document.querySelector('.cart-items');

    /* Napravili smo prazan div cart-items u HTML-u da bi smo tu ciljano dodavali
     * proizvode, pravimo promenljivu (cartItems), odredimo da je to lokacija naseg diva
     * i pomocu innerHTML ispisujemo na stranici sta nam je potrebno od elemenata
     *(naziv proizvoda, cena, kolicina, dugme za uklanjanje...)
     *Napravili smo uslov ako je 0 da izbaci upozorenje, a ako je vece od 0 da ispise u cart-items*/

    if (parseInt(quantity) > 0) {

        price = price.substring(1);  // Substring se koristi za uklanjanje stringa
        // u ovom slucaju uklanjamo do 1 odnosno brisemo znak $
        // kako bi mogli da pomnozimo cenu i vrednost

        let total = parseInt(price) * parseInt(quantity); // pretvaramo cenu i kolicinu u ceo broj

        allTotal += total; // Na unapred definisisanu vrednost 0 na pocetku koda dodaj sve sto je u totalu

        cartItems.innerHTML += `<div class="cart-single-item">
                                <h3>${name}</h3>
                                <p>${price}$ x ${quantity} = <span>${total}</span>$</p>
                                <button onclick="removeFromCart(this)" class="remove-item">Ukloni</button>
                                </div>`;

        document.querySelector('.total').innerText = `Total: ${allTotal}$`; // U klasi total ispisujemo alltotal

        element.innerText = 'X';                    //Menja text kliknutog dugmeta u X
        element.setAttribute('disabled', 'true');  // Onemogucuje da ponovo dodamo isti artikal

    } else {

        alert('Odaberi kolicinu');
    }
}

/* Funkcija za removeFromCart koju smo dodeli onclick buttonu koji se ispisuje kada dodamo artikal
 Ovo mainEl je novi mainEl jer mozemo istim imenom nazivati sve dok je definisana u samoj funkciji a ne van nje.
Opet dodajemo (element) da bi tacno znao koje dugme, a closest za sve iz same clase .cart-single-items i 
pomocu remove brisemo
*/

function removeFromCart(element) {
    
    let mainEl = element.closest('.cart-single-item');
    
    let price = mainEl.querySelector('p span').innerText; //span smo napravili kod totala da bi mogli
                                                          // da oduzmemo alltotal od total na kraju
    
    let name = mainEl.querySelector('h3').innerText;
    let vegetables = document.querySelectorAll('.single-item');
    
    allTotal -= parseInt(price);
    
    document.querySelector('.total').innerText = `Total: ${allTotal}$`;
    
    mainEl.remove();
    
    // Vracamo mogucnost da se ponovo doda artikl nakon izbacivanja iz korpe
    // Napravili smo petlju u kojoj ako je input 0 skloni atribut disabled i vrati mu text dodaj.
    
    vegetables.forEach(function (vege) {
        let itemName = vege.querySelector('.si-content h3').innerText;
        
        if(itemName === name) {
            vege.querySelector('.actions input').value = 0;
            vege.querySelector('.actions button').removeAttribute('disabled');
            vege.querySelector('.actions button').innerText = 'Dodaj';
        }
    });
}