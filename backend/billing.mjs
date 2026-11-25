// Payment-independent entitlement foundation. No payment processor is enabled.
export const plans=Object.freeze({free:{tutor:false},family:{tutor:true}});
export function entitlement(row,now=new Date()){return row?.plan==='family'&&row?.status==='active'&&Number.isFinite(Date.parse(row.expires_at))&&Date.parse(row.expires_at)>now.getTime()?'family':'free'}
export function billingEnabled(env){return env.BILLING_ENABLED==='true'&&Boolean(env.BILLING_PROVIDER_SECRET)}
