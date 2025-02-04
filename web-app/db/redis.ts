import config from '@/lib/config';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: config.env.upstash.redisUrl,
  token: config.env.upstash.redisToken,
});

export default redis;
