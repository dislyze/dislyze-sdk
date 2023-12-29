<svelte:options customElement="dislyze-widget" />

<script lang="ts">
    import { fade } from "svelte/transition";

    let isWidgetOpen = false;
    let title = ""
    let content = ""
    let errorMessage = ""
    let submittedSuccessfully = false
    let inputFieldSuccess = false
    
    const toggleWidget = () => {
        isWidgetOpen = !isWidgetOpen
    }

    const getIconPositionStyle = () => {
        switch (window.dislyze.widgetPosition) {
            case "topLeft":
                return "left: 16px; top: 16px;"
            case "topRight":
                return "right: 16px; top: 16px;"
            case "bottomLeft":
                return "left: 16px; bottom: 16px;"
            default:
                return "right: 16px; bottom: 16px;"
        }
    }

    const getBoxPositionStyle = () => {
        switch (window.dislyze.widgetPosition) {
            case "topLeft":
                return "left: 16px; top: 72px;"
            case "topRight":
                return "right: 16px; top: 72px;"
            case "bottomLeft":
                return "left: 16px; bottom: 72px;"
            default:
                return "right: 16px; bottom: 72px;"
        }
    }

    $: getSuccessStyle = () => {
        if (!inputFieldSuccess) {
            return "margin-bottom:16px;"
        }
        return "margin-bottom:16px;border:1.5px solid #a3e635;"
    }

    $: getContentStyle = () => {
        if (!errorMessage) {
            return "margin-bottom:16px;"
        }
        return "margin-bottom:16px;border:1.5px solid #f87171;"
    }

    const submitFeedback = async () => {
        const url = window.dislyze.devModeUrl ?? "https://app.dislyze.com"
        const res = await fetch(`${url}/api/sdk/feedback`, {
            method: "post",
            body: JSON.stringify({
                apiKey: window.dislyze.apiKey,
                title: title,
                content: content,
                company: window.dislyze.company,
                user: window.dislyze.user,
                feedbackCustomFields: window.dislyze.feedbackCustomfields
            })
        })
        const json = await res.json()
        if (json?.error) {
            errorMessage = json.error
            setTimeout(() => {
                errorMessage = ""
            }, 5000)
            return
        }

        submittedSuccessfully = true
        inputFieldSuccess = true
        errorMessage = ""
        title = ""
        content = ""
        setTimeout(() => {
            inputFieldSuccess = false
        }, 500)
        setTimeout(() => {
            submittedSuccessfully = false
        }, 5000)
    }
