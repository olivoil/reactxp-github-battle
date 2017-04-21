
import axios from "axios";

export function fetchPopularRepos(lang: Language) {
	const uri = `https://api.github.com/search/repositories?${encodeURI(`q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`)}`;
	return axios.get(uri).then((r) => r.data.items);
}