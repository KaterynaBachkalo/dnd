import React, { useState, DragEvent } from "react";
import "./App.css";

interface IBoard {
  id: number;
  title: string;
  items: ICard[];
}

interface ICard {
  id: number;
  title: string;
}

function App() {
  const [boards, setBoards] = useState<IBoard[]>([
    {
      id: 1,
      title: "Зробити",
      items: [
        { id: 1, title: "Піти в магазин" },
        { id: 2, title: "Викинути сміття" },
        { id: 3, title: "Поїсти" },
      ],
    },
    {
      id: 2,
      title: "Перевірити",
      items: [
        { id: 4, title: "Код рев'ю" },
        { id: 5, title: "Задача" },
        { id: 6, title: "Інші задачі" },
      ],
    },
    {
      id: 3,
      title: "Зроблено",
      items: [
        { id: 7, title: "Зняти відео" },
        { id: 8, title: "Змонтувати" },
        { id: 9, title: "Відрендерити" },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
  const [currentItem, setCurrentItem] = useState<ICard | null>(null);

  const dragStartHandler = (
    e: DragEvent<HTMLDivElement>,
    board: IBoard,
    item: ICard
  ) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;

    if (target.className === "item") {
      target.style.boxShadow = "0 4px 3px gray";
    }
  };

  const dropHandler = (
    e: DragEvent<HTMLDivElement>,
    board: IBoard,
    item: ICard
  ) => {
    e.preventDefault();
    if (!currentItem || !currentBoard) {
      return;
    }
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  };

  const dropCardHandler = (e: DragEvent<HTMLDivElement>, board: IBoard) => {
    e.preventDefault();
    if (!currentItem || !currentBoard) {
      return;
    }
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  };

  return (
    <div className="app">
      {boards.map((board) => (
        <div
          className={"board"}
          key={board.id}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className={"board-title"} key={board.id}>
            {board.title}
          </div>
          {board.items.map((item) => (
            <div
              className={"item"}
              key={item.id}
              draggable={true}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
