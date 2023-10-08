let cards = [
  {
    id: 0,
    image: "images/13816126_5337365.svg",
  },
  {
    id: 1,
    image: "images/13818519_5354106.svg",
  },
  {
    id: 2,
    image: "images/13818637_5368969.svg",
  },
  {
    id: 3,
    image: "images/13818640_5369134.svg",
  },
  {
    id: 4,
    image: "images/13818646_5369434.svg",
  },
  {
    id: 5,
    image: "images/13862060_5376103.svg",
  },
  {
    id: 6,
    image: "images/13862074_5378662.svg",
  },
  {
    id: 7,
    image: "images/13985520_5385849.svg",
  },
];

cards.push(...cards);

let shuffledCards = shuffle(cards);
let cont = document.querySelector(".container");
let el;
let firstOfPairID = -1;
let secondOfPairID = -1;
let openedCardsCounter = 0;
let memoCards = [];

for (let index = 0; index < 16; index++) {
  el = document.createElement("div");
  cont.append(el);

  memoCards.push(el);
  el.className = "card";
  el.addEventListener(`click`, cardClickHandler);

  function cardClickHandler(event) {
    if (!event.target.matched) {
      event.target.classList.add(`cardAnimated`);
      
      if (!event.target.cardOpened) {
        if (openedCardsCounter >= 2) {
          for (let i = 0; i < 16; i++) {

            memoCards[i].style.backgroundImage = `none`;
            memoCards[i].cardOpened = false;
          }
          firstOfPairID = -1;
          secondOfPairID = -1;
          openedCardsCounter = 0;
        }
        console.log(memoCards);
        event.target.style.backgroundImage = `url(${cards[index].image})`;
        event.target.cardID = cards[index].id;
        event.target.cardOpened = true;
        openedCardsCounter++;
        event.target.cardID = cards[index].id;
        if (cards[index].id === firstOfPairID) {
          console.log(`win`);
         
          for (let i = 0; i < 16; i++) {

            if (memoCards[i].cardID == firstOfPairID) {
              memoCards[i].removeEventListener(`click`, cardClickHandler);
              memoCards[i].classList.add(`pairClosed`);
              memoCards[i].matched = true;
            }
          }
        }
        firstOfPairID = cards[index].id;
      } else {
        
        event.target.style.backgroundImage = `none`;
        event.target.cardOpened = false;

      }
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
