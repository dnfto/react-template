export type ApiSuccess<TData> = {
  readonly data: TData;
  readonly meta?: Record<string, unknown>;
};

export type ApiFailure = {
  readonly message: string;
  readonly code?: string;
  readonly status?: number;
  readonly details?: Record<string, unknown>;
};

export type ApiResponse<TData> = ApiSuccess<TData>;

export type PaginatedResponse<TItem> = ApiSuccess<readonly TItem[]> & {
  readonly pagination: {
    readonly page: number;
    readonly pageSize: number;
    readonly total: number;
    readonly pageCount: number;
  };
};
