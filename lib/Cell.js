class Cell extends React.Component{
	constructor(props){
		super(props);
		this.className="cell";
	}
	active(){
		let activeCells = this.props.activeCells;
		let id = this.props.id;
		
		return activeCells.indexOf(id) >=0 ;
	}
		
	handleClick(){
		if(this.props.gameState === 'recall' && this.checkGuess() === undefined){
			this.props.guessAnswer({
					cellId:this.props.id,
					userGuessIsCorrect:this.active()
				}
			);
		}
		
	}
	
	checkGuess(){
		//check cell id if in the correct guesses array or wrong guesses array
		if(this.props.correctGuesses.indexOf(this.props.id) >=0) //correct guess
		{
			return true;
		}else if(this.props.wrongGuesses.indexOf(this.props.id)>=0) //wrong guess
		{
			return false;
		}
	}
	
	render(){
		let className = "cell";
		if(this.props.showActiveCells && this.active()){
			className += " active";
		}
		if(this.props.gameState === 'recall'){
			className += " guess-" + this.checkGuess();
		}
		
		return (
			<div className={className} onClick={this.handleClick.bind(this)}>
			{this.props.id}
			</div>
		);
	}
}

export default Cell;