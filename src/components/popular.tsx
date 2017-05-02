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

import {
	ComponentBase,
} from "resub";

import { repoStore } from "stores/repostore";
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
	readonly repos: ReadonlyArray<Repo>;
}

class RepoGrid extends Component<RepoGridProps, {}> {
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
	readonly selectedLanguage: Language;
	readonly onSelect: (lang: Language) => void;
}

class SelectLanguage extends Component<SelectLanguageProps, {}> {
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

interface PopularState {
	readonly selectedLanguage: Language;
	readonly repos: ReadonlyArray<Repo>;
}

export class Popular extends ComponentBase<{}, PopularState> {
	protected _buildState(props: {}, initialBuild: boolean): Partial<PopularState> {
		return {
			selectedLanguage: repoStore.getLanguage(),
			repos: repoStore.getRepos(),
		};
	}

	private _updateLanguage(lang: Language) {
		repoStore.updateLanguage(lang);

		fetchPopularRepos(lang).then((repos) => {
			repoStore.setRepos(repos);
		});
	}

	public componentDidMount() {
		this._updateLanguage(this.state.selectedLanguage);
	}

	public render() {
		const langs: string[] = ["All", "Typescript", "Javascript", "Go", "Rust", "Elixir"];

		return (
			<View style={styles.container}>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this._updateLanguage.bind(this)}
				/>

				<RepoGrid repos={this.state.repos} />
			</View>
		)
	}
}

export default Popular;
