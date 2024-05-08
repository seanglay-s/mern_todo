export abstract class BaseRepository {
    abstract findAll(): Promise<any[]>;
    abstract findById(id: number): Promise<any>;
    abstract create(param: any): Promise<any>;
    abstract delete(id: number): Promise<void>;
    abstract update(param: any): Promise<any>;
}