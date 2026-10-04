// ==========================================
// AMH ORDER FORM - FINAL SCRIPT
// ==========================================

// Product Charges
const bottlePrice = 400;
const shippingCharge = 100;
const codCharge = 50;

// Form Fields
const qty = document.getElementById("qty");
const payment = document.getElementsByName("payment");

// Summary Fields
const productPrice = document.getElementById("productPrice");
const shipping = document.getElementById("shippingCharge");
const cod = document.getElementById("codCharge");
const total = document.getElementById("totalAmount");

// UPI Section
const upiBox = document.getElementById("upiBox");


// ==========================================
// CALCULATE TOTAL
// ==========================================

function calculateTotal() {

    const quantity = Number(qty.value);

    // Quantity blank
    if (!quantity || quantity < 1) {

        productPrice.textContent = "₹0";
        shipping.textContent = "₹0";
        cod.textContent = "₹0";
        total.textContent = "₹0";

        if (upiBox) {
            upiBox.style.display = "none";
        }

        return;
    }


    // Product Amount
    const productAmount = quantity * bottlePrice;


    // Payment Method
    let isCOD = false;

    payment.forEach(function(option) {

        if (option.checked && option.value === "COD") {
            isCOD = true;
        }

    });


    // Charges
    const shippingAmount = shippingCharge;
    const codAmount = isCOD ? codCharge : 0;


    // Final Total
    const finalAmount =
        productAmount +
        shippingAmount +
        codAmount;


    // Update Summary
    productPrice.textContent = "₹" + productAmount;
    shipping.textContent = "₹" + shippingAmount;
    cod.textContent = "₹" + codAmount;
    total.textContent = "₹" + finalAmount;


    // UPI Show / Hide
    if (upiBox) {

        if (isCOD) {
            upiBox.style.display = "none";
        } else {
            upiBox.style.display = "block";
        }

    }
}


// ==========================================
// COPY UPI ID
// ==========================================

function copyUPI() {

    const upi = document.getElementById("upiId");

    navigator.clipboard.writeText(upi.value)
        .then(function() {

            alert("UPI ID Copied");

        })
        .catch(function() {

            alert("UPI ID: " + upi.value);

        });

}


// ==========================================
// DOWNLOAD QR
// ==========================================

function downloadQR() {

    const link = document.createElement("a");

    link.href = "qr.png";
    link.download = "Heartveda-UPI-QR.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}


// ==========================================
// SEND ORDER TO YOUR WHATSAPP
// ==========================================

function sendWhatsApp() {

    const name =
        document.getElementById("fullName").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const altMobile =
        document.getElementById("altMobile").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const pincode =
        document.getElementById("pincode").value.trim();

    const quantity =
        document.getElementById("qty").value.trim();


    // Payment Method
    let paymentMethod = "";

    payment.forEach(function(option) {

        if (option.checked) {
            paymentMethod = option.value;
        }

    });


    // Validation
    if (
        !name ||
        !mobile ||
        !address ||
        !pincode ||
        !quantity ||
        !paymentMethod
    ) {

        alert(
            "कृपया सभी जरूरी जानकारी भरें और Payment Method चुनें।"
        );

        return;
    }


    // Amounts
    const productAmount =
        Number(quantity) * bottlePrice;

    const isCOD =
        paymentMethod === "COD";

    const shippingAmount =
        shippingCharge;

    const codAmount =
        isCOD ? codCharge : 0;

    const totalAmount =
        productAmount +
        shippingAmount +
        codAmount;


    // ==========================================
    // ORDER MESSAGE
    // This message goes to YOUR WhatsApp
    // ==========================================

    const message =
        "AYURVEDIC MEDICINE FOR HEART\n" +
        "NEW ORDER\n\n" +

        "Customer Name: " + name + "\n" +
        "Mobile Number: " + mobile + "\n" +
        "Alternative Mobile: " +
        (altMobile || "N/A") + "\n\n" +

        "Full Address:\n" +
        address + "\n" +
        "Pincode: " + pincode + "\n\n" +

        "Product: Ayurvedic Medicine For Heart\n" +
        "Quantity: " + quantity + " Bottle\n" +

        "Payment Method: " +
        (
            isCOD
                ? "Cash on Delivery (COD)"
                : "Prepaid (Online Payment)"
        ) +
        "\n\n" +

        "Product Price: ₹" + productAmount + "\n" +
        "Shipping Charge: ₹" + shippingAmount + "\n" +
        "COD Charge: ₹" + codAmount + "\n" +

        "------------------------------\n" +

        "Total Amount: ₹" + totalAmount;


    // ==========================================
    // YOUR WHATSAPP NUMBER
    // ==========================================

    const whatsappURL =
        "https://wa.me/919358726799?text=" +
        encodeURIComponent(message);


    // Open WhatsApp
    window.open(whatsappURL, "_blank");


    // ==========================================
    // ORDER CONFIRMATION
    // ==========================================

    setTimeout(function() {

        const successBox = document.getElementById("orderSuccess");

if (successBox) {
    successBox.style.display = "block";
    successBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}
    }, 500);

}


// ==========================================
// EVENTS
// ==========================================

// Quantity
qty.addEventListener("input", calculateTotal);

qty.addEventListener("change", calculateTotal);


// Payment
payment.forEach(function(option) {

    option.addEventListener("change", calculateTotal);

});


// ==========================================
// INITIAL CALCULATION
// ==========================================

calculateTotal();
