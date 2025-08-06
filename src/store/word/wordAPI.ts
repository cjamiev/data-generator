import api from "../../api";
import { Word } from "../../models/storage";

export const wordAPI = {
  fetchWords: (): Promise<{ data: Word[] }> =>
    new Promise<{ data: Word[] }>(resolve =>
      api
        .get('/storage/word/')
        .then((response) => {
          resolve({ data: response.data })
        })
    ),
  addWord: (word: Word): Promise<{ data: Word }> =>
    new Promise<{ data: Word }>(resolve =>
      api
        .post('/storage/word/', JSON.stringify(word))
        .then(() => {
          resolve({ data: word })
        })
    ),
  deleteWord: (wordId: string): Promise<{ data: string }> =>
    new Promise<{ data: string }>(resolve =>
      api
        .delete(`/storage/word/${wordId}`)
        .then(() => {
          resolve({ data: wordId })
        })
    )
}
