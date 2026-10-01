const form = document.getElementById("locationForm");
const input = document.getElementById("location");
const resultCard = document.getElementById("resultCard");
const message = document.getElementById("message");
const buttonText = document.getElementById("buttonText");
const spinner = document.getElementById("spinner");
const searchButton = document.getElementById("searchButton");

// Menampilkan pesan error
function showMessage(text) {
  message.textContent = text;
  message.classList.remove("hidden");
}

// Menyembunyikan pesan error
function hideMessage() {
  message.classList.add("hidden");
}

// Mengambil data dari context MapTiler
function getContext(feature, types) {
  const context = feature.context || [];

  const item = context.find((c) =>
    types.some((type) => c.id?.startsWith(type))
  );

  return item?.text || "";
}

// Mencari data berdasarkan tipe wilayah
function findContext(feature, prefixes) {
  return getContext(feature, prefixes) || "";
}

// Ketika form dikirim
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  hideMessage();
  resultCard.classList.add("hidden");

  const query = input.value.trim();

  // Cek input lokasi
  if (!query) {
    showMessage("Silakan masukkan lokasi terlebih dahulu.");
    return;
  }

  // Cek API key
  if (
    !MAPTILER_API_KEY ||
    MAPTILER_API_KEY.includes("GANTI_DENGAN")
  ) {
    showMessage(
      "API key belum diisi. Buka config.js lalu masukkan API key MapTiler."
    );
    return;
  }

  // Tampilkan loading
  buttonText.classList.add("hidden");
  spinner.classList.remove("hidden");
  searchButton.disabled = true;

  try {
    // URL API MapTiler
    const url =
      `https://api.maptiler.com/geocoding/` +
      `${encodeURIComponent(query)}.json` +
      `?key=${encodeURIComponent(MAPTILER_API_KEY)}` +
      `&language=id&limit=1`;

    console.log("Request URL:", url);

    // Request ke MapTiler
    const response = await fetch(url);

    // Cek response
    if (!response.ok) {
      const errorText = await response.text();

      console.log("Status:", response.status);
      console.log("Response MapTiler:", errorText);

      throw new Error(
        `Request gagal (${response.status}): ${errorText}`
      );
    }

    // Ambil data JSON
    const data = await response.json();

    console.log("Data MapTiler:", data);

    // Cek apakah lokasi ditemukan
    if (!data.features || data.features.length === 0) {
      throw new Error(
        "Lokasi tidak ditemukan. Coba nama lokasi yang lebih spesifik."
      );
    }

    // Ambil hasil pertama
    const feature = data.features[0];

    // Ambil longitude dan latitude
    const [lon, lat] =
      feature.center ||
      feature.geometry?.coordinates ||
      ["-", "-"];

    // Ambil negara
    const country =
      findContext(feature, ["country"]) ||
      feature.properties?.country ||
      "-";

    // Ambil provinsi
    const province =
      findContext(feature, ["region", "province"]) ||
      "-";

    // Ambil kecamatan
    const district =
      findContext(feature, [
        "county",
        "municipality",
        "district",
        "locality"
      ]) || "-";

    // Tampilkan nama lokasi
    document.getElementById("placeTitle").textContent =
      feature.text || query;

    // Tampilkan alamat lengkap
    document.getElementById("placeAddress").textContent =
      feature.place_name || "Alamat tidak tersedia";

    // Tampilkan negara
    document.getElementById("country").textContent =
      country;

    // Tampilkan provinsi
    document.getElementById("province").textContent =
      province;

    // Tampilkan kecamatan
    document.getElementById("district").textContent =
      district;

    // Tampilkan longitude
    document.getElementById("longitude").textContent =
      Number(lon).toFixed(6);

    // Tampilkan latitude
    document.getElementById("latitude").textContent =
      Number(lat).toFixed(6);

    // Tampilkan tipe lokasi
    document.getElementById("featureType").textContent =
      feature.properties?.type ||
      feature.place_type?.[0] ||
      "-";

    // Tampilkan koordinat
    document.getElementById("coordinatesText").textContent =
      `${Number(lat).toFixed(6)}, ${Number(lon).toFixed(6)}`;

    // Link ke Google Maps
    document.getElementById("mapLink").href =
      `https://www.google.com/maps?q=${lat},${lon}`;

    // Tampilkan hasil
    resultCard.classList.remove("hidden");

  } catch (error) {

    console.error("Error:", error);

    showMessage(
      error.message ||
      "Terjadi kesalahan saat mengambil data."
    );

  } finally {

    // Hentikan loading
    buttonText.classList.remove("hidden");
    spinner.classList.add("hidden");

    // Aktifkan kembali tombol
    searchButton.disabled = false;
  }
});