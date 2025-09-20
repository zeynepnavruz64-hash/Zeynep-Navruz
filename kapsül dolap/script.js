let wardrobe = [];

document.getElementById("fileInput").addEventListener("change", function(e){
  const files = e.target.files;
  const container = document.getElementById("wardrobeItems");
  container.innerHTML = "";
  
  for(let i=0;i<files.length;i++){
    const reader = new FileReader();
    reader.onload = function(event){
      const img = document.createElement("img");
      img.src = event.target.result;
      img.alt = files[i].name;
      wardrobe.push({name: files[i].name, src: img.src});
      container.appendChild(img);
    }
    reader.readAsDataURL(files[i]);
  }
  setTimeout(dailySuggestion, 500);
});

function dailySuggestion() {
  if (wardrobe.length === 0) return;

  const suggestionDiv = document.getElementById("suggestion");
  const todayIndex = new Date().getDate() % wardrobe.length;
  const todayItem = wardrobe[todayIndex];

  const place = document.getElementById("placeSelect")?.value || "gunluk";
  let ideas = [];

  if (todayItem.name.includes("beyaz") && todayItem.name.includes("tişört")) {
    if(place === "is") ideas = ["🧥 Blazer + Siyah pantolon", "👠 Topuklu ayakkabı"];
    else if(place === "okul") ideas = ["👖 Kot pantolon + Sneaker"];
    else if(place === "spor") ideas = ["👟 Spor ayakkabı + Şort"];
    else if(place === "parti") ideas = ["🧥 Şık ceket + Topuklu"];
    else ideas = ["👖 Kot pantolon + beyaz sneaker","🧥 Oversize blazer + topuklu"];
  } else if (todayItem.name.includes("elbise")) {
    if(place === "parti") ideas = ["🧥 Deri ceket + Bot", "👠 Topuklu"];
    else ideas = ["🧥 Deri ceket + Bot"];
  } else {
    ideas = ["Bu parçayı farklı şekilde kombinleyebilirsin 😎"];
  }

  suggestionDiv.innerHTML = `<h3>Bugünkü Kombin Önerisi (${todayItem.name}):</h3>
    <ul>${ideas.map(i=>`<li>${i}</li>`).join('')}</ul>`;
}
