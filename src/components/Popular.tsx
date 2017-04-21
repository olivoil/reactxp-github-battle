import * as RX from "reactxp";
import {
	Component,
	Image,
	Link,
	Styles,
	Text,
	Types,
	UserInterface,
	View,
} from "reactxp";
import { Record } from "immutable";
import { fetchPopularRepos } from "services/github";

const textStyle: Partial<Types.TextStyle> = {
	fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
	textAlign: "center",
	fontWeight: "bold",
}

const styles = {
	container: Styles.createViewStyle({
		alignItems: "center",
		justifyContent: "center",
	}),
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
	}),
	repoGrid: Styles.createViewStyle({
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		minWidth: UserInterface.measureWindow().width,
	}),
	repo: Styles.createViewStyle({
		margin: 20,
		minWidth: 100,
		maxWidth: 150,
		justifyContent: "center",
		alignItems: "center",
		overflow: "visible",
	}),
	repoText: Styles.createTextStyle({
		textAlign: "center",
		maxHeight: 20,
		minWidth: 200,
		maxWidth: 200,
		overflow: "visible",
	}),
	repoItems: Styles.createViewStyle({
		marginBottom: 7,
		justifyContent: "center",
		overflow: "visible",
		alignItems: "center",
	}),
	repoImage: Styles.createImageStyle({
		width: 150,
		height: 150,
		borderRadius: 75,
	}),
}

interface RepoGridProps {
	repos: Repo[];
}

class RepoGrid extends Component<RepoGridProps, null> {
	render() {
		return (
			<View style={styles.repoGrid}>
				{this.props.repos.map((repo, index) => {
					return (
						<View key={repo.name} style={styles.repo}>
							<Text style={styles.repoText}>#{index + 1}</Text>
							<View style={styles.repoItems}>
								<Image
									style={styles.repoImage}
									source={repo.owner.avatar_url}
									title={repo.owner.login}
									resizeMode="stretch"
									resizeMethod="scale" />
								<Link style={styles.repoText} url={repo.html_url}>{repo.name}</Link>
								<Text style={styles.repoText}>@{repo.owner.login}</Text>
								<Text style={styles.repoText}>{repo.stargazers_count} stars</Text>
					 		</View> 
						</View>
					)
				})}
			</View>
		)
	}
}

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
	repos: Repo[];
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
				repos: [],
			}))
		};
	}

	componentDidMount() {
		this.updateLanguage(this.state.record.get("selectedLanguage"));
	}

	updateLanguage(lang: Language) {
		this.setState(({ record }) => ({
			record: record.update("selectedLanguage", (l) => lang).update("repos", (r) => [])
		}));

		fetchPopularRepos(lang).then((repos) => {
			this.setState(({ record }) => ({
				record: record.update("repos", (r) => repos)
			}));
		});
	}

	render() {
		const langs: string[] = ["All", "Typescript", "Javascript", "Go", "Rust", "Elixir"];
		const selectedLanguage = this.state.record.get("selectedLanguage");
		const updateLanguage = this.updateLanguage.bind(this);

		return (
			<View style={styles.container}>
				<SelectLanguage
					selectedLanguage={this.state.record.get("selectedLanguage")}
					onSelect={updateLanguage}
				/>

				<RepoGrid
					repos={this.state.record.get("repos")}
				/>
			</View>
		)
	}
}

export default Popular;
