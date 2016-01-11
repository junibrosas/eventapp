



/**
 * SeachAttendee 
 */
var SearchAttendee = React.createClass({
	getInitialState: function(){
		return {
			content: this.props.items,
			searchTerm : ''
		}
	},
	handleChange: function(){
		this.setState({
			searchTerm: this.refs.searchTerm.value 
		});
	},
	handleClick: function( data, index ){
		this.props.items[ index ].selected = true;

		// Get and set the chosen item
		this.setState({
			content: this.props.items 
		});

		// Return to parent component the selected item
		this.props.selectedItem( data );
	},
	render: function(){
		var rows = [];
		this.state.content.forEach( function( data, index ) {
			var classSelected = "pull-right checkcon";
			if( this.state.searchTerm.length <= 0 ) 
				return;
			if( data.name.indexOf( this.state.searchTerm) === -1 )
				return;  // Match each data item to the current search term
			
			if( data.selected ) classSelected += " selected";

			rows.push(
				<li key={ index } className="list-group-item">
					<span className={ classSelected } onClick={ this.handleClick.bind( this, data, index ) }><i className="fa fa-check-circle"></i></span>
					{ data.name }
				</li>
			);
		}.bind(this));
		return(
			<div>
				<form id="contact-form" className="wow bounceInUp" data-wow-offset="10" data-wow-delay="0.2s">
					<div className="form-group">
						<input ref="searchTerm" type="text" className="form-control input-lg" id="subject" placeholder="What are you looking?" required="required" onChange={ this.handleChange } />
					</div>
				</form>
				<ul className="list-attendees list-group wow bounceInUp"  data-wow-offset="5"  data-wow-delay="0.4s">
					{ rows }
				</ul>
			</div> 
		);
	}
});
/**
 * SearchAttendee END
 */






/**
 * Content Page Two
 */
var ContentPageTwo = React.createClass({
	getInitialState: function(){
		return { 
			attendee: this.props.attendee 
		};
	},
	handleClick: function(){
		this.props.selectedItem( {} ); // remove the selected attendee
	},
	catchSelectedAttendee: function( data ){
		this.props.selectedItem( data ); // Pass the selected data to parent component
	},
	render: function(){
		var welcomeMessage = this.state.attendee.message;
		if( ! welcomeMessage ) welcomeMessage = ""; // return empty message
		return (
			<div id="content-page-one ">
				<div className="text-center">
					<h3 className="h-bold"><b>Hi, { this.state.attendee.name }</b></h3>
				</div>
				<br/>
				<p><b>You are in!</b></p>
				<p>{ welcomeMessage }</p>
				<br/><br/>
				<div className="btn-group" role="group" aria-label="...">
					<button className="btn btn-md btn-primary"><i className="fa fa-thumbs-up"></i></button>
					<button className="btn btn-md btn-success"><i className="fa fa-user"></i></button>
				</div>
				<div className="pull-right">
					<button className="btn btn-md btn-danger" onClick={ this.handleClick }><i className="fa fa-search"></i> Find More</button>
				</div>
			</div>
		);
	}
});

/**
 * Content Page Two END
 */





/**
 * Content Page One
 */
var ContentPageOne = React.createClass({
	catchSelectedAttendee: function( data ){
		this.props.selectedItem( data ); // Pass the selected data to parent component
	},
	render: function(){
		return (
			<div id="content-page-one">
				<div className="text-center">
					<h3 className="h-bold"><b>Event Name</b></h3>
					<div className="divider-header"></div>
					<p>Give the best chill description of your event.</p>
				</div>
				<br/>
				<SearchAttendee items={ this.props.items } selectedItem={ this.catchSelectedAttendee } />
			</div>
		);
	}
});
/**
 * Content Page One END
 */








/**
 * AttendeeRegistration
 */
var AttendeeRegistration = React.createClass({
	getInitialState: function(){
		return { 
			attendee: {}
		};
	},
	catchSelectedAttendee: function( data ){
		this.setState({
			attendee: data
		});
	},
	render: function(){
		var hasAttendee = this.state.attendee.name === undefined? false : true;
		var content = null;
		if( hasAttendee ){
			content = <ContentPageTwo attendee={ this.state.attendee } selectedItem={ this.catchSelectedAttendee }  />;
		}else{
			content = <ContentPageOne items={ this.props.items } selectedItem={ this.catchSelectedAttendee } />;
		}

		return(
			<section id="event-sign" className="home-section nopadd-bot color-dark bg-gray">

				{ content }
				
			</section>
		);
	}
});
/**
 * AttendeeRegistration END
 */






/**
 * Initialization
 */
var ContentData = {
	AttendeeList: [
		{ name: 'John Doe' , selected: false, message: ""  },
		{ name: 'Rachel Baul', selected: false, message: "" },
		{ name: 'Rachel Jaro' , selected: false, message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
		{ name: 'Juni Brosas' , selected: false, message: "" },
		{ name: 'Asshurim Larita' , selected: false, message: "" },
		{ name:'Johnder Baul' , selected: false, message: "" }
	],
	AttendeeChosen: { }
};

ReactDOM.render(
	<AttendeeRegistration items={ ContentData.AttendeeList } selected={ ContentData.AttendeeChosen } />,
	document.getElementById('attendee-registration')
);