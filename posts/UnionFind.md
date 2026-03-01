#### Tags :: [[Data Structures & Algorithms]]

# Union-Find in Graphs: Mastering Disjoint Sets with Union by Rank and Size

![Union-Find Data Structure](https://algs4.cs.princeton.edu/15uf/images/quick-union-overview.png)

**Disjoint Set Union (DSU)**, also known as **Union-Find**, is a powerful data structure for managing dynamic connectivity in graphs. It efficiently answers queries like "Are nodes A and B connected?" and performs unions to connect components. Let's dive into its workings, optimizations, and code implementation!

---

## Why Union-Find?

Imagine a graph where edges are added dynamically. After each addition, you need to check if two nodes belong to the same component. A brute-force approach (BFS/DFS) would take **O(N + E)** per query. Union-Find reduces this to **O(1)** (amortized) using two core operations: **`find`** and **`union`**.

---

## Core Functionalities

1. **`find(u)`**: Returns the "ultimate parent" of node `u`.
2. **`union(u, v)`**: Connects the components containing `u` and `v`.

### Key Optimizations:

- **Union by Rank/Size**: Balances the tree during unions.
- **Path Compression**: Flattens the structure during `find` for faster future queries.

---

## Union by Rank with Path Compression

### What is Rank?

**Rank** is an estimate of the tree's height. When merging two trees:

- Attach the **shorter tree** under the **taller tree**.
- If ranks are equal, increment the rank of the new root.

### Path Compression

During `find`, all nodes along the path point directly to the root. This reduces future query times.

#### Algorithm:

```python
def find(u):
    if parent[u] != u:
        parent[u] = find(parent[u])  # Path compression
    return parent[u]
```

**Example**:  
After connecting edges `{1-2, 2-3, 4-5, 5-6}`, `find(5)` will update its parent to `4` (root).

---

## Union by Size

Instead of rank, track the **size** (number of nodes) of each component. When merging:

- Attach the **smaller component** to the **larger component**.
- Update the size of the resulting component.

#### Why Size Over Rank?

After path compression, rank (height) becomes ambiguous, but size remains accurate.

**Example**:  
Connecting size-3 and size-2 components results in a size-5 component.

---

## Time Complexity

With both optimizations, each operation runs in **$$O(\alpha(n))$$** time, where $$ \alpha(n) $$ is the **inverse Ackermann function** (effectively a constant for all practical purposes).

---

## Python Implementation

```python
class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n + 1))  # 1-based indexing
        self.rank = [0] * (n + 1)
        self.size = [1] * (n + 1)

    def find(self, u):
        if self.parent[u] != u:
            self.parent[u] = self.find(self.parent[u])  # Path compression
        return self.parent[u]

    def union_by_rank(self, u, v):
        root_u = self.find(u)
        root_v = self.find(v)
        if root_u == root_v:
            return
        # Attach smaller rank under larger rank
        if self.rank[root_u] > self.rank[root_v]:
            self.parent[root_v] = root_u
        else:
            self.parent[root_u] = root_v
            if self.rank[root_u] == self.rank[root_v]:
                self.rank[root_v] += 1

    def union_by_size(self, u, v):
        root_u = self.find(u)
        root_v = self.find(v)
        if root_u == root_v:
            return
        # Attach smaller component to larger component
        if self.size[root_u] < self.size[root_v]:
            self.parent[root_u] = root_v
            self.size[root_v] += self.size[root_u]
        else:
            self.parent[root_v] = root_u
            self.size[root_u] += self.size[root_v]

# Example Usage
ds = DisjointSet(7)
edges = [(1,2), (2,3), (4,5), (6,7), (5,6)]
for u, v in edges:
    ds.union_by_size(u, v)

print("Are 3 and 7 connected?", ds.find(3) == ds.find(7))  # False
ds.union_by_size(3, 7)
print("Are 3 and 7 connected now?", ds.find(3) == ds.find(7))  # True
```

---

## ELI5: Union-Find Explained Simply

Imagine you have **groups of friends**. Each group has a **leader**:

- **Find**: To check if two people are friends, ask, _"Who’s your leader?"_ If both have the same leader, they’re in the same group!
- **Union**: When two groups merge, the **smaller group’s leader** joins the **larger group’s leader**. Everyone now follows the big leader!

**Path Compression**: Next time someone asks, _"Who’s your leader?"_, they remember the top leader directly. No more asking through friends!

---

## When to Use Union-Find?

- **Dynamic Graphs**: Edges added incrementally.
- **Kruskal’s Algorithm** for Minimum Spanning Trees.
- **Connected Components** in undirected graphs.

---
