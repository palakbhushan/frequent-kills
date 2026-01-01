export class TokenBucket {
    private capacity: number;
    private tokens: number;
    private refillRate: number;
    private lastRefillTime: number;

    constructor(capacity: number, refillRate: number) {
        this.capacity = capacity;
        this.tokens = capacity;
        this.refillRate = refillRate;
        this.lastRefillTime = Date.now();
    }

    private refill(): void {
        const now = Date.now();
        const elapsedSeconds = (now - this.lastRefillTime) / 1000;

        const tokensToAdd = elapsedSeconds * this.refillRate;
        this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);

        this.lastRefillTime = now;
    }

    public allowRequest(): boolean {
        this.refill();

        if (this.tokens >= 1) {
            this.tokens -= 1;
            return true;
        }
        return false;
    }
}
