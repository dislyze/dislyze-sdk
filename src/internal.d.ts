interface Window {
    dislyze: {
        apiKey: string;
        hideWidget: boolean;
        widgetPosition: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
        user: DislyzeUser | undefined;
        company: DislyzeCompany | undefined;
        feedbackCustomfields: DislyzeCustomField[]
        devModeUrl?: string
    }
}
