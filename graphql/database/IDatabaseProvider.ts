export interface IDatabaseProvider {
    connect(): Promise<void>;
    find(collection: string, query: any): Promise<any>;
    insert(collection: string, data: any): Promise<void>;
    update(collection: string, query: any, data: any): Promise<void>;
    delete(collection: string, query: any): Promise<void>;
}
