export class ExchangeRate {
  private from: string;
  private to: string;
  private rate: number;

  constructor(from: string, to: string, rate: number) {
    this.from = from;
    this.to = to;
    this.rate = rate;
  }

  getFrom(): string {
    return this.from;
  }

  getTo(): string {
    return this.to;
  }

  getRate(): number {
    return this.rate;
  }
}