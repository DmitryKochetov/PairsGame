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
let openedCardsCounter = 0;
let memoCards = [];
let uniqueId = -1;

for (let index = 0; index < 16; index++) {
  el = document.createElement("div");
  cont.append(el);
  el.idCard = index;
  el.className = "card";
  el.style.backgroundImage = `url(images/plate2.svg)`;
  el.addEventListener(`click`, cardClickHandler);
  memoCards.push(el);

  function cardClickHandler(event) {
    if (!event.target.matched) {
      if (!event.target.cardOpened) {
        openedCardsCounter++;
        event.target.classList.add(`cardAnimated`);
        if (openedCardsCounter >= 2) {
          for (let i = 0; i < 16; i++) {
            if (!memoCards[i].matched) {
              memoCards[i].style.backgroundImage = `url(images/plate2.svg)`;
              memoCards[i].cardOpened = false;
              memoCards[i].classList.remove("cardAnimated");
            }
          }
          firstOfPairID = -1;
          openedCardsCounter = 0;
        }
        console.log(memoCards);
        event.target.style.backgroundImage = `url(${cards[index].image})`;
        event.target.cardID = cards[index].id;
        event.target.cardOpened = true;
        // openedCardsCounter++;
        event.target.cardID = cards[index].id;
        if (
          cards[index].id === firstOfPairID &&
          uniqueId != event.target.idCard
        ) {
          for (let i = 0; i < 16; i++) {
            if (memoCards[i].cardID == firstOfPairID) {
              memoCards[i].removeEventListener(`click`, cardClickHandler);
              memoCards[i].classList.add(`pairClosed`);
              memoCards[i].matched = true;
            }
          }
          firstOfPairID = -1;
        }
        firstOfPairID = cards[index].id;
        uniqueId = event.target.idCard;
        console.log(uniqueId);
      } else {
        event.target.style.backgroundImage = `url(images/plate2.svg)`;
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
