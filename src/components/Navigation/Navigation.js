import React from 'react';

const Navigation = ({statuschange,isSignedIn}) => {
	if (isSignedIn) {
		return(
		<nav style={{display: "flex", justifyContent: "flex-end"}}>
			<p onClick={() => statuschange("signout")} className="f3 link dim black underline pr3 pointer">Sign Out</p>
		</nav>
	);
	} else {
		return(
		<nav style={{display: "flex", justifyContent: "flex-end"}}>
			<p onClick={() => statuschange("signin")} className="f3 link dim black underline pr3 pointer">Sign In</p>
			<p onClick={() => statuschange("register")} className="f3 link dim black underline pr3 pointer">Register</p>
		</nav>

	);
	}
	
};

export default Navigation;