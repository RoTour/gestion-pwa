import { applyAction } from '$app/forms';
import { appIsLoading } from '$lib/stores/appIsLoading.store';
import type { ActionResult } from '@sveltejs/kit';

export const handleSubmit = async (actions?: { onStart?: () => void; onDone?: () => void }) => {
	appIsLoading.set(true);
	actions?.onStart?.();
	return async ({ result }: { result: ActionResult }) => {
		await applyAction(result);
		actions?.onDone?.();
		appIsLoading.set(false);
	};
};
