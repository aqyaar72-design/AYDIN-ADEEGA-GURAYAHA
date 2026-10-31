
const waNumber = "917981977002";

const form = document.getElementById("bookingForm");
const msg = document.getElementById("formMessage");
const service = document.getElementById("serviceSelect");

const quoteServices = ["laundry", "cooking", "office"];

const serviceNames = {
  home: "Nadiifinta guriga - bille",
  deep: "Nadiifinta guriga - hal mar",
  pest: "La dagaalanka cayayaanka",
  sofa: "Nadiifinta fadhiga iyo roogga",
  laundry: "Dhar dhaqid iyo feereyn",
  cooking: "Adeegga cunto karinta",
  office: "Nadiifinta xafiiska",
  rental: "Dhexdhexaadinta kirada guryaha"
};

const priceMap = {
  home: {
    "1 BHK": 2000, "2 BHK": 2500, "3 BHK": 3000,
    "4 BHK": 4500, "5 BHK": 6000
  },
  pest: {
    "1 BHK": 1500, "2 BHK": 2000, "3 BHK": 2500,
    "4 BHK": 3000, "5 BHK": 3500
  },
  deep: {
    "1 BHK": 1000, "2 BHK": 2000, "3 BHK": 3000,
    "4 BHK": 4000, "5 BHK": 5000
  }
};

const deepMap = {
  "1 BHK": 1800, "2 BHK": 2800, "3 BHK": 4000,
  "4 BHK": 5500, "5 BHK": 7000
};

function updateEstimate() {
  const s = service.value;
  const p = document.getElementById("propertyType").value;
  const c = document.getElementById("cleaningType").value;

  const notice = document.getElementById("quoteNotice");
  const estimate = document.getElementById("estimate");

  if (quoteServices.includes(s)) {
    notice.hidden = false;
    estimate.hidden = true;
    return;
  }

  notice.hidden = true;
  let price = null;

  if (s === "home" && priceMap.home[p]) price = priceMap.home[p];
  if (s === "pest" && priceMap.pest[p]) price = priceMap.pest[p];

  if (s === "deep" && priceMap.deep[p]) {
    price = c === "deep" ? deepMap[p] : priceMap.deep[p];
  }

  estimate.hidden = price === null;

  if (price !== null) {
    document.getElementById("estimateValue").textContent =
      "₹" + price.toLocaleString("en-IN");
  }
}

service.addEventListener("change", updateEstimate);
document.getElementById("propertyType").addEventListener("change", updateEstimate);
document.getElementById("cleaningType").addEventListener("change", updateEstimate);

document.querySelectorAll("[data-service]").forEach(a => {
  a.addEventListener("click", () => {
    service.value = a.dataset.service;
    updateEstimate();
  });
});

document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  const open = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("#mainNav a").forEach(a => {
  a.addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("open");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const date = document.getElementById("dateInput");
date.min = new Date().toLocaleDateString("en-CA");

form.addEventListener("submit", e => {
  e.preventDefault();

  msg.className = "message";
  msg.textContent = "";

  if (!form.reportValidity()) return;

  const d = Object.fromEntries(new FormData(form).entries());

  const selectedService = d.service_id;
  const property = d.property_type || "Lama sheegin";
  const cleaning = d.cleaning_type || "Lama sheegin";

  let price = null;

  if (selectedService === "home") price = priceMap.home[property];
  if (selectedService === "pest") price = priceMap.pest[property];

  if (selectedService === "deep") {
    price = cleaning === "deep"
      ? deepMap[property]
      : priceMap.deep[property];
  }

  const priceText = quoteServices.includes(selectedService)
    ? "Qiime marka la weydiiyo"
    : price !== null && price !== undefined
      ? "₹" + price.toLocaleString("en-IN")
      : "Qiime la xaqiijinayo";

  const message = `
*DALAB CUSUB - AYDIN CLEANING SERVICES*

Magaca: ${d.customer_name}
Telefoonka: ${d.phone}
Email: ${d.email || "Lama sheegin"}
Magaalada: ${d.city}
Cinwaanka: ${d.address}

Adeegga: ${serviceNames[selectedService] || selectedService}
Nooca guriga: ${property}
Nooca nadiifinta: ${cleaning}
Qiimaha: ${priceText}

Taariikhda: ${d.preferred_date}
Waqtiga: ${d.preferred_time}

Faahfaahin: ${d.details || "Faahfaahin dheeraad ah ma jirto"}

Fadlan xaqiiji dalabkan.
  `.trim();

  const whatsappURL =
    "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(message);

  msg.className = "message success";
  msg.textContent = "Dalabka waa diyaar. WhatsApp ayaa furmaya; riix Send si aad u dirto.";

  window.open(whatsappURL, "_blank");

  const btn = form.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = false;
  }
});

updateEstimate();
