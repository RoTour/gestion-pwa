import { json as sveltekitJson } from '@sveltejs/kit'

export const json = <T = undefined>(content: App.ApiResponse<T>, responseInit?: ResponseInit) => {
	return sveltekitJson(content, responseInit)
}