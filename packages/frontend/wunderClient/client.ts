// Code generated by wunderctl. DO NOT EDIT.

import {
	GetUsersResponse,
	CreateMessageResponse,
	CreateMessageInput,
	GetMessagesResponse,
	GetMessagesInput,
	GetUserResponse,
	UpdateAvatarIdResponse,
	UpdateAvatarIdInput,
	UpdateProfileResponse,
	UpdateProfileInput,
	UserCreateResponse,
	UserCreateInput,
	UserUpdateResponse,
	UserUpdateInput,
	UserUpsertResponse,
	UserUpsertInput,
} from "./models";

export const WUNDERGRAPH_S3_ENABLED = true;
export const WUNDERGRAPH_AUTH_ENABLED = true;

export type Response<T> =
	| ResponseOK<T>
	| CachedResponse<T>
	| Refetch<T>
	| Lazy
	| Loading
	| Aborted
	| Error
	| None
	| RequiresAuthentication;

export interface ResponseOK<T> {
	status: "ok";
	body: T;
}

export interface CachedResponse<T> {
	status: "cached";
	body: T;
}

export interface RequiresAuthentication {
	status: "requiresAuthentication";
}

export interface Loading {
	status: "loading";
}

export interface Lazy {
	status: "lazy";
}

export interface Refetch<T> extends ResponseOK<T> {
	refetching: true;
}

export interface Aborted {
	status: "aborted";
}

export interface Error {
	status: "error";
	message: string;
}

export interface None {
	status: "none";
}
export interface UploadResponse {
	key: string;
}

export interface UploadConfig {
	provider: S3Provider;
	formData: FormData;
	abortSignal?: AbortSignal;
}
interface FetchConfig {
	method: "GET" | "POST";
	path: string;
	input?: Object;
	abortSignal?: AbortSignal;
	liveQuery?: boolean;
}

export interface MutateRequestOptions<Input = never> {
	input?: Input;
	abortSignal?: AbortSignal;
	refetchMountedQueriesOnSuccess?: boolean;
	lazy?: boolean;
}

export interface RequestOptions<Input = never, InitialState = never> {
	input?: Input;
	abortSignal?: AbortSignal;
	initialState?: InitialState;
	refetchOnWindowFocus?: boolean;
	lazy?: boolean;
}

export interface SubscriptionRequestOptions<Input = never> {
	input?: Input;
	abortSignal?: AbortSignal;
	stopOnWindowBlur?: boolean;
}

export type UserListener = (user: User | null) => void;

export interface User {
	provider: string;
	provider_id: string;
	email: string;
	email_verified: boolean;
	name: string;
	first_name: string;
	last_name: string;
	nick_name: string;
	description: string;
	user_id: string;
	avatar_url: string;
	location: string;
	roles?: string[];
	custom_claims?: { [key: string]: any };
	custom_attributes?: string[];
}

export type Headers = { [key: string]: string };

export interface ClientConfig {
	baseURL?: string;
	extraHeaders?: Headers;
}

export enum S3Provider {
	"minio" = "minio",
}

export enum AuthProviderId {
	"keycloak" = "keycloak",
	"github" = "github",
}

export interface AuthProvider {
	id: AuthProviderId;
	login: (redirectURI?: string) => void;
}

