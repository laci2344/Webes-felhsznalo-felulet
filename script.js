document.addEventListener("DOMContentLoaded", function () {
    const currentTemp = document.getElementById('current-temp');
    const currentHumidity = document.getElementById('current-humidity');
    const currentSoilMoisture = document.getElementById('current-soil-moisture');

    const tempMinSlider = document.getElementById('temp-min');
    const tempMaxSlider = document.getElementById('temp-max');
    const humidityMinSlider = document.getElementById('humidity-min');
    const humidityMaxSlider = document.getElementById('humidity-max');
    const soilMinSlider = document.getElementById('soil-moisture-min');
    const soilMaxSlider = document.getElementById('soil-moisture-max');

    const tempValues = document.getElementById('temp-values');
    const humidityValues = document.getElementById('humidity-values');
    const soilValues = document.getElementById('soil-moisture-values');

    const toggleSlidersBtn = document.getElementById('toggle-sliders');
    const toggleCameraBtn = document.getElementById('toggle-camera');
    const cameraFeed = document.getElementById('camera-feed');

    let slidersEnabled = true;
    let isCameraOn = true;

    function updateTempValues() {
        let minTemp = parseInt(tempMinSlider.value);
        let maxTemp = parseInt(tempMaxSlider.value);

        if (minTemp >= maxTemp) {
            tempMinSlider.value = maxTemp - 1;
            minTemp = maxTemp - 1;
        }

        tempValues.textContent = `${minTemp}°C - ${maxTemp}°C`;
    }

    function updateHumidityValues() {
        let minHumidity = parseInt(humidityMinSlider.value);
        let maxHumidity = parseInt(humidityMaxSlider.value);

        if (minHumidity >= maxHumidity) {
            humidityMinSlider.value = maxHumidity - 1;
            minHumidity = maxHumidity - 1;
        }

        humidityValues.textContent = `${minHumidity}% - ${maxHumidity}%`;
    }

    function updateSoilValues() {
        let minSoil = parseInt(soilMinSlider.value);
        let maxSoil = parseInt(soilMaxSlider.value);

        if (minSoil >= maxSoil) {
            soilMinSlider.value = maxSoil - 1;
            minSoil = maxSoil - 1;
        }

        soilValues.textContent = `${minSoil}% - ${maxSoil}%`;
    }

    // ÚJ: Értékszín frissítő függvény
    function updateSensorColor(valueElement, value, min, max) {
        if (value >= min && value <= max) {
            valueElement.style.color = 'limegreen';
        } else {
            valueElement.style.color = 'red';
        }
    }

    // ÚJ: Értékek frissítése (pl. szenzorból vagy tesztként)
    function refreshSensorData(temp, humidity, soilMoisture) {
        const minTemp = parseInt(tempMinSlider.value);
        const maxTemp = parseInt(tempMaxSlider.value);
        const minHumidity = parseInt(humidityMinSlider.value);
        const maxHumidity = parseInt(humidityMaxSlider.value);
        const minSoil = parseInt(soilMinSlider.value);
        const maxSoil = parseInt(soilMaxSlider.value);

        currentTemp.textContent = temp + '°C';
        currentHumidity.textContent = humidity + '%';
        currentSoilMoisture.textContent = soilMoisture + '%';

        updateSensorColor(currentTemp, temp, minTemp, maxTemp);
        updateSensorColor(currentHumidity, humidity, minHumidity, maxHumidity);
        updateSensorColor(currentSoilMoisture, soilMoisture, minSoil, maxSoil);
    }

    // Eseménykezelők
    tempMinSlider.addEventListener('input', updateTempValues);
    tempMaxSlider.addEventListener('input', updateTempValues);
    humidityMinSlider.addEventListener('input', updateHumidityValues);
    humidityMaxSlider.addEventListener('input', updateHumidityValues);
    soilMinSlider.addEventListener('input', updateSoilValues);
    soilMaxSlider.addEventListener('input', updateSoilValues);

    toggleSlidersBtn.addEventListener('click', function () {
        slidersEnabled = !slidersEnabled;
        tempMinSlider.disabled = !slidersEnabled;
        tempMaxSlider.disabled = !slidersEnabled;
        humidityMinSlider.disabled = !slidersEnabled;
        humidityMaxSlider.disabled = !slidersEnabled;
        soilMinSlider.disabled = !slidersEnabled;
        soilMaxSlider.disabled = !slidersEnabled;
    });

    toggleCameraBtn.addEventListener('click', function () {
        if (isCameraOn) {
            cameraFeed.style.display = 'none';
            toggleCameraBtn.innerHTML = '<span>Kamera Be</span>';
            isCameraOn = false;
        } else {
            cameraFeed.style.display = 'block';
            toggleCameraBtn.innerHTML = '<span>Kamera Ki</span>';
            isCameraOn = true;
        }
    });

    // Inicializálás
    updateTempValues();
    updateHumidityValues();
    updateSoilValues();

    // Tesztadatok (törölheted, ha valós adatot használsz)
    //refreshSensorData(21, 68, 50); // Példa: mind ideális
    //refreshSensorData(10, 80, 20); // Példa: hibás értékek
});
