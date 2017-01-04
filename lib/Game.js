import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";
import _ from "lodash";


class Game extends React.Component{
	constructor(props){
		super(props);
		this.state={
			gameState:'ready',
			correctGuesses:[],
			wrongGuesses:[]
		};
		
		this.matrix=[];
		
		for(let r=0;r<this.props.rows;r++){
			let row=[];
			for(let c=0;c<this.props.columns;c++){
				row.push(`${r}${c}`);
			}
			
			this.matrix.push(row);
		}
		
		let flattenedMatrix = _.flattenDeep(this.matrix);
		this.activeCells = _.sampleSize(flattenedMatrix,6);
		
	}
	
	componentDidMount(){
		
		setTimeout(()=>{
			this.setState({
				gameState:'memorize'
			}, ()=>{
				setTimeout(()=>{
					this.setState({
						gameState:'recall'
					})
				},2000);
			});
		},2000);
	}
	
	recordGuess({cellId,userGuessIsCorrect}){
		let {wrongGuesses, correctGuesses} = this.state;

		if(userGuessIsCorrect){
			correctGuesses.push(cellId);
		}else{
			wrongGuesses.push(cellId);
		}
		
		this.setState({wrongGuesses,correctGuesses});
	}
	render(){
		
		
		return (
			<div className="grid">
			{this.matrix.map((row, rowIndex)=>(
			
				<Row key={rowIndex}>
					{row.map((cellIndex)=><Cell key={cellIndex} id={cellIndex} activeCells={this.activeCells} {...this.state} guessAnswer={this.recordGuess.bind(this)}/>)}
				</Row>
			))}
			<Footer {...this.state} />
			</div>
		);
	}
}

export default Game;