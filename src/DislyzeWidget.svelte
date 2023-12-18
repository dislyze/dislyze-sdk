<svelte:options customElement="dislyze-widget" />

<script lang="ts">
    import { fade } from "svelte/transition";

    let isWidgetOpen = false;
    let title = ""
    let content = ""
    let errorMessage = ""
    let submittedSuccessfully = false
    
    const toggleWidget = () => {
        console.log("asd", isWidgetOpen)
        isWidgetOpen = !isWidgetOpen
    }

    const getIconPositionStyle = () => {
        return "right: 16px; bottom: 16px;"
    }

    const getBoxPositionStyle = () => {
        return "right: 16px; bottom: 72px;"
    }

    const submitFeedback = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sdk/feedback`, {
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
        setTimeout(() => {
            submittedSuccessfully = false
        }, 5000)
    }
</script>
<div class="dislyze-container">
    <div on:click="{() => isWidgetOpen = !isWidgetOpen}" class="dislyze-widget-circle" style="{getIconPositionStyle()}"><svg version="1.1" id="Layer_1" stroke-width="1.5" stroke="#fff" fill="#fff"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112.77 122.88" style="enable-background:new 0 0 112.77 122.88;width:26px;" xml:space="preserve"><g><path d="M64.44,61.11c1.79,0,3.12-1.45,3.12-3.12c0-1.78-1.45-3.12-3.12-3.12H24.75c-1.78,0-3.12,1.45-3.12,3.12 c0,1.78,1.45,3.12,3.12,3.12H64.44L64.44,61.11L64.44,61.11L64.44,61.11z M77.45,19.73l18.1-19.14c0.69-0.58,1.39-0.81,2.2-0.35 l14.56,14.1c0.58,0.69,0.69,1.5-0.12,2.31L93.75,36.14L77.45,19.73L77.45,19.73L77.45,19.73L77.45,19.73z M87.74,42.27l-18.66,3.86 l2.36-20.28L87.74,42.27L87.74,42.27z M19.14,13.09h41.73l-3.05,6.45H19.14c-3.48,0-6.65,1.43-8.96,3.73s-3.73,5.46-3.73,8.96 v45.74c0,3.48,1.43,6.66,3.73,8.96c2.3,2.3,5.47,3.73,8.96,3.73h3.72v0.01l0.21,0.01c1.77,0.12,3.12,1.66,2.99,3.43l-1.26,18.1 L48.78,97.7c0.58-0.58,1.38-0.93,2.27-0.93h37.32c3.48,0,6.65-1.42,8.96-3.73c2.3-2.3,3.73-5.48,3.73-8.96V50.45h6.68v42.69 c0.35,9.63-3.58,15.04-19.43,15.7l-32.25-0.74l-32.73,13.87l-0.16,0.13c-1.35,1.16-3.38,1-4.54-0.36c-0.57-0.67-0.82-1.49-0.77-2.3 l1.55-22.34h-0.26c-5.26,0-10.05-2.15-13.52-5.62C2.15,88.03,0,83.24,0,77.98V32.23c0-5.26,2.15-10.05,5.62-13.52 C9.08,15.24,13.87,13.09,19.14,13.09L19.14,13.09L19.14,13.09z M79.69,78.42c1.79,0,3.12-1.45,3.12-3.12 c0-1.79-1.45-3.12-3.12-3.12H24.75c-1.78,0-3.12,1.45-3.12,3.12c0,1.78,1.45,3.12,3.12,3.12H79.69L79.69,78.42L79.69,78.42 L79.69,78.42z M50.39,43.81c1.78,0,3.12-1.45,3.12-3.12c0-1.67-1.45-3.12-3.12-3.12H24.75c-1.78,0-3.12,1.45-3.12,3.12 c0,1.78,1.45,3.12,3.12,3.12H50.39L50.39,43.81L50.39,43.81L50.39,43.81z"/></g></svg></div>
    {#if isWidgetOpen}
        <div class="dislyze-feedback-box" style="{getBoxPositionStyle()}" transition:fade|global>
            <div class="dislyze-feedback-heading" style="margin-bottom:12px;">Let us know how we can improve our product.</div>
            <div class="dislyze-input-label" style="margin-bottom:8px;">Feedback title</div>
            <input
                class="dislyze-input-field"
                style="margin-bottom:12px;"
                id="dislyze-feedback-title"
                data-testid="dislyze-feedback-title"
                type="text"
                name="dislyze-feedback-title"
                value="{title}"
                on:keyup="{(e) => title = e.target.value}"
            />
            <div class="dislyze-input-label" style="margin-bottom:8px;">Feedback details</div>
            <textarea
                class="dislyze-input-field"
                style="margin-bottom:16px;"
                id="dislyze-content-textarea"
                data-testid="dislyze-content-textarea"
                name="dislyze-content-textarea"
                rows="8"
                on:change="{(e) => content = e.target.value}"
        />
        {#if submittedSuccessfully}
            <div class="dislyze-response-box dislyze-success-box" style="margin-bottom:12px;">Feedback submitted.</div>
        {:else if errorMessage}
            <div class="dislyze-response-box dislyze-error-box" style="margin-bottom:12px;">{errorMessage}</div>
        {/if}
        <button
                class="dislyze-send-feedback-button"
                data-testid="dislyze-submit-button"
                type="button"
                on:click="{submitFeedback}"
            >Send feedback</button
            >
            <div class="dislyze-bottom-gradiant"></div>
        </div>
    {/if}
</div>

<style>
.dislyze-container {
    font-family: Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.dislyze-widget-circle {
    position: absolute;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ea580c;
    border-radius: 50%;
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    cursor: pointer;
}

.dislyze-widget-circle:hover {
    background-color: #c2410c;
}

.dislyze-feedback-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    box-shadow: 0 0px 15px 3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
    border-radius: 8px;
    width: 284px;
    height: 384px;
}

.dislyze-feedback-heading {
    font-size: 14px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-image: linear-gradient(
        180deg,
        hsl(32deg 98% 83%) 0%,
        hsl(32deg 99% 85%) 8%,
        hsl(32deg 100% 87%) 16%,
        hsl(32deg 100% 89%) 25%,
        hsl(32deg 100% 91%) 35%,
        hsl(32deg 100% 93%) 47%,
        hsl(32deg 100% 94%) 59%,
        hsl(32deg 100% 96%) 73%,
        hsl(32deg 100% 98%) 88%,
        hsl(0deg 0% 100%) 100%
    );
    padding: 8px 12px;
}

.dislyze-success-box {
    background-color: #dcfce7;
    border: 1px solid #bbf7d0;
}

.dislyze-error-box {
    background-color: #fee2e2;
    border: 1px solid #fecaca;
}

.dislyze-input-label {
    padding-left: 16px;
}

.dislyze-input-field {
    border: 1px solid rgb(0 0 0 / 0.1);
    padding: 8px;
    box-shadow: 0 3px 15px 1px rgb(0 0 0 / 0.1), 0 1px 1px -1px rgb(0 0 0 / 0.1);
    width: calc(100% - 16px);
    resize: none;
}


.dislyze-response-box {
    font-size: 14px;
    padding: 8px 12px;
}

.dislyze-send-feedback-button {
    width: 100%;
    padding: 8px;
    background-color: #ea580c;
    color: #fff;
    border: 0;
    cursor: pointer;
}

.dislyze-bottom-gradiant {
    height: 26px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-image: linear-gradient(
        0deg,
        hsl(32deg 98% 83%) 0%,
        hsl(32deg 99% 85%) 8%,
        hsl(32deg 100% 87%) 16%,
        hsl(32deg 100% 89%) 25%,
        hsl(32deg 100% 91%) 35%,
        hsl(32deg 100% 93%) 47%,
        hsl(32deg 100% 94%) 59%,
        hsl(32deg 100% 96%) 73%,
        hsl(32deg 100% 98%) 88%,
        hsl(0deg 0% 100%) 100%
    );
}
</style>