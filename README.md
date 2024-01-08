# Dislyze SDK

Full documentation available at https://app.dislyze.com/settings/api-key (requires login).

## Installation and setup

There are 2 ways to install the SDK: Via npm or cdn.

### Install via npm

```
npm install dislyze-sdk
```

Then, add the following code to the root of your app:

```
import "dislyze-sdk/dist/dislyze-sdk";
import { initDislyze } from "dislyze-sdk";

initDislyze({ apiKey: "YOUR API KEY" }); // replace "YOUR API KEY" with the api key displayed at https://app.dislyze.com/settings/api-key
```

### Install via cdn

```
<script src="https://cdn.jsdelivr.net/npm/dislyze-sdk@latest/dist/dislyze-sdk.js"></script>
```

Then, add the following code to the root of your app:

```
<script>dislyze.initDislyze({ apiKey: "YOUR API KEY" });</script> // replace "YOUR API KEY" with the api key displayed at https://app.dislyze.com/settings/api-key
```

This will show a widget on the bottom right of your app.

To test if your installation is working, visit https://app.dislyze.com/settings/api-key and reference step 2.

To learn how to customize or hide the widget, visit https://app.dislyze.com/settings/api-key and reference step 3.