export class Client {
	constructor(config?: ClientConfig) {
		this.baseURL = config?.baseURL || this.baseURL;
		this.extraHeaders = config?.extraHeaders;
		this.user = null;
	}
	private logoutCallback: undefined | (() => void);
	public setLogoutCallback(cb: () => void) {
		this.logoutCallback = cb;
	}
	public setExtraHeaders = (headers: Headers) => {
		this.extraHeaders = headers;
	};
	private extraHeaders?: Headers;
	private readonly baseURL: string = "http://localhost:9991";
	private readonly applicationHash: string = "265bfa1e";
	private readonly applicationPath: string = "api/main";
	private readonly sdkVersion: string = "0.85.0";
	private csrfToken: string | undefined;
	private user: User | null;
	private userListener: UserListener | undefined;
	public setUserListener = (listener: UserListener) => {
		this.userListener = listener;
	};
	private setUser = (user: User | null) => {
		if (
			(user === null && this.user !== null) ||
			(user !== null && this.user === null) ||
			JSON.stringify(user) !== JSON.stringify(this.user)
		) {
			this.user = user;
			if (this.userListener !== undefined) {
				this.userListener(this.user);
			}
		}
	};
	public query = {
		GetUsers: async (options: RequestOptions<never, GetUsersResponse>) => {
			return await this.doFetch<GetUsersResponse>({
				method: "GET",
				path: "GetUsers",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		GetMessages: async (options: RequestOptions<GetMessagesInput, GetMessagesResponse>) => {
			return await this.doFetch<GetMessagesResponse>({
				method: "GET",
				path: "GetMessages",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		GetUser: async (options: RequestOptions<never, GetUserResponse>) => {
			return await this.doFetch<GetUserResponse>({
				method: "GET",
				path: "GetUser",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
	};
	public mutation = {
		CreateMessage: async (options: RequestOptions<CreateMessageInput, CreateMessageResponse>) => {
			return await this.doFetch<CreateMessageResponse>({
				method: "POST",
				path: "CreateMessage",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		UpdateAvatarId: async (options: RequestOptions<UpdateAvatarIdInput, UpdateAvatarIdResponse>) => {
			return await this.doFetch<UpdateAvatarIdResponse>({
				method: "POST",
				path: "UpdateAvatarId",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		UpdateProfile: async (options: RequestOptions<UpdateProfileInput, UpdateProfileResponse>) => {
			return await this.doFetch<UpdateProfileResponse>({
				method: "POST",
				path: "UpdateProfile",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		UserCreate: async (options: RequestOptions<UserCreateInput, UserCreateResponse>) => {
			return await this.doFetch<UserCreateResponse>({
				method: "POST",
				path: "UserCreate",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		UserUpdate: async (options: RequestOptions<UserUpdateInput, UserUpdateResponse>) => {
			return await this.doFetch<UserUpdateResponse>({
				method: "POST",
				path: "UserUpdate",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		UserUpsert: async (options: RequestOptions<UserUpsertInput, UserUpsertResponse>) => {
			return await this.doFetch<UserUpsertResponse>({
				method: "POST",
				path: "UserUpsert",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
	};

	public liveQuery = {
		GetUsers: (
			options: RequestOptions<never, GetUsersResponse>,
			cb: (response: Response<GetUsersResponse>) => void
		) => {
			return this.startSubscription<GetUsersResponse>(
				{
					method: "GET",
					path: "GetUsers",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
		GetMessages: (
			options: RequestOptions<GetMessagesInput, GetMessagesResponse>,
			cb: (response: Response<GetMessagesResponse>) => void
		) => {
			return this.startSubscription<GetMessagesResponse>(
				{
					method: "GET",
					path: "GetMessages",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
		GetUser: (options: RequestOptions<never, GetUserResponse>, cb: (response: Response<GetUserResponse>) => void) => {
			return this.startSubscription<GetUserResponse>(
				{
					method: "GET",
					path: "GetUser",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
	};

	public uploadFiles = async (config: UploadConfig): Promise<Response<UploadResponse[]>> => {
		try {
			// pass only files
			for (const pair of config.formData.entries()) {
				if (!(pair[1] instanceof Blob)) {
					config.formData.delete(pair[0]);
				}
			}
			const baseHeaders: Headers = {
				...this.extraHeaders,
				"WG-SDK-Version": this.sdkVersion,
			};
			const params = this.queryString({
				wg_api_hash: this.applicationHash,
			});
			if (this.csrfToken === undefined) {
				const res = await fetch(this.baseURL + "/" + this.applicationPath + "/auth/cookie/csrf", {
					headers: {
						...baseHeaders,
						Accept: "text/plain",
					},
					credentials: "include",
					mode: "cors",
				});
				this.csrfToken = await res.text();
			}
			const headers: Headers = {
				...baseHeaders,
				Accept: "application/json",
				"WG-SDK-Version": this.sdkVersion,
			};
			if (this.csrfToken) {
				headers["X-CSRF-Token"] = this.csrfToken;
			}
			const body = config.formData;
			const res = await fetch(
				this.baseURL + "/" + this.applicationPath + "/s3/" + config.provider + "/upload" + params,
				{
					headers,
					body,
					method: "POST",
					signal: config.abortSignal,
					credentials: "include",
					mode: "cors",
				}
			);
			if (res.status === 200) {
				const json = await res.json();
				return {
					status: "ok",
					body: json,
				};
			}
			throw new Error(`could not upload files, status: ${res.status}`);
		} catch (e: any) {
			return {
				status: "error",
				message: e.toString(),
			};
		}
	};
	private doFetch = async <T>(fetchConfig: FetchConfig): Promise<Response<T>> => {
		try {
			const params =
				fetchConfig.method !== "POST"
					? this.queryString({
							wg_variables: fetchConfig.input,
							wg_api_hash: this.applicationHash,
					  })
					: "";
			if (fetchConfig.method === "POST" && this.csrfToken === undefined) {
				const res = await fetch(this.baseURL + "/" + this.applicationPath + "/auth/cookie/csrf", {
					credentials: "include",
					mode: "cors",
				});
				this.csrfToken = await res.text();
			}
			const headers: Headers = {
				...this.extraHeaders,
				Accept: "application/json",
				"WG-SDK-Version": this.sdkVersion,
			};
			if (fetchConfig.method === "POST") {
				if (this.csrfToken) {
					headers["X-CSRF-Token"] = this.csrfToken;
				}
			}
			const body = fetchConfig.method === "POST" ? JSON.stringify(fetchConfig.input) : undefined;
			const data = await this.fetch(
				this.baseURL + "/" + this.applicationPath + "/operations/" + fetchConfig.path + params,
				{
					headers,
					body,
					method: fetchConfig.method,
					signal: fetchConfig.abortSignal,
					credentials: "include",
					mode: "cors",
				}
			);
			return {
				status: "ok",
				body: data,
			};
		} catch (e: any) {
			return {
				status: "error",
				message: e,
			};
		}
	};
	private inflight: {
		[key: string]: {
			reject: (reason?: any) => void;
			resolve: (value: globalThis.Response | PromiseLike<globalThis.Response>) => void;
		}[];
	} = {};
	private fetch = (input: globalThis.RequestInfo, init?: RequestInit): Promise<any> => {
		const key = input.toString();
		return new Promise<any>(async (resolve, reject) => {
			if (this.inflight[key]) {
				this.inflight[key].push({ resolve, reject });
				return;
			}
			this.inflight[key] = [{ resolve, reject }];
			try {
				const res = await fetch(input, init);
				const inflight = this.inflight[key];
				if (res.status === 200) {
					const json = await res.json();
					delete this.inflight[key];
					setTimeout(() => {
						inflight.forEach((cb) => cb.resolve(json));
					}, 0);
				}
				if (res.status >= 401 && res.status <= 499) {
					this.csrfToken = undefined;
					delete this.inflight[key];
					inflight.forEach((cb) => cb.reject("unauthorized"));
					this.fetchUser();
				}
			} catch (e: any) {
				const inflight = this.inflight[key];
				delete this.inflight[key];
				inflight.forEach((cb) => cb.reject(e));
			}
		});
	};

	private startSubscription = <T>(fetchConfig: FetchConfig, cb: (response: Response<T>) => void) => {
		(async () => {
			try {
				const params = this.queryString({
					wg_variables: fetchConfig.input,
					wg_live: fetchConfig.liveQuery === true ? true : undefined,
				});
				const response = await fetch(
					this.baseURL + "/" + this.applicationPath + "/operations/" + fetchConfig.path + params,
					{
						headers: {
							...this.extraHeaders,
							"Content-Type": "application/json",
							"WG-SDK-Version": this.sdkVersion,
						},
						method: fetchConfig.method,
						signal: fetchConfig.abortSignal,
						credentials: "include",
						mode: "cors",
					}
				);
				if (response.status === 401) {
					this.csrfToken = undefined;
					return;
				}
				if (response.status !== 200 || response.body == null) {
					return;
				}
				const reader = response.body.getReader();
				const decoder = new TextDecoder();
				let message: string = "";
				while (true) {
					const { value, done } = await reader.read();
					if (done) break;
					if (!value) continue;
					message += decoder.decode(value);
					if (message.endsWith("\n\n")) {
						cb({
							status: "ok",
							body: JSON.parse(message.substring(0, message.length - 2)),
						});
						message = "";
					}
				}
			} catch (e: any) {
				cb({
					status: "error",
					message: e,
				});
			}
		})();
	};

	private queryString = (input?: Object): string => {
		if (!input) {
			return "";
		}
		const query = (Object.keys(input) as Array<keyof typeof input>)
			// @ts-ignore
			.filter((key) => input[key] !== undefined && input[key] !== "")
			.map((key) => {
				const value = typeof input[key] === "object" ? JSON.stringify(input[key]) : input[key];
				const encodedKey = encodeURIComponent(key);
				// @ts-ignore
				const encodedValue = encodeURIComponent(value);
				return `${encodedKey}=${encodedValue}`;
			})
			.join("&");
		return query === "" ? query : "?" + query;
	};
	public fetchUser = async (revalidate?: boolean): Promise<User | null> => {
		try {
			const revalidateTrailer = revalidate === undefined ? "" : "?revalidate=true";
			const response = await fetch(
				this.baseURL + "/" + this.applicationPath + "/auth/cookie/user" + revalidateTrailer,
				{
					headers: {
						...this.extraHeaders,
						"Content-Type": "application/json",
						"WG-SDK-Version": this.sdkVersion,
					},
					method: "GET",
					credentials: "include",
					mode: "cors",
				}
			);
			if (response.status === 200) {
				const user = await response.json();
				this.setUser(user);
				return this.user;
			}
		} catch {}
		this.setUser(null);
		return null;
	};
	public login: Record<AuthProviderId, AuthProvider["login"]> = {
		keycloak: (redirectURI?: string): void => {
			this.startLogin(AuthProviderId.keycloak, redirectURI);
		},
		github: (redirectURI?: string): void => {
			this.startLogin(AuthProviderId.github, redirectURI);
		},
	};
	public authProviders: Array<AuthProvider> = [
		{
			id: AuthProviderId.keycloak,
			login: this.login[AuthProviderId.keycloak],
		},
		{
			id: AuthProviderId.github,
			login: this.login[AuthProviderId.github],
		},
	];
	public logout = async (): Promise<boolean> => {
		const response = await fetch(this.baseURL + "/" + this.applicationPath + "/auth/cookie/user/logout", {
			headers: {
				...this.extraHeaders,
				"Content-Type": "application/json",
				"WG-SDK-Version": this.sdkVersion,
			},
			method: "GET",
			credentials: "include",
			mode: "cors",
		});
		this.setUser(null);
		if (this.logoutCallback) {
			this.logoutCallback();
		}
		return response.status === 200;
	};
	private startLogin = (providerID: AuthProviderId, redirectURI?: string) => {
		const query = this.queryString({
			redirect_uri: redirectURI || window.location.toString(),
		});
		window.location.replace(`${this.baseURL}/${this.applicationPath}/auth/cookie/authorize/${providerID}${query}`);
	};
}
