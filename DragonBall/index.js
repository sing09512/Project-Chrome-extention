const search = document.querySelector('.search-box button');
const container = document.querySelector('.container');
const contentBox = document.querySelector('.content-box');
const error404 = document.querySelector('.not-found');
const book = document.querySelector('#book')

search.addEventListener('click', async () => {
    book.style.display='none'
    const characterName = document.querySelector('.search-box input').value;
    
    
    async function fetchCharaters(page) {
        const url = `https://dragonball-api.com/api/characters?page=${page}&limit=10`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            const images = data.items.map(item => item.image);
            const names = data.items.map(item => item.name);
            const races = data.items.map(item => item.race);
            const genders = data.items.map(item => item.gender);
            const maxKi = data.items.map(item => item.maxKi);
            return { images, names, races, genders, maxKi };
        } catch(error) {
            console.error("ERROR", error);
            throw error;
        }
    }
    
    async function fetchAllPages() {
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');
        const sumPages = 6;
        const allImages = [];
        const allNames = [];
        const allRaces = [];
        const allGenders = [];
        const allMaxKi = [];
        
        for (let i = 1; i <= sumPages; i++) {
            const { images, names, races, genders, maxKi } = await fetchCharaters(i);
            allImages.push(...images);
            allNames.push(...names);
            allRaces.push(...races);
            allGenders.push(...genders);  
            allMaxKi.push(...maxKi);
        }
        
        const index = allNames.indexOf(characterName);

        if(index !== -1) {
            const image = allImages[index];
            const name = allNames[index];
            const race = allRaces[index];
            const gender = allGenders[index];
            const combatEffectiveness = allMaxKi[index];
            
            const imageEl = document.querySelector('.content-box img');
            const nameEl = document.querySelector('.content-box .name');
            const raceEl = document.querySelector('.content-box .race');
            const genderEl = document.querySelector('.content-box .gender');
            const maxKiEl = document.querySelector('.content-box .maxKi');

            imageEl.src = image;
            imageEl.style.display = 'flex';
            nameEl.textContent = `Name: ${name}`;
            raceEl.textContent = `Race: ${race}`;
            genderEl.textContent = `Gender: ${gender}`;
            maxKiEl.textContent = `Combat Effectiveness: ${combatEffectiveness}`
        } else {
            console.log("Character not found.");
        // 如果未找到角色，應用指定樣式
        container.style.height = '400px';
        contentBox.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        }
    }
    
    await fetchAllPages();
});










