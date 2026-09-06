export interface DatabaseService {
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | string,
    ...values: unknown[]
  ): Promise<T>;
}