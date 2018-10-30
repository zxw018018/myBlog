# forusall
## [calculator](#+-())
## [stack](#min_stack) 
## [BST](#closest_binary_search_tree_value)
## [game](#tic_tac_toe)
## [union find](#number_of_connected_components_in_a_undirected_graph)
## [design](#exam_room)
## [bfs](#course_schedule)
## [excel](#excel_sheet_column_number)
## [random](#insert_delete_getrandom)
## [string](#multiply_strings)
## [array](#longest_mountain_in_array)

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
### [BST_iterator](#bst-iterator)
### [Zigzag_iterator](#zigzag-iterator)
### [binary_tree_preorder_traversal](#binary-tree-preorder-traversal)
### [count_complete_tree_nodes](#count-complete-tree-nodes)
### [tic_tac_toe](#tic-tac-toe)
### [design_snake_game](#design-snake-game)
### [number_of_connected_components_in_a_undirected_graph](#number-of-connected-components-in-a-undirected-graph)
### [graph_valid_tree](#graph-valid-tree)
### [exam_room](#exam-room)
### [LRU_cache](#lru-cache)
### [course_schedule](#course-schedule)
### [bus_routes](#bus-routes)
### [excel_sheet_column_number](#excel-sheet-column-number)
### [excel_sheet_column_title](#excel-sheet-column-title)
### [insert_delete_getrandom](#insert-delete-getrandom)
### [insert_delete_getrandom_allow_duplicate](#insert-delete-getrandom-allow-duplicate)
### [multiply_strings](#multiply-strings)
### [Find_All_Anagrams_in_a_String](#Find-All-Anagrams-in-a-String)
### [Group_Anagrams](#Group-Anagrams)
### [minimum_ASCII_Delete_Sum](#minimum-ascii-delete-sum)
### [longest_mountain_in_array](#longest-mountain-in-array)
### [Continuous_Subarray_Sum](#Continuous-Subarray-Sum)
### [Maximum_Subarray](#Maximum-Subarray)
### [Find_the_Duplicate_Number](#Find-the-Duplicate-Number)
### [Max_Chunks_To_Make_Sorted_II](#Max-Chunks-To-Make-Sorted-II)
### [Maximum_Gap](#Maximum-Gap)
### [Sliding_Window_Maximum](#Sliding-Window-Maximum)

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

