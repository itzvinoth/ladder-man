import React from "react";
import { Route, Switch } from 'react-router-dom';

import Game from "./Game";

const Main = () => (
	<Switch>
		<Route exact path="/" component={Game}></Route>
	</Switch>
);

export default Main