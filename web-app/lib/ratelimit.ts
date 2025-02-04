import { Ratelimit } from '@upstash/ratelimit';
import redis from '@/db/redis';

// Create a new ratelimiter, that allows 5 requests per minute
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '1m'),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: '@upstash/ratelimit',
});

export default ratelimit;
