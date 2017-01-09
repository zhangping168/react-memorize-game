class Footer extends React.Component{
	remainingCount(){
		let remainingCount = this.props.activeCellsCount - this.props.correctGuesses.length;
		if(this.props.gameState !== 'recall'){ return null;}
		return (
			<div className="remaining-count">
			Still <b>{remainingCount}</b> puzzles left
			</div>
		);
	}
	playAgainButton(){
		if(['won','lost'].indexOf(this.props.gameState) >= 0)
		return (
			<button className="playAgainButton" onClick={this.props.playAgain}>
				Play Again
			</button>
		);
	}
	render(){
		return (
			<div className="footer">
				<div className="hint">
				{this.props.hints[this.props.gameState]}
				</div>
				{this.remainingCount()}
				{this.playAgainButton()}
			</div>
		);
	}
}

Footer.defaultProps = {
	hints:{
		ready:'Get Ready',
		memorize:'Memorize',
		recall:'Recall',
		won:'Well Played',
		lost:'Game Over'
	}
}
export default Footer;