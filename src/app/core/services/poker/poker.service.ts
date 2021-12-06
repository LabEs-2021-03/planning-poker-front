import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { IAddUser, playerPoker, Poker,  IResponseGetPokerById  } from "../../interfaces/poker/poker"

import { UserStory } from "../../interfaces/user-story/user-story"
import { BaseService } from "../base.service"


@Injectable({
	providedIn: "root"
})
export class PokerService extends BaseService<Poker> {
	constructor(protected httpClient: HttpClient) {
		super("/api/poker", httpClient)
	}

	getPokerRelatedToUser(): Observable<Poker[]> {
		return this.httpClient.get<any>(
			`${this.baseUrl}/fromUser`,
			this.httpOptions
		)
	}

	getPlayersFromPoker(id: string): Observable<playerPoker[]> {
		return this.httpClient.get<any>(
			`${this.baseUrl}/${id}/playersByPoker`,
			this.httpOptions
		)
	}

	getPokerById(id: string): Observable<IResponseGetPokerById> {
		return this.httpClient.get<any>(`${this.baseUrl}/${id}`, this.httpOptions)
	}

	deletePokerById(id: string): Observable<{ id: string }> {
		return this.httpClient.delete<any>(`${this.baseUrl}/${id}`, this.httpOptions)
	}


	closePokerById(id: string): Observable<{ updateId: string }> {
		return this.httpClient.put<any>(`${this.baseUrl}/${id}/closePoker`, this.httpOptions)
	}
	getStoriesFromPoker(id: string): Observable<UserStory[]> {
		return this.httpClient.get<any>(
			`${this.baseUrl}/${id}/stories`,
			this.httpOptions
		)
	}

	addUser(payload: IAddUser): Observable<{id: string}> {
		return this.httpClient.post<any>(
			`${this.baseUrl}/addUser`,
			payload,
			this.httpOptions
		)
	}
	closePoker(idPoker: string) {
		return this.httpClient.put<any>(
			`${this.baseUrl}/${idPoker}/closePoker`,
			{ idPoker },
			this.httpOptions
		)
	}

	closeAllRoundsOpenedByIdPoker(idPoker: string) {
		return this.httpClient.put<any>(
			`${this.baseUrl}/${idPoker}/closeAllRounds`,
			{ idPoker },
			this.httpOptions
		)
	}
}