#### BST Iterator
```java
public class BSTIterator {
    private Stack<TreeNode> s = new Stack<>();

    public BSTIterator(TreeNode root) {
        pushAll(root);
    }

    /** @return whether we have a next smallest number */
    public boolean hasNext() {
        return !s.isEmpty();
    }

    /** @return the next smallest number */
    public int next() {
        TreeNode tmp = s.pop();
        pushAll(tmp.right);
        return tmp.val;
    }
    
    private void pushAll(TreeNode node) {
        while (node != null) {
            s.push(node);
            node = node.left;
        }
    }
}
```
[Top](#forusall)

#### Zigzag iterator
```java
public class ZigzagIterator {
    private Queue<Iterator<Integer>> queue; 
    
    public ZigzagIterator(List<Integer> v1, List<Integer> v2) {
        queue = new LinkedList<Iterator<Integer>> ();
        if (v1.iterator().hasNext()) 
            queue.offer(v1.iterator());
        if (v2.iterator().hasNext()) 
            queue.offer(v2.iterator());
    }

    public int next() {
        Iterator<Integer> next = queue.poll();
        int res = next.next();
        if (next.hasNext()) queue.offer(next);
        return res;
    }

    public boolean hasNext() {
        return !queue.isEmpty();
    }
}
```
[Top](#forusall)

#### Binary tree preorder traversal
```java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<TreeNode> s = new Stack<>();
        if (root != null) s.push(root);
        while (!s.isEmpty()) {
            TreeNode cur = s.pop();
            res.add(cur.val);
            if (cur.right != null) s.push(cur.right);
            if (cur.left != null) s.push(cur.left);
        }
        return res;
    }
}

class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        traversal(root, res);
        return res;
    }
    
    private void traversal(TreeNode root, List<Integer> res) {
        if (root == null) return;
        res.add(root.val);
        traversal(root.left, res);
        traversal(root.right, res);
    }
}
```
[Top](#forusall)

### count complete tree nodes
```java
class Solution {
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int num = 1;
        TreeNode left = root.left;
        TreeNode right = root.right;
        while (right != null) {
            left = left.left;
            right = right.left;
            num = num * 2;
        }
        return num + (left == null ? countNodes(root.right) : countNodes(root.left));
    }
}
```
[Top](#forusall)

#### Tic Tac Toe
```java
class TicTacToe {
    private int[] rows;
    private int[] cols;
    private int diag;
    private int antiDiag;
    private int size;

    /** Initialize your data structure here. */
    public TicTacToe(int n) {
        size = n;
        rows = new int[n];
        cols = new int[n];
    }
    
    /** Player {player} makes a move at ({row}, {col}).
        @param row The row of the board.
        @param col The column of the board.
        @param player The player, can be either 1 or 2.
        @return The current winning condition, can be either:
                0: No one wins.
                1: Player 1 wins.
                2: Player 2 wins. */
    public int move(int row, int col, int player) {
        int add = player == 1 ? 1 : -1;
    
        rows[row] += add;
        cols[col] += add;
        if (row == col)
            diag += add;

        if (col == (size - row - 1))
            antiDiag += add;

        if (Math.abs(rows[row]) == size || Math.abs(cols[col]) == size ||
            Math.abs(diag) == size      || Math.abs(antiDiag) == size) {
            return player;
        }
            
        return 0;
    }
}
```
[Top](#forusall)

#### Design Snake Game
```java
public class SnakeGame {

    //2D position info is encoded to 1D and stored as two copies 
    Set<Integer> set; // this copy is good for fast loop-up for eating body case
    Deque<Integer> body; // this copy is good for updating tail
    int score;
    int[][] food;
    int foodIndex;
    int width;
    int height;
    
    public SnakeGame(int width, int height, int[][] food) {
        this.width = width;
        this.height = height;
        this.food = food;
        set = new HashSet<>();
        set.add(0); //intially at [0][0]
        body = new LinkedList<>();
        body.offerLast(0);
    }
    
  
    public int move(String direction) {
        //case 0: game already over: do nothing
        if (score == -1) {
            return -1;
        }
        
        // compute new head
        int rowHead = body.peekFirst() / width;
        int colHead = body.peekFirst() % width;
        switch (direction) {
            case "U" : rowHead--;
                       break;
            case "D" : rowHead++;
                       break;
            case "L" : colHead--;
                       break;
            default :  colHead++;
        }
        int head = rowHead * width + colHead;
        
        //case 1: out of boundary or eating body
        set.remove(body.peekLast()); // new head is legal to be in old tail's position, remove from set temporarily 
        if (rowHead < 0 || rowHead == height || colHead < 0 || colHead == width || set.contains(head)) {
            return score = -1;
        }
        
        // add head for case2 and case3
        set.add(head); 
        body.offerFirst(head);
        
        //case2: eating food, keep tail, add head
        if (foodIndex < food.length && rowHead == food[foodIndex][0] && colHead == food[foodIndex][1]) {
            set.add(body.peekLast()); // old tail does not change, so add it back to set
            foodIndex++;
            return ++score;
        }
        
        //case3: normal move, remove tail, add head
        body.pollLast();
        return score;
        
    }
}
```
[Top](#forusall)

#### number of connected components in a undirected graph
```java
class Solution {
    public int countComponents(int n, int[][] edges) {
        int[] roots = new int[n];
        for(int i = 0; i < n; i++) roots[i] = i; 

        for(int[] edge : edges) {
            int root1 = find(roots, edge[0]);
            int root2 = find(roots, edge[1]);
            if(root1 != root2) {      
                roots[root1] = root2;  // union
                n--;
            }
        }
        return n;
    }

    public int find(int[] roots, int id) {
        while(roots[id] != id) {
            roots[id] = roots[roots[id]];  // optional: path compression
            id = roots[id];
        }
        return id;
    }
}
```
[Top](#forusall)

#### Graph valid tree
```java
class Solution {
    public boolean validTree(int n, int[][] edges) {
        if (n <= 1) return true;
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        for (int[] edge : edges) {
            int x = find(parent, edge[0]);
            int y = find(parent, edge[1]);
            if (x == y) return false;
            parent[y] = x;
        }
        
        return edges.length == n - 1;
    }
    
    public int find(int[] parent, int i) {
        if (parent[i] != i) {
            parent[i] = find(parent, parent[i]);
        }
        return parent[i];
    }
}
```
[Top](#forusall)

#### exam room
```java
class ExamRoom {
    int N;
    TreeSet<Integer> students;

    public ExamRoom(int N) {
        this.N = N;
        students = new TreeSet();
    }

    public int seat() {
        int student = 0;
        if (students.size() > 0) {
            int maxDis = students.first();
            Integer prev = null;
            for (Integer s: students) {
                if (prev != null) {
                    int d = (s - prev) / 2;
                    if (d > maxDis) {
                        maxDis = d;
                        student = prev + d;
                    }
                }
                prev = s;
            }

            //Considering the right-most seat.
            if (N - 1 - students.last() > maxDis)
                student = N - 1;
        }

        students.add(student);
        return student;
    }

    public void leave(int p) {
        students.remove(p);
    }
}
```
[Top](#forusall)

### LRU cache
```java
class LRUCache {
    static class Node {
        int key;
        int value;
        Node prev;
        Node next;
        public Node (int key, int value) {
            this.key = key;
            this.value = value;
        }
    }
    
    private int capacity;
    private final HashMap<Integer, Node> map;
    private Node head;
    private Node end;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new HashMap<>();
    }
    
    public int get(int key) {
        if (map.containsKey(key)) { //key exist
            Node n = map.get(key);
            remove(n);
            setHead(n);
            return n.value;
        } else { //key not exist
            return -1;
        }
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) { //key exist
            Node old = map.get(key);
            old.value = value;
            remove(old);
            setHead(old);
        } else { //key not exist
            Node created = new Node(key, value);
            if (map.size() >= capacity) { //too full
                map.remove(end.key); //remove from hashmap
                remove(end); //remove from linked list
            } 
            setHead(created);
            map.put(key, created); //add to hashmap
        }
    }
    private void remove(Node n) {
        if (n.prev != null) {  //n is not head
            n.prev.next = n.next;
        } else { //n is head
            head = n.next;
        }
        
        if (n.next != null) { //n is not end
            n.next.prev = n.prev;
        } else { //n is end 
            end = n.prev;
        }
    }
    private void setHead(Node n) {
        n.next = head;
        n.prev = null;
        if (head != null) { //head exist
            head.prev = n;
        }
        head = n; 
        if (end == null) { //end not exist
            end = head;
        }
    }
}
```
[Top](#forusall)

### course schedule
```java
public class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        ArrayList[] graph = new ArrayList[numCourses];
        int[] degree = new int[numCourses];
        Queue queue = new LinkedList();
        int count=0;
        
        for(int i=0;i<numCourses;i++)
            graph[i] = new ArrayList();
            
        for(int i=0; i<prerequisites.length;i++){
            degree[prerequisites[i][1]]++;
            graph[prerequisites[i][0]].add(prerequisites[i][1]);
        }
        for(int i=0; i<degree.length;i++){
            if(degree[i] == 0){
                queue.add(i);
                count++;
            }
        }
        
        while(queue.size() != 0){
            int course = (int)queue.poll();
            for(int i=0; i<graph[course].size();i++){
                int pointer = (int)graph[course].get(i);
                degree[pointer]--;
                if(degree[pointer] == 0){
                    queue.add(pointer);
                    count++;
                }
            }
        }
        if(count == numCourses)
            return true;
        else    
            return false;
    }
}
```
[Top](#forusall)

### bus routes
```java
class Solution {
    public int numBusesToDestination(int[][] routes, int S, int T) {
       HashSet<Integer> visited = new HashSet<>();
       Queue<Integer> q = new LinkedList<>();
       HashMap<Integer, ArrayList<Integer>> map = new HashMap<>();
       int ret = 0; 
        
       if (S==T) return 0; 
        
       for(int i = 0; i < routes.length; i++){
            for(int j = 0; j < routes[i].length; j++){
                ArrayList<Integer> buses = map.getOrDefault(routes[i][j], new ArrayList<>());
                buses.add(i);
                map.put(routes[i][j], buses);                
            }       
        }
                
       q.offer(S); 
       while (!q.isEmpty()) {
           int len = q.size();
           ret++;
           for (int i = 0; i < len; i++) {
               int cur = q.poll();
               ArrayList<Integer> buses = map.get(cur);
               for (int bus: buses) {
                    if (visited.contains(bus)) continue;
                    visited.add(bus);
                    for (int j = 0; j < routes[bus].length; j++) {
                        if (routes[bus][j] == T) return ret;
                        q.offer(routes[bus][j]);  
                   }
               }
           }
        }
        return -1;
    }
}
```
[Top](#forusall)

### excel sheet column number
```java
int result = 0;
for (int i = 0; i < s.length(); result = result * 26 + (s.charAt(i) - 'A' + 1), i++);
return result;
```
[Top](#forusall)

### excel sheet column title
```java
public class Solution {
    public String convertToTitle(int n) {
        StringBuilder result = new StringBuilder();

        while(n>0){
            n--;
            result.insert(0, (char)('A' + n % 26));
            n /= 26;
        }

        return result.toString();
    }
}
```
[Top](#forusall)

### insert delete getrandom
```java
public class RandomizedSet {
    ArrayList<Integer> nums;
    HashMap<Integer, Integer> locs;
    java.util.Random rand = new java.util.Random();
    /** Initialize your data structure here. */
    public RandomizedSet() {
        nums = new ArrayList<Integer>();
        locs = new HashMap<Integer, Integer>();
    }
    
    /** Inserts a value to the set. Returns true if the set did not already contain the specified element. */
    public boolean insert(int val) {
        boolean contain = locs.containsKey(val);
        if ( contain ) return false;
        locs.put( val, nums.size());
        nums.add(val);
        return true;
    }
    
    /** Removes a value from the set. Returns true if the set contained the specified element. */
    public boolean remove(int val) {
        boolean contain = locs.containsKey(val);
        if ( ! contain ) return false;
        int loc = locs.get(val);
        if (loc < nums.size() - 1 ) { // not the last one than swap the last one with this val
            int lastone = nums.get(nums.size() - 1 );
            nums.set( loc , lastone );
            locs.put(lastone, loc);
        }
        locs.remove(val);
        nums.remove(nums.size() - 1);
        return true;
    }
    
    /** Get a random element from the set. */
    public int getRandom() {
        return nums.get( rand.nextInt(nums.size()) );
    }
}
```
[Top](#forusall)

### insert delete getrandom allow duplicate
```java
public class RandomizedCollection {
    ArrayList<Integer> nums;
	HashMap<Integer, Set<Integer>> locs;
	java.util.Random rand = new java.util.Random();
    /** Initialize your data structure here. */
    public RandomizedCollection() {
        nums = new ArrayList<Integer>();
	    locs = new HashMap<Integer, Set<Integer>>();
    }
    
    /** Inserts a value to the collection. Returns true if the collection did not already contain the specified element. */
    public boolean insert(int val) {
        boolean contain = locs.containsKey(val);
	    if ( ! contain ) locs.put( val, new LinkedHashSet<Integer>() ); 
	    locs.get(val).add(nums.size());        
	    nums.add(val);
	    return ! contain ;
    }
    
    /** Removes a value from the collection. Returns true if the collection contained the specified element. */
    public boolean remove(int val) {
        boolean contain = locs.containsKey(val);
	    if ( ! contain ) return false;
	    int loc = locs.get(val).iterator().next();
	    locs.get(val).remove(loc);
	    if (loc < nums.size() - 1 ) {
	       int lastone = nums.get( nums.size()-1 );
	       nums.set( loc , lastone );
	       locs.get(lastone).remove( nums.size()-1);
	       locs.get(lastone).add(loc);
	    }
	    nums.remove(nums.size() - 1);
	   
	    if (locs.get(val).isEmpty()) locs.remove(val);
	    return true;
    }
    
    /** Get a random element from the collection. */
    public int getRandom() {
        return nums.get( rand.nextInt(nums.size()) );
    }
}
```
[Top](#forusall)

### Multiply Strings
```java
public String multiply(String num1, String num2) {
    int m = num1.length(), n = num2.length();
    int[] pos = new int[m + n];
   
    for(int i = m - 1; i >= 0; i--) {
        for(int j = n - 1; j >= 0; j--) {
            int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0'); 
            int p1 = i + j, p2 = i + j + 1;
            int sum = mul + pos[p2];

            pos[p1] += sum / 10;
            pos[p2] = (sum) % 10;
        }
    }  
    
    StringBuilder sb = new StringBuilder();
    for(int p : pos) if(!(sb.length() == 0 && p == 0)) sb.append(p);
    return sb.length() == 0 ? "0" : sb.toString();
}
```
[Top](#forusall)

### Find All Anagrams in a String
```java
public class Solution {
    public List<Integer> findAnagrams(String s, String t) {
        List<Integer> result = new LinkedList<>();
        if(t.length()> s.length()) return result;
        Map<Character, Integer> map = new HashMap<>();
        for(char c : t.toCharArray()){
            map.put(c, map.getOrDefault(c, 0) + 1);
        }
        int counter = map.size();
        
        int begin = 0, end = 0;
        int head = 0;
        int len = Integer.MAX_VALUE;
        
        
        while(end < s.length()){
            char c = s.charAt(end);
            if( map.containsKey(c) ){
                map.put(c, map.get(c)-1);
                if(map.get(c) == 0) counter--;
            }
            end++;
            
            while(counter == 0){
                char tempc = s.charAt(begin);
                if(map.containsKey(tempc)){
                    map.put(tempc, map.get(tempc) + 1);
                    if(map.get(tempc) > 0){
                        counter++;
                    }
                }
                if(end-begin == t.length()){
                    result.add(begin);
                }
                begin++;
            }
            
        }
        return result;
    }
}
```
[Top](#forusall)

### Group Anagrams
```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // make hashmap
        HashMap<String, ArrayList<String>> group = new HashMap<>();
        
        // sort every string
        for (String s: strs) {
            char[] tmp = s.toCharArray();
            Arrays.sort(tmp);
            String key = new String(tmp);
            if (!group.containsKey(key)) {
                group.put(key, new ArrayList<>());
            }
            group.get(key).add(s);
        }
        
        List<List<String>> result = new ArrayList<>();
        // iterate through hashmap to get result
        for (Map.Entry<String, ArrayList<String>> entry : group.entrySet()) {
            ArrayList<String> list = entry.getValue();
            result.add(list);
        }
        return result;
        
    }
}
```
[Top](#forusall)

### Minimum ASCII Delete Sum
```java
class Solution {
    public int minimumDeleteSum(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0 || j == 0){
                    int num = 0;
                    for (int z = 1; z <= Math.max(j, i); z++) {
                        num += (i == 0 ? s2.charAt(z-1) : s1.charAt(z-1));
                    }
                    dp[i][j] = num;
                } else if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = Math.min(s1.charAt(i-1) + dp[i-1][j], s2.charAt(j-1) + dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }
}
```
[Top](#forusall)

### longest mountain in array
```java
class Solution {
    public int longestMountain(int[] A) {
        int max = 0;
        int i = 1;
        int len = A.length;
        while (i < len) {
            while (i < len && A[i-1] == A[i])
                ++i;
            
            int up = 0;
            while (i < len && A[i-1] < A[i]) {
                ++up;
                ++i;
            }
            
            int down = 0;
            while (i < len && A[i-1] > A[i]) {
                ++down;
                ++i;
            }
            
            if (up > 0 && down > 0) 
                max = Math.max(max, up + down + 1);
        }
        return max;
    }
}
```
[Top](#forusall)

### continuous subarray sum
```java
public class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        int sum = 0;
        HashMap < Integer, Integer > map = new HashMap < > ();
        map.put(0, -1);
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            if (k != 0)
                sum = sum % k;
            if (map.containsKey(sum)) {
                if (i - map.get(sum) > 1)
                    return true;
            } else
                map.put(sum, i);
        }
        return false;
    }
}
```
[Top](#forusall)

### Maximum Subarray
```java
class Solution {
    public int maxSubArray(int[] nums) {
        int maxLocal = nums[0];
        int global = nums[0];
        for (int i = 1; i < nums.length; i++) {
            maxLocal = Math.max(nums[i], nums[i] + maxLocal);
            global = Math.max(maxLocal, global);
        }
        return global;
    }
}
```
[Top](#forusall)

### Find the Duplicate Number
```java
class Solution {
    public int findDuplicate(int[] nums) {
        // Find the intersection point of the two runners.
        int tortoise = nums[0];
        int hare = nums[0];
        do {
            tortoise = nums[tortoise];
            hare = nums[nums[hare]];
        } while (tortoise != hare);

        // Find the "entrance" to the cycle.
        int ptr1 = nums[0];
        int ptr2 = tortoise;
        while (ptr1 != ptr2) {
            ptr1 = nums[ptr1];
            ptr2 = nums[ptr2];
        }

        return ptr1;
    }
}
```
[Top](#forusall)

### Max Chunks To Make Sorted II
```java
class Solution {
    public int maxChunksToSorted(int[] arr) {
        Map<Integer, Integer> count = new HashMap();
        int ans = 0, nonzero = 0;

        int[] expect = arr.clone();
        Arrays.sort(expect);

        for (int i = 0; i < arr.length; ++i) {
            int x = arr[i], y = expect[i];

            count.put(x, count.getOrDefault(x, 0) + 1);
            if (count.get(x) == 0) nonzero--;
            if (count.get(x) == 1) nonzero++;

            count.put(y, count.getOrDefault(y, 0) - 1);
            if (count.get(y) == -1) nonzero++;
            if (count.get(y) == 0) nonzero--;

            if (nonzero == 0) ans++;
        }

        return ans;
    }
}
```
[Top](#forusall)

### Maximum Gap
```java
class Solution {
    public int maximumGap(int[] nums) {
        if (nums.length < 2) return 0;
        radixSort(nums);
        int maxDiff = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length - 1; i++) {
            maxDiff = Math.max(maxDiff, nums[i+1] - nums[i]);
        }
        return maxDiff;
    }
    
    private void radixSort(int[] nums) {
        int maxNum = Integer.MIN_VALUE;
        int minNum = Integer.MAX_VALUE;
        // find max and min 
        for (int x : nums) {
            maxNum = Math.max(maxNum, x);
            minNum = Math.min(minNum, x);
        }
        int diff = maxNum - minNum;
        int diffNum = Integer.toString(diff).length();
        // create 10 buckets
        ArrayList<Integer>[] buckets = new ArrayList[10];
        for (int i = 0; i < 10; i++) {
            buckets[i] = new ArrayList<>();
        }
        
        
        for (int i = 0; i < diffNum; i++) {
            for (int x: nums) {
                int index = getDigit(x - minNum, i);
                ArrayList<Integer> bucket = buckets[index];
                bucket.add(x);
            }
            
            int index = 0;
            for (ArrayList<Integer> bucket: buckets) {
                for (int x: bucket) {
                    nums[index++] = x;
                }
                bucket.clear();
            }
        }
    }
    
    private int getDigit(int n, int i) {
        for (int j = 0; j < i; j++) {
            n /= 10;
        }
        return n % 10;
    }
}
```
[Top](#forusall)

### sliding window maximum
```java
public int[] maxSlidingWindow(int[] a, int k) {		
		if (a == null || k <= 0) {
			return new int[0];
		}
		int n = a.length;
		int[] r = new int[n-k+1];
		int ri = 0;
		// store index
		Deque<Integer> q = new ArrayDeque<>();
		for (int i = 0; i < a.length; i++) {
			// remove numbers out of range k
			while (!q.isEmpty() && q.peek() < i - k + 1) {
				q.poll();
			}
			// remove smaller numbers in k range as they are useless
			while (!q.isEmpty() && a[q.peekLast()] < a[i]) {
				q.pollLast();
			}
			// q contains index... r contains content
			q.offer(i);
			if (i >= k - 1) {
				r[ri++] = a[q.peek()];
			}
		}
		return r;
	}
```
[Top](#forusall)
