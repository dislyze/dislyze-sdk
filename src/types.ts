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

type CollectFeedbackRequest = {}

type CollectFeedbackOptions = {
    title?: string;
    content: string;
    user?: DislyzeUser;
    company?: DislyzeCompany;
    feedbackCustomFields?: DislyzeCustomField[];
};

interface Window {
    dislyze: {
        apiKey: string;
        hideWidget: boolean;
        widgetPosition: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
        user: DislyzeUser | undefined;
        company: DislyzeCompany | undefined;
        feedbackCustomfields: DislyzeCustomField[]
    }
}
