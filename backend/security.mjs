import {randomBytes,scryptSync,timingSafeEqual,createHash} from 'node:crypto';
export function hashPassword(password){const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(password,salt,64).toString('hex')}
export function verifyPassword(password,stored){try{const [salt,key]=stored.split(':');const a=Buffer.from(key,'hex'),b=scryptSync(password,salt,64);return a.length===b.length&&timingSafeEqual(a,b)}catch{return false}}
export const token=()=>randomBytes(32).toString('hex');
export const digest=x=>createHash('sha256').update(x).digest('hex');
export const validPassword=x=>typeof x==='string'&&x.length>=12&&x.length<=128;
export const validEmail=x=>typeof x==='string'&&x.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
export const validUuid=x=>typeof x==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x);
export const validPractice=x=>x&&typeof x.subject==='string'&&/^[a-z]{1,30}$/.test(x.subject)&&typeof x.lesson==='string'&&/^[a-z0-9_-]{1,80}$/i.test(x.lesson)&&Number.isInteger(x.score)&&Number.isInteger(x.total)&&x.total>0&&x.total<=100&&x.score>=0&&x.score<=x.total;