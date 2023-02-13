import ArrayStack from './01_实现栈结构Stack(数组)'

function isValid(s: string): boolean {
  const stack = new ArrayStack<string>();

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    switch (c) {
      case "{":
        stack.push("}");
        break;
      case "[":
        stack.push("]");
        break;
      case "(":
        stack.push(")");
        break;
      default:
        if (stack.pop() !== c) return false;
    }
  }
  return stack.isEmpty();
}