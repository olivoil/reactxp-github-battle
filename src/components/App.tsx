
import * as RX from "reactxp";
import {
	Component,
	Styles,
	Text,
	View,
} from "reactxp";

import { Popular } from "components/popular";

const styles = {
	container: Styles.createViewStyle({
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#f5fcff",
	}),
};

export class App extends Component<null, null> {
	render() {
		return (
			<View style={styles.container}>
				<Popular />
			</View>
		);
	}
}

export default App;
