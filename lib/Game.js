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
					},()=>{
						this.secondRemaining = this.props.timeoutSeconds;
						this.timeoutCountdown = setInterval(()=>{
							console.log('Countdown: ' ,this.secondRemaining);
							if(--this.secondRemaining === 0 )
							{
								
								this.setState({
									gameState:'lost'
								});
								clearInterval(this.timeoutCountdown);
							}
						},1000);
					})
				},2000);
			});
		},2000);
	}
	
	recordGuess({cellId,userGuessIsCorrect}){
		let {wrongGuesses, correctGuesses, gameState} = this.state;
		
		if(userGuessIsCorrect){
			if(correctGuesses.length === this.props.activeCellsCount){
				gameState = 'won';
			}
			correctGuesses.push(cellId);
		}else{
			if(wrongGuesses.length > this.props.allowedWrongAttemps){
				gameState = 'lost';
			}
			wrongGuesses.push(cellId);
		}
		
		this.setState({wrongGuesses,correctGuesses, gameState});
	}
	render(){
		
		let showActiveCells = ['memorize','lost'].indexOf(this.props.gameState) >= 0;
		console.log('game render func');
		return (
			<div className="grid">
			{this.matrix.map((row, rowIndex)=>(
			
				<Row key={rowIndex}>
					{row.map((cellIndex)=><Cell key={cellIndex} id={cellIndex} activeCells={this.activeCells} {...this.state} guessAnswer={this.recordGuess.bind(this)} showActiveCells={showActiveCells}/>)}
				</Row>
			))}
			<Footer {...this.state} activeCellsCount={this.props.activeCellsCount} />
			</div>
		);
	}
}

Game.defaultProps = {
	allowedWrongAttemps:2,
	timeoutSeconds :10
}

export default Game;