export interface IDatabaseProvider {
    connect(): Promise<void>;
}
