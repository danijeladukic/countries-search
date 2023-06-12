
import countriesData from "./countries_data.js";


let controlVar = 'any' //controlna var koja provjerava je koja vrsta opretrazivanja je odabrana
let controlVarSort = true
const feedContainer = document.querySelector('#feed')

countriesData.forEach(element => {
    const countryBox = document.createElement('div')
    countryBox.classList.add('country-box')
    countryBox.innerHTML = element.name
    feedContainer.appendChild(countryBox)

});

document.querySelector('.search-input').addEventListener('input', filterCountries)

const changeableSubs = document.querySelector('.changable-subtitle')

document.querySelector('.search-input').addEventListener('input', checkInput)

function checkInput(){
    let inputText = document.querySelector('.search-input').value
    if (inputText === ''){
        changeableSubs.style.display ='none'
    }
}

function filterCountries (){
    const searchedWord = document.createElement('span')
    const counterWord =  document.createElement('span')

    searchedWord.style.color = 'red'
    counterWord.style.color = 'green'
    
    const searchInput = document.querySelector('.search-input')
    const listItems = document.querySelectorAll('.country-box')
    const filter = searchInput.value.toLowerCase()
   

    let counter = 0

    if(controlVar === 'any'){
    
    //    '' changeableSubs.innerHTML = ''''
    
    listItems.forEach((item)=>{
        let text = item.textContent
        
        if(text.toLowerCase().includes(filter.toLowerCase())){// za search any umisto startswith stavimo includues
            item.style.display = ''
            counter++
        }
        else{
            item.style.display = 'none'
        }
        
    }
    
    )
    //here we change subs
    changeableSubs.style.display =''
    

    searchedWord.innerHTML= filter   
    counterWord.innerHTML = counter

    changeableSubs.innerHTML = 'Countries containing '
    changeableSubs.appendChild(searchedWord)
    changeableSubs.innerHTML += ' are '
    changeableSubs.appendChild(counterWord)
    changeableSubs.innerHTML += '.'

    

    }
    else if (controlVar === 'start'){
        listItems.forEach((item)=>{
            let text = item.textContent
    
            if(text.toLowerCase().startsWith(filter.toLowerCase())){// za search any umisto startswith stavimo includues
                item.style.display = ''
                counter++
            }
            else{
                item.style.display = 'none'
            }
        })

        //here we change subs
        changeableSubs.style.display =''
        searchedWord.innerHTML= filter   
        counterWord.innerHTML = counter
    
        changeableSubs.innerHTML = 'Countries starting with '
        changeableSubs.appendChild(searchedWord)
        changeableSubs.innerHTML += ' are '
        changeableSubs.appendChild(counterWord)
        changeableSubs.innerHTML += '.'

    }
       
} 

//togglat searchVar da znamo kako pretrazujemo
const startButton = document.querySelector('.btnStart')
startButton.addEventListener('click', toggleStart)


const anyButton = document.querySelector('.btnAny')
anyButton.addEventListener('click', toggleAny)

function toggleStart(){
    if (controlVar === 'any'){
        controlVar = 'start'
        startButton.style.background = 'rgba(99, 62, 151)'
        anyButton .style.background = 'linear-gradient(to right, rgb(137, 87, 206) 90%,rgba(99, 62, 151, 0.752))';
    }
   else{
    return;
   }
  
}
function toggleAny(){
    if (controlVar === 'start'){
        controlVar = 'any';
        anyButton.style.background= 'rgba(99, 62, 151)';
        startButton.style.background ='linear-gradient(to right, rgb(137, 87, 206) 90%,rgba(99, 62, 151, 0.752))';
    }
    else{
        return;
    }
  
}

// sort feed a-z, z-a

const sortBtn = document.querySelector('.btn-sort')
sortBtn.addEventListener('click', sortFeed)

function sortFeed(){

const feedElement = document.querySelector('#feed')
let feedList =[...document.querySelector('#feed').childNodes]

controlVarSort= !controlVarSort
if(controlVarSort){
    sortBtn.style.background= 'rgba(99, 62, 151)'

    feedList.sort((a, b) =>  -1 * a.innerHTML.localeCompare (b.innerHTML))
    feedElement.innerHTML = ''
}

else{
    sortBtn.style.background = 'linear-gradient(to right, rgb(137, 87, 206) 90%,rgba(99, 62, 151, 0.752))'
    feedList.sort((a, b) =>  a.innerHTML.localeCompare (b.innerHTML))
    feedElement.innerHTML = ''
}

feedList.forEach(el => {
    const countryBox = document.createElement('div')
    countryBox.classList.add('country-box')
    countryBox.innerHTML = el.innerHTML
    feedElement.appendChild(countryBox)
})
location.reload()
window.stop()

}
