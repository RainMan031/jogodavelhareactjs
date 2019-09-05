import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



function Square(props) {

  return (
    <button style={props.style} className="square"  onClick={props.onClick}>
      {props.value}
    </button>
  );
}
o
function Board(props){
  const current= props.squares.slice();
  const vetSquaresWinner = calculateWinner(current);

  function renderSquare(i) {
    var style={}
    if(vetSquaresWinner){
      for(let j=0;j<3;j++){
        if(vetSquaresWinner[j]===i){
          style={backgroundColor:'#237401'};
          
        }
      }
    }


    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => {props.onClick(i)}}
        style={style}

      />
    );
  }

  function renderRow(numRow){
    var row = []
    for(let i=numRow*3;i<numRow*3+3;i++){

      row.push(renderSquare(i));

    }
    return(
      <div key={numRow} className="board-row">
          {row}
      </div>
    );
  }

  function renderRows(numRows){
    var rows = [];

    for (let i=0;i<numRows;i++){
      rows.push(renderRow(i));
    }

    return(rows);
  }


    return (
      <div>
        {renderRows(3)}
      </div>
    );

}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isCrescente:true,



    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,


    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  handleClickOrdem(){
    console.log("Entrou no handleClickOrdem()");
    if (this.state.isCrescente) {
      this.setState({
        isCrescente:false
      });
    } else {
      this.setState({
        isCrescente:true
      });
    }
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];

    var winner = calculateWinner(current.squares);




    let jogadas = history.map((element, index) => {

      const valueButton = index ?
        'Go to move #' + index :
        'Go to game start';

      let style;

      if(index === this.state.stepNumber){

        style={fontWeight:'bold'};
      }else{
        style={};
      }



      return (
        <li key={index}>
          <button
          onClick={() => this.jumpTo(index)}
          style={style} >
            {valueButton}
          </button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = "Winner: " + (this.state.xIsNext ? "O" : "X") ;

    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    let ordem="As jogadas encontram-se em ordem: ";

    if (this.state.isCrescente) {
      ordem +="CRESCENTE";
    } else {
      jogadas=jogadas.reverse();
      ordem +="DECRESCENTE";
    }

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <br/>
            <div>{ordem}</div>
            <br/>
            <button  onClick={()=>this.handleClickOrdem()}>
              Clique aqui para inverter a ordem atual das jogadas
            </button>
          </div>

        </div>
        <div className="jogadas" >
           <p>JOGADAS:</p>
          <ol reversed={!this.state.isCrescente} >{jogadas}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //se a existe e a==b e a==c
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // retorna 'X' ou 'O', podia retornar squares[a],[b] ou [c]
      return lines[i];
    }
  }
  return null;
}
