# Dislyze SDK

## Installtion and setup

There are 2 ways to install the SDK: Via npm or cdn.

### Install via npm

```
npm install dislyze-sdk
```

Then, add the following code to the root of your app:

```
import "dislyze-sdk/dist/dislyze-sdk";
import { initDislyze } from "dislyze-sdk";

initDislyze({ apiKey: "UnYuzzvveP54zez4C2ePPLue4YuPPYUrUPYP" });
```

### Install via cdn

```
<script src="https://cdn.jsdelivr.net/npm/dislyze-sdk@0.0.3/dist/dislyze-sdk.js"></script>
```

Then, add the following code to the root of your app:

```
<script>dislyze.initDislyze({ apiKey: "UnYuzzvveP54zez4C2ePPLue4YuPPYUrUPYP" });</script>
```

This will show a widget on the bottom right of your app. If you want to customize or hide the widget, please reference [Customize your installation](#customize-your-installation).

To test if your installation is working, visit https://app.dislyze.com/settings/api-key and reference step 2.
To learn how to customize or hide the widget, visit https://app.dislyze.com/settings/api-key and reference step 3.
