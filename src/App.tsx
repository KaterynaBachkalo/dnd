import React, { useState, DragEvent } from "react";
import "./App.css";

interface ICard {
  id: number;
  order: number;
  text: string;
}

function App() {
  const [cardList, setCardList] = useState<ICard[]>([
    { id: 1, order: 1, text: "Card 1" },
    { id: 2, order: 2, text: "Card 2" },
    { id: 3, order: 3, text: "Card 3" },
    { id: 4, order: 4, text: "Card 4" },
  ]);

  const [currentCard, setCurrentCard] = useState<ICard | null>(null);

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, card: ICard) => {
    setCurrentCard(card);
    console.log("dragStart", card, currentCard);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.background = "white";
    console.log("dragEnd", currentCard);
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.style.background = "lightgray";
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, card: ICard) => {
    e.preventDefault();
    setCardList(
      cardList.map((c) => {
        if (c.id === card.id && currentCard) {
          return { ...c, order: currentCard.order };
        }
        if (currentCard && c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
    const target = e.target as HTMLDivElement;
    target.style.background = "white";
    console.log("dropHandler", card, currentCard);
  };

  const sortCards = (a: ICard, b: any) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className="app">
      {cardList.sort(sortCards).map((card) => (
        <div
          className={"card"}
          key={card.id}
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
}

export default App;
