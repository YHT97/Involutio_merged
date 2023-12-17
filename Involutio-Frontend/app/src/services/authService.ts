import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../models/IUser.ts";
import { IUserRequest } from "../models/IUserRequest.ts";

export const AuthService = createApi({
	reducerPath : "auth-service",
	baseQuery : fetchBaseQuery({
		baseUrl : "https://involutio.the-omnia.ru/api/v3"
	}),
	endpoints : (build) => ({
		signIn : build.mutation<IUser, IUserRequest>({
			query : ( auth ) => ({
				url : "/authentication",
				headers : {
					"Content-Type": "application/json",
				},
				method: "POST",
				redirect: "follow",
				body: JSON.stringify(auth)
			})
		}),
		getUser : build.query<IUser, any>({
			query : () => ({
				url : "/authentication",
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		})
	})
})

export const {
	useSignInMutation,
	useGetUserQuery
} = AuthService;