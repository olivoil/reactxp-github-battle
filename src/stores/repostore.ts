
import {
    StoreBase,
    AutoSubscribeStore,
    autoSubscribeWithKey,
} from "resub";

const TriggerKeys = {
    LanguageSelected: "language",
    ReposChanged: "repos",
};

@AutoSubscribeStore
export class RepoStore extends StoreBase {
    private _repos: Repo[] = [];
    private _lang: Language = "All";

    public addRepos(repos: Repo[]) {
        this._repos = this._repos.concat(repos);
        this.trigger(TriggerKeys.ReposChanged);
    }

    public setRepos(repos: Repo[]) {
        this._repos = [];
        this.addRepos(repos);
    }

    @autoSubscribeWithKey(TriggerKeys.ReposChanged)
    public getRepos() {
        return this._repos;
    }

    public updateLanguage(lang: Language) {
      this._lang = lang;
        this.trigger(TriggerKeys.LanguageSelected);
    }

    @autoSubscribeWithKey(TriggerKeys.LanguageSelected)
    public getLanguage() {
        return this._lang;
    }
}

export const repoStore = new RepoStore;
