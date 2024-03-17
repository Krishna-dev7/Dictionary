// lets create an dictionary page  
$('#voice-icon').hide();
let btn = document.querySelector('button');
let _url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// to retrieve data from api
async function fetchData(searchVal){
    let res = await fetch(_url+searchVal);  
    let parsedRes = await res.json();
    console.log(parsedRes);
    return parsedRes[0];
}

// event performed when btn got clicked
let searchVal;  
$(btn).click(async ()=>{
    searchVal = $('#search').val();
    // resData is in array format contains meanings and definition
    let resData = await fetchData(searchVal);    
    updateResult(resData);
})

// function to update result div with meanings
function updateResult(resData){
    if(!(resData instanceof Object)) {
        console.log(resData);
        console.log("Response data is not an array");
        return;
    }
    // add meanings 
    let _innerHTML = `<p id="meaning">
        <span class="tag"> Meaning: </span>
        <span> ${resData.meanings[0].definitions[0].definition}</span>
    </p>`
    $('#meaning').remove();
    $('.result').append(_innerHTML);

    // add phonemetics
    $('#word h3').text(searchVal);
    $('#word p').text(resData.phonetics[0].text);
    $('audio').attr('src',resData.phonetics[0].audio);
    console.log(resData.phonetics[0].audio)
    $('#voice-icon').show().click(() => {
        $('audio')[0].play();
    });
}