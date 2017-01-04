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
	
	
	render(){
		let className = "cell";
		if(this.props.gameState === 'memorize' && this.active()){
			className += " active";
		}
		return (
			<div className={className}>
			{this.props.id}
			</div>
		);
	}
}

export default Cell;