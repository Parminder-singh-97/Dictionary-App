let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let inputText = document.getElementById("inp_words");

let btn = document.getElementById("search_btn");
let result = document.getElementById("result");

let sound = document.getElementById("sound");
btn.addEventListener("click", () => {
  let inputText = document.getElementById("inp_words").value;

  fetch(url + `${inputText}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      result.innerHTML = `
    
            <div class="word">

                <h3>${data[0].word}</h3>
                <button onclick ="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>

            <p class="word_meaning">
               ${data[0].meanings[0].definitions[0].definition}
            </p>

            <p class="word_example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>

        </div>
        `;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch((err) => {
      result.innerHTML = `<h3 class="error"> Couldn't Find The Word</h3>`;
    });
});

function playSound() {
  sound.play();
}