</script>
<div id="dislyze-container">
    <div on:click="{() => isWidgetOpen = !isWidgetOpen}" id="dislyze-widget-circle" style="{getIconPositionStyle()}"><svg version="1.1" id="Layer_1" stroke-width="1.5" stroke="#fff" fill="#fff"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112.77 122.88" style="enable-background:new 0 0 112.77 122.88;width:26px;" xml:space="preserve"><g><path d="M64.44,61.11c1.79,0,3.12-1.45,3.12-3.12c0-1.78-1.45-3.12-3.12-3.12H24.75c-1.78,0-3.12,1.45-3.12,3.12 c0,1.78,1.45,3.12,3.12,3.12H64.44L64.44,61.11L64.44,61.11L64.44,61.11z M77.45,19.73l18.1-19.14c0.69-0.58,1.39-0.81,2.2-0.35 l14.56,14.1c0.58,0.69,0.69,1.5-0.12,2.31L93.75,36.14L77.45,19.73L77.45,19.73L77.45,19.73L77.45,19.73z M87.74,42.27l-18.66,3.86 l2.36-20.28L87.74,42.27L87.74,42.27z M19.14,13.09h41.73l-3.05,6.45H19.14c-3.48,0-6.65,1.43-8.96,3.73s-3.73,5.46-3.73,8.96 v45.74c0,3.48,1.43,6.66,3.73,8.96c2.3,2.3,5.47,3.73,8.96,3.73h3.72v0.01l0.21,0.01c1.77,0.12,3.12,1.66,2.99,3.43l-1.26,18.1 L48.78,97.7c0.58-0.58,1.38-0.93,2.27-0.93h37.32c3.48,0,6.65-1.42,8.96-3.73c2.3-2.3,3.73-5.48,3.73-8.96V50.45h6.68v42.69 c0.35,9.63-3.58,15.04-19.43,15.7l-32.25-0.74l-32.73,13.87l-0.16,0.13c-1.35,1.16-3.38,1-4.54-0.36c-0.57-0.67-0.82-1.49-0.77-2.3 l1.55-22.34h-0.26c-5.26,0-10.05-2.15-13.52-5.62C2.15,88.03,0,83.24,0,77.98V32.23c0-5.26,2.15-10.05,5.62-13.52 C9.08,15.24,13.87,13.09,19.14,13.09L19.14,13.09L19.14,13.09z M79.69,78.42c1.79,0,3.12-1.45,3.12-3.12 c0-1.79-1.45-3.12-3.12-3.12H24.75c-1.78,0-3.12,1.45-3.12,3.12c0,1.78,1.45,3.12,3.12,3.12H79.69L79.69,78.42L79.69,78.42 L79.69,78.42z M50.39,43.81c1.78,0,3.12-1.45,3.12-3.12c0-1.67-1.45-3.12-3.12-3.12H24.75c-1.78,0-3.12,1.45-3.12,3.12 c0,1.78,1.45,3.12,3.12,3.12H50.39L50.39,43.81L50.39,43.81L50.39,43.81z"/></g></svg></div>
    {#if isWidgetOpen}
        <div id="dislyze-feedback-box" style="{getBoxPositionStyle()}" transition:fade|global>
            <div id="dislyze-widget-heading">Send us feedback</div>
            <div id="dislyze-feedback-box-inner">
                <input
                    style="{getSuccessStyle()}"
                    id="dislyze-feedback-title-input"
                    data-testid="dislyze-feedback-title-input"
                    class="dislyze-feedback-field"
                    type="text"
                    name="dislyze-feedback-title"
                    placeholder="Feedback title (optional)"
                    value="{title}"
                    on:keyup="{(e) => title = e.target.value}"
                />
                <textarea
                    style="{getContentStyle()}{getSuccessStyle()}"
                    id="dislyze-feedback-content-textarea"
                    data-testid="dislyze-feedback-content-textarea"
                    class="dislyze-feedback-field"
                    name="dislyze-content-textarea"
                    placeholder="How can we improve our product? (required)"
                    rows="8"
                    value="{content}"
                    on:change="{(e) => content = e.target.value}"
                />
                <button
                    id="dislyze-send-feedback-button"
                    data-testid="dislyze-send-feedback-button"
                    style="margin-bottom:8px;"
                    type="button"
                    on:click="{submitFeedback}"
                >Send feedback</button>
                {#if submittedSuccessfully}
                    <div id="dislyze-success-message">Feedback submitted.</div>
                {:else if errorMessage}
                    <div id="dislyze-error-message">{errorMessage}</div>
                {/if}
            </div>
            <div id="dislyze-widget-by-message"><span>Widget by</span> <a id="dislyze-widget-by-link" href="https://dislyze.com" target="_blank">dislyze</a></div>
        </div>
    {/if}
</div>

<style>
#dislyze-container {
    color: #fff;
    font-family: Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

#dislyze-widget-circle {
    position: fixed;
    width: 48px;
    height: 48px;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #334155;
    border-radius: 50%;
    box-shadow: 0 0 10px 1px #94a3b8, 0 2px 6px -4px rgb(0 0 0 / 0.1);
    cursor: pointer;
}

#dislyze-widget-circle:hover {
    background-color: #1e293b;
}

#dislyze-feedback-box {
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    background-color: #64748b;
    box-shadow: 0 0px 15px 1px #94a3b8, 0 4px 6px -2px rgb(0 0 0 / 0.1);
    border-radius: 8px;
    width: 284px;
    min-height: 390px;
}

#dislyze-widget-heading {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #1e293b;
    padding: 12px;
    border: 1px solid #0f172a;
    box-shadow: 0 3px 15px 1px rgb(0 0 0 / 0.1), 0 1px 1px -1px #e2e8f0;
    font-weight: bold;
    text-align: center;
}

#dislyze-feedback-box-inner {
    padding: 16px 16px 0 16px;
    min-height: 291px;
}

.dislyze-feedback-field {
    color: #475569;
    border: 1.5px solid #f8fafc;
    font-size: 14px;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 3px 15px 1px rgb(0 0 0 / 0.1), 0 1px 1px -1px rgb(0 0 0 / 0.1);
    width: calc(100% - 16px);
    outline: none;
    font-family: Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.dislyze-feedback-field:focus {
    border: 1.5px solid #94a3b8;
}

.dislyze-feedback-field::placeholder {
    font-weight: 300;
    font-size: 14px;
    color: #0f172a;
}

#dislyze-feedback-content-textarea {
    resize: none;
}

#dislyze-send-feedback-button {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background-color: #334155;
    border: 1.5px double #0f172a;
    color: #fff;
    font-weight: bold;
    box-shadow: 0 3px 15px 1px rgb(0 0 0 / 0.1), 0 1px 2px -1px #e2e8f0;
    cursor: pointer;
}

#dislyze-send-feedback-button:hover {
    background-color: #1e293b;
}

#dislyze-success-message {
    font-size: 14px;
    color: #d9f99d;
    line-break: anywhere;
}

#dislyze-error-message {
    font-size: 14px;
    color: #fecaca;
}

#dislyze-widget-by-message {
    padding: 8px 16px 16px 16px;
    display: flex;
    align-items: end;
    font-size: 12px;
}

#dislyze-widget-by-link {
    color: #bfdbfe;
    margin-left: 4px;
}
</style>