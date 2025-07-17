const listings = [
  {
    title: "2-Bedroom Apartment",
    location: "Brooklyn, NY",
    price: "$1,200/mo",
    amenities: ["Playground", "Parking", "Near School"],
  },
  {
    title: "Affordable Family Housing",
    location: "Austin, TX",
    price: "$950/mo",
    amenities: ["Daycare Nearby", "Grocery Store", "Pet Friendly"],
  },
];

const root = document.getElementById("root");

function render() {
  let html = "<h2>Affordable Housing Finder</h2><ul>";
  for (const item of listings) {
    html += `<li><strong>${item.title}</strong> - ${item.location}<br>${item.price}<br>${item.amenities.join(", ")}</li><br>`;
  }
  html += "</ul>";
  root.innerHTML = html;
}

render();
