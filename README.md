Feature detection.

## Usage
```javascript
var capabilities = require('env.capabilities');

if (capabilities.hasVideo()) { /* do something */ }
if (capabilities.hasFlash()) { /* do something else */ }
if (capabilities.hasCanvas()) { /* do something else */ }
...
```