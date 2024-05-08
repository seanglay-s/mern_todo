import { BaseRepository } from "./base.repository";

export class BaseService {
    protected repositories: { [key: string]: BaseRepository }
    constructor(repos: { [key: string]: BaseRepository }) {
        this.repositories = repos;
    }

    protected getRepository<R extends BaseRepository>(repoName: string): R {
        const repo = this.repositories[repoName];
        if (!repo) {
            throw new Error(`Repository "${repoName}" not found.`);
        }
        return repo as R;
    }
}