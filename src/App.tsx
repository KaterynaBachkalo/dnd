import React, { DragEvent } from "react";
import "./App.css";
import Smile from "./Smile";

export interface ICard {
  id: number;
  content: string;
}

function App() {
  const elements: ICard[] = [
    { id: 1, content: "😸" },
    { id: 1, content: "⚾" },
    { id: 1, content: "👻" },
  ];

  // const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
  // const [currentItem, setCurrentItem] = useState<ICard | null>(null);

  // const dragStartHandler = (
  //   e: DragEvent<HTMLDivElement>,
  //   board: IBoard,
  //   item: ICard
  // ) => {
  //   setCurrentBoard(board);
  //   setCurrentItem(item);
  // };

  // const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
  //   const target = e.target as HTMLDivElement;
  //   target.style.boxShadow = "none";
  // };

  // const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
  //   const target = e.target as HTMLDivElement;
  //   target.style.boxShadow = "none";
  // };

  // const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   const target = e.target as HTMLDivElement;

  //   if (target.className === "item") {
  //     target.style.boxShadow = "0 4px 3px gray";
  //   }
  // };

  // const dropHandler = (
  //   e: DragEvent<HTMLDivElement>,
  //   board: IBoard,
  //   item: ICard
  // ) => {
  //   e.preventDefault();
  //   if (!currentItem || !currentBoard) {
  //     return;
  //   }
  //   const currentIndex = currentBoard.items.indexOf(currentItem);
  //   currentBoard.items.splice(currentIndex, 1);

  //   const dropIndex = board.items.indexOf(item);
  //   board.items.splice(dropIndex + 1, 0, currentItem);

  //   setBoards(
  //     boards.map((b) => {
  //       if (b.id === board.id) {
  //         return board;
  //       }
  //       if (b.id === currentBoard.id) {
  //         return currentBoard;
  //       }
  //       return b;
  //     })
  //   );
  // };

  // const dropCardHandler = (e: DragEvent<HTMLDivElement>, board: IBoard) => {
  //   e.preventDefault();
  //   if (!currentItem || !currentBoard) {
  //     return;
  //   }
  //   board.items.push(currentItem);
  //   const currentIndex = currentBoard.items.indexOf(currentItem);
  //   currentBoard.items.splice(currentIndex, 1);

  //   setBoards(
  //     boards.map((b) => {
  //       if (b.id === board.id) {
  //         return board;
  //       }
  //       if (b.id === currentBoard.id) {
  //         return currentBoard;
  //       }
  //       return b;
  //     })
  //   );
  // };

  return (
    <div className="App">
      <div className="startDrag">
        {elements.map((smile) => (
          <Smile
            key={smile.id}
            data={smile}
            // onDragOver={(e) => dragOverHandler(e)}
            // onDrop={(e) => dropCardHandler(e, board)}
          />
        ))}
      </div>
      <div className="endDrag"></div>
    </div>
  );
}

export default App;
