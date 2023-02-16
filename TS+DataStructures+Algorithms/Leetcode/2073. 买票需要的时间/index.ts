function timeRequiredToBuy(tickets: number[], k: number): number {
  let count: number = 0;
  let i = 0;
  while (tickets[k] > 0) {
    if (tickets[i] > 0) {
      tickets[i]--;
      count++;
    }
    if (i < tickets.length - 1) i++;
    else i = 0
  }

  return count;
}

console.log(timeRequiredToBuy([2, 3, 2], 2));
