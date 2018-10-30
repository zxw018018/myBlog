# forusall
## [calculator](#+-())
## [stack](#min_stack) 
## [BST](#closest_binary_search_tree_value)

### [+-()](#calculator-1) 
### [+-*/](#calculator-2)          
### [+-*/()](#calculator-3)
### [min_stack](#min-stack)
### [max_stack](#max-stack)
### [implement_queue_using_stacks](#implement-queue-using-stacks)
### [closest_binary_search_tree_value](#closest-binary-search-tree-value)
### [closest_binary_search_tree_value_II](#closest-binary-search-tree-value-II)
### [insert_into_a_binary_search_tree](#insert-into-a-binary-search-tree)
### [delete_node_in_a_BST](#delete-node-in-a-BST)

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
[Top](#forusall)

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
[Top](#forusall)

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
[Top](#forusall)

#### min stack
```java
class MinStack {
    private Stack<Integer> stack;
    private Stack<Integer> minStack;
    
    /** initialize your data structure here. */
    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }
    
    public void push(int x) {
        stack.push(x);
        int minVal = minStack.isEmpty()? x: Math.min(minStack.peek(), x);
        minStack.push(minVal);
        
    }
    
    public void pop() {
        stack.pop();
        minStack.pop();
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        return minStack.peek();
    }
}
```
[Top](#forusall)

#### max stack
```java
class MaxStack {
    private Stack<Integer> stack;
    private Stack<Integer> maxStack;

    public MaxStack() {
        stack = new Stack<>();
        maxStack = new Stack<>();
    }
    
    public void push(int x) {
        int max = maxStack.isEmpty() ? x : maxStack.peek();
        maxStack.push(max > x ? max : x);
        stack.push(x);
    }
    
    public int pop() {
        maxStack.pop();
        return stack.pop();
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int peekMax() {
        return maxStack.peek();
    }
    
    public int popMax() {
        int max = peekMax();
        Stack<Integer> buffer = new Stack<>();
        while (top() != max) buffer.push(pop());
        pop();
        while (!buffer.isEmpty()) push(buffer.pop());
        return max;
    }
}
```
[Top](#forusall)

#### Implement queue using stacks
```java
class MyQueue {
    private Stack<Integer> s;
    private Stack<Integer> tmp;

    /** Initialize your data structure here. */
    public MyQueue() {
        s = new Stack<>();
        tmp = new Stack<>();
    }
    
    /** Push element x to the back of queue. */
    public void push(int x) {
        while (!s.isEmpty()) {
            int item = s.pop();
            tmp.push(item);
        }
        s.push(x);
        while (!tmp.isEmpty()) {
            int item = tmp.pop();
            s.push(item);
        }
    }
    
    /** Removes the element from in front of queue and returns that element. */
    public int pop() {
        return s.pop();
    }
    
    /** Get the front element. */
    public int peek() {
        return s.peek();
    }
    
    /** Returns whether the queue is empty. */
    public boolean empty() {
        return s.isEmpty();
    }
}
```
[Top](#forusall)

#### Closest Binary Search Tree Value
```java
class Solution {
    public int closestValue(TreeNode root, double target) {
        int res = root.val;   
        while (root != null) {
            if (Math.abs(target - root.val) < Math.abs(target - res)) {
                res = root.val;
            }      
            root = root.val > target ? root.left : root.right;
        }     
        return res;      
    }    
}
```
[Top](#forusall)

#### Closest Binary Search Tree Value II
```java
class Solution {
    public List<Integer> closestKValues(TreeNode root, double target, int k) {
        Deque<Integer> deque = new LinkedList<>();
        
        inorder(root, deque);
        while (deque.size() > k) {
            if (Math.abs(deque.peekFirst() - target) > Math.abs(deque.peekLast() - target))
                deque.pollFirst();
            else 
                deque.pollLast();
        }
        
        return new ArrayList<Integer>(deque);
    }
    
    public void inorder(TreeNode root, Deque<Integer> deque) {
        if (root == null) return;
        inorder(root.left, deque);
        deque.add(root.val);
        inorder(root.right, deque);
    }
}
```
[Top](#forusall)

#### Insert into a Binary Search Tree
```java
class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        if (root == null) {
            return new TreeNode(val);
        }
        if (val < root.val) {
            root.left = insertIntoBST(root.left, val);
        } else {
            root.right = insertIntoBST(root.right, val);
        }
        return root;
    }
}
```
[Top](#forusall)

#### delete node in a BST
```java
class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null;

        if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else {
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }

            TreeNode minNode = findMin(root.right);
            root.val = minNode.val;
            root.right = deleteNode(root.right, root.val);
        }
        return root;
    }
    
    private TreeNode findMin(TreeNode root) {
        while (root.left != null) root = root.left;
        return root;
    }
}
```
[Top](#forusall)


