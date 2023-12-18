export function initDislyze(options: InitDislyzeOptions): void {
    if (!options.apiKey) {
        throw new Error("Require apiKey to initialize dislyze SDK.")
    }

    if (!window.dislyze) {
        window.dislyze = {
            apiKey: options.apiKey,
            hideWidget: options.hideWidget ?? false,
            widgetPosition: options.widgetPosition ?? "bottomRight",
            company: options.company,
            user: options.user,
            feedbackCustomfields: options.feedbackCustomFields ?? [],
        }
    }
}

export async function collectFeedback(params: CollectFeedbackOptions): Promise<{ error?: string }> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sdk/feedback`, {
        method: "post",
        body: JSON.stringify({
            apiKey: window.dislyze.apiKey,
            title: params.title,
            content: params.content,
            company: params.company ?? window.dislyze.company,
            user: params.user ?? window.dislyze.user,
            feedbackCustomFields: params.feedbackCustomFields ?? window.dislyze.feedbackCustomfields
        })
    })
    return await res.json()
}

export * from './DislyzeWidget.svelte'