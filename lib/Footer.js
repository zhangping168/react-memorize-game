class Footer extends React.Component{
	remainingCount(){
		let remainingCount = this.props.activeCellsCount - this.props.correctGuesses.length;
		return (
			<div className="remaining-count">
			Still <b>{remainingCount}</b> puzzles left
			</div>
		);
	}
	render(){
		return (
			<div className="footer">
				<div className="hint">
				{this.props.hints[this.props.gameState]}
				</div>
				{this.remainingCount()}
			</div>
		);
	}
}

Footer.defaultProps = {
	hints:{
		ready:'Get Ready',
		memorize:'Memorize',
		recall:'Recall'
	}
}
export default Footer;