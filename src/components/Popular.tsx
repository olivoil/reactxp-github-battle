
import * as RX from "reactxp";
import {
	Component,
	Styles,
	Text,
	Types,
	View,
} from "reactxp";
import { Record } from "immutable";
// import { fetchPopularRepos } from "services/github";

const textStyle: Partial<Types.TextStyle> = {
	fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
	textAlign: "center",
	fontWeight: "bold",
}

const styles = {
	list: Styles.createViewStyle({
		flexDirection: "row",
		justifyContent: "space-between",
		minWidth: 300,
		maxWidth: 400,
		margin: 20,
	}),
	item: Styles.createViewStyle({
		cursor: "pointer",
		margin: 10,
	}),
	text: Styles.createTextStyle({
		...textStyle,
	}),
	selectedText: Styles.createTextStyle({
		...textStyle,
		color: "#d0021b",
	})
}

// type Language = "All" | "Typescript" | "Javascript" | "Go" | "Rust" | "Elixir";

interface SelectLanguageProps {
	selectedLanguage: Language;
	onSelect: (lang: Language) => void;
}

class SelectLanguage extends Component<SelectLanguageProps, null> {
	render() {
		const langs: string[] = ["All", "Typescript", "Javascript", "Go", "Rust", "Elixir"];

		return (
			<View style={styles.list}>
				{
					langs.map((l) => {
						return (
							<View style={styles.item} key={l} onPress={this.props.onSelect.bind(null, l)}>
								<Text style={l === this.props.selectedLanguage ? styles.selectedText : styles.text}>{l}</Text>
							</View>
						)
					})
				}
			</View>
		);
	}
}

interface IPopularState {
	selectedLanguage: Language;
}

interface PopularState {
	record: Record.Instance<IPopularState>;
}

export class Popular extends Component<null, PopularState> {
	constructor() {
		super();

		this.state = {
			record: new (Record<IPopularState>({
				selectedLanguage: "All",
			}))
		};
	}

	updateLanguage(lang: Language) {
		this.setState(({ record }) => ({
			record: record.update("selectedLanguage", (l) => lang)
		}))
	}

	render() {
		const langs: string[] = ["All", "Typescript", "Javascript", "Go", "Rust", "Elixir"];
		const selectedLanguage = this.state.record.get("selectedLanguage");
		const updateLanguage = this.updateLanguage.bind(this);

		return (
			<SelectLanguage
				selectedLanguage={this.state.record.get("selectedLanguage")}
				onSelect={updateLanguage}
			/>
		)
	}
}

export default Popular;
