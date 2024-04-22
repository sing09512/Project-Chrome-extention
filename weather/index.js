const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'c332f7a32984a99a5cd9b5ad5058b336';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
        
        /* document.querySelector('.search-box input').addEventListener('input', async (event) => {
          const inputVal = event.target.value;
          if (inputVal.length > 1) {
            fetchSuggestions(inputVal); // 如果輸入超過1個字符，則調用 fetchSuggestions
          } else {
            document.getElementById('searchSuggestions').classList.remove('active');
            // 如果輸入不足2個字符，則移除 active 類使 suggest box 不顯示
          }
        });
        
        // 獲取建議
        async function fetchSuggestions(query) {
          const suggestionsBox = document.getElementById('searchSuggestions');
          suggestionsBox.innerHTML = ''; // 先清空建議框中的内容
          try {
            const apiKey = 'DgwNAsdGzMiMJQb7Dk5hrA==T5stCP8Ce4qQ9NTa';
            const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${query}`, {
              headers: {
                'Authorization': `Bearer ${apiKey}` // 添加正確的頭部授權
              }
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`); // 檢查請求是否成功
            }
            
            const data = await response.json();
            showSuggestions(data); // 調用 showSuggestions 顯示建议
          } catch (e) {
            console.log(e);
            suggestionsBox.classList.remove('active'); // 出錯時移除 active 類來隱藏建议框
          }
        }
        
        // 顯示建議
        function showSuggestions(suggestions) {
          const suggestionsBox = document.getElementById('searchSuggestions');
          if (suggestions.length === 0) {
            suggestionsBox.classList.remove('active');
            return; // 如果沒有建議則不顯示
          }
          
          suggestions.forEach(suggestionItem => {
            const suggestionElement = document.createElement('div'); // 為每個建議創建一個新的 div
            suggestionElement.textContent = suggestionItem.name; // 假設 API 回應中含有城市名稱字段
            suggestionElement.addEventListener('click', () => {
              document.querySelector('.search-box input').value = suggestionItem.name; // 點擊建議會將其值填入輸入框
              suggestionsBox.innerHTML = '';
              suggestionsBox.classList.remove('active');
            });
            suggestionsBox.appendChild(suggestionElement); // 將剛創建的建议元素添加到容器中
          });
          
          suggestionsBox.classList.add('active'); // 添加 active 類來顯示建议框
        } */
      });
    

    