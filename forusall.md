## [calculator](#+-())


### [+-()](#calculator-1) 
### [+-*/](#calculator-2)          
### [+-*/()](#calculator-3)

#### calculator 1
`+-()`
```java
class Solution {
    public int calculate(String s) {
        int len = s.length();
        int res = 0;
        int op = 1;
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < len; i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                int val = c - '0';
                while (i + 1 < len && Character.isDigit(s.charAt(i + 1))) {
                    val = val * 10 + s.charAt(i + 1) - '0';
                    i++;
                }
                res += val * op;
            } else if (c == '+') {
                op = 1;
            } else if (c == '-') {
                op = -1;
            } else if (c == '(') {
                stack.push(res);
                stack.push(op);
                res = 0;
                op = 1;
            } else if (c == ')') {
                res = res * stack.pop() + stack.pop();
            }
        }
        return res;
    }
}
```

#### calculator 2
`+-*/`
```java
class Solution {
    public int calculate(String s) {
        if (s == null || s.length() == 0) return 0;
        int prevNum = 0;
        int res = 0;
        char prevOp = '+';
        int len = s.length();
        
        for (int i = 0; i < len; i++) {
            char c = s.charAt(i);
            if (c == ' ') continue;
            if (Character.isDigit(c)) {
                int val = c - '0';
                while (i + 1 < len && Character.isDigit(s.charAt(i + 1))) {
                    val = val * 10 + s.charAt(i + 1) - '0';
                    i++;
                }
                if (prevOp == '+') {
                    res += prevNum;
                    prevNum = val;
                } else if (prevOp == '-') {
                    res += prevNum;
                    prevNum = -val;
                } else if (prevOp == '*') {
                    prevNum = prevNum * val;
                } else if (prevOp == '/') {
                    prevNum = prevNum / val;
                }
            } else {
                prevOp = c;
            }
            
        }
        
        res += prevNum;
        return res;
    }
}
```
#### calculator 3
`+-*/()`
```java
class Solution {
    public int calculate(String s) {
        // op1: '+-' op2: '*/'
        int res1 = 0, op1 = 1;  
        int res2 = 1, op2 = 1;
        int len = s.length();

        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < len; i++) {
            char c = s.charAt(i);

            if (Character.isDigit(c)) {
                int val = c - '0';

                while (i + 1 < len && Character.isDigit(s.charAt(i + 1))) {
                    val = val * 10 + s.charAt(i + 1) - '0';
                    i++;
                }

                res2 = (op2 == 1 ? res2 * val : res2 / val);

            } else if (c == '(') {
                stack.push(res1); stack.push(op1);
                stack.push(res2); stack.push(op2);

                res1 = 0; op1 = 1;
                res2 = 1; op2 = 1;

            } else if (c == ')') {
                int val = res1 + op1 * res2;

                op2 = stack.pop(); res2 = stack.pop();
                op1 = stack.pop(); res1 = stack.pop();

                res2 = (op2 == 1 ? res2 * val : res2 / val);

            } else if (c == '*' || c == '/') {
                op2 = (c == '*' ? 1 : -1);

            } else if (c == '+' || c == '-') {
                res1 = res1 + op1 * res2;
                op1 = (c == '+' ? 1 : -1);

                res2 = 1; op2 = 1;
            }
        }

        return (res1 + op1 * res2);
    }
}
```
