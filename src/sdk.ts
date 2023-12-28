type InitDislyzeOptions = {
    apiKey: string;
    hideWidget?: boolean;
    widgetPosition?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
    user?: DislyzeUser;
    company?: DislyzeCompany;
    feedbackCustomFields?: DislyzeCustomField[];
};

type DislyzeUser = {
    id: string;
    name?: string;
    customFields?: DislyzeCustomField[];
}

type DislyzeCompany = {
    id: string;
    name?: string;
    customFields?: DislyzeCustomField[];
};

type DislyzeCustomField = {
    name: string;
    value: string | number | null;
}

type CollectFeedbackOptions = {
    title?: string;
    content: string;
    user?: DislyzeUser;
    company?: DislyzeCompany;
    feedbackCustomFields?: DislyzeCustomField[];
};

export function initDislyze(options: InitDislyzeOptions, devModeUrl?: string): void {
    if (!options.apiKey) {
        throw new Error("Require apiKey to initialize dislyze SDK.");
    }

    if (!window.dislyze) {
        window.dislyze = {} as any
    }

    window.dislyze.apiKey = options.apiKey;
    window.dislyze.hideWidget = options.hideWidget ?? false;
    window.dislyze.widgetPosition = options.widgetPosition ?? "bottomRight"
    window.dislyze.company = options.company;
    window.dislyze.user = options.user;
    window.dislyze.feedbackCustomfields = options.feedbackCustomFields ?? [];
    
    if (devModeUrl) {
        window.dislyze.devModeUrl = devModeUrl
    }

    if (options.hideWidget !== true) {
        let dislyzeWidget = document.createElement('dislyze-widget');
        document.documentElement.appendChild(dislyzeWidget);
    }
}

export async function collectFeedback(params: CollectFeedbackOptions): Promise<{ error?: string }> {
    const url = window.dislyze.devModeUrl ?? "https://app.dislyze.com"
    const res = await fetch(`${url}/api/sdk/feedback`, {
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

export * from "./DislyzeWidget.svelte"