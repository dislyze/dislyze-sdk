export function initDislyze(options: InitDislyzeOptions): void

export function collectFeedback(params: CollectFeedbackOptions): Promise<{ error?: string }>

export type InitDislyzeOptions = {
    apiKey: string;
    hideWidget?: boolean;
    widgetPosition?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
    user?: DislyzeUser;
    company?: DislyzeCompany;
    feedbackCustomFields?: DislyzeCustomField[];
};

export type DislyzeUser = {
    id: string;
    name?: string;
    customFields?: DislyzeCustomField[];
}

export type DislyzeCompany = {
    id: string;
    name?: string;
    customFields?: DislyzeCustomField[];
};

export type DislyzeCustomField = {
    name: string;
    value: string | number | null;
}

export type CollectFeedbackOptions = {
    title?: string;
    content: string;
    user?: DislyzeUser;
    company?: DislyzeCompany;
    feedbackCustomFields?: DislyzeCustomField[];
};
