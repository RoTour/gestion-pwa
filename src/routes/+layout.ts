import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
 
injectSpeedInsights();
// @ts-expect-error - BigInt is not supported in JSON
BigInt.prototype.toJSON = function() { return Number(this); }
