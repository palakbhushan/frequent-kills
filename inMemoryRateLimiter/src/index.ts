import { TokenBucket } from "./tokenBucket";

const userBuckets: Map<string, TokenBucket> = new Map();

// Configuration
const CAPACITY = 5;
const REFILL_RATE = 1;

function isRequestAllowed(userId: string): boolean {
    if (!userBuckets.has(userId)) {
        userBuckets.set(
            userId,
            new TokenBucket(CAPACITY, REFILL_RATE)
        );
    }

    const bucket = userBuckets.get(userId)!;
    return bucket.allowRequest();
}

// Simulate traffic
const userId = "user-123";

setInterval(() => {
    const allowed = isRequestAllowed(userId);

    console.log(
        allowed ? "✅ Request allowed" : "❌ Rate limit exceeded"
    );
}, 300);
