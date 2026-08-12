// Tries
export const name = "Tries";

export const topics = [
  {
    id: "tries-implementation",
    title: "Trie Implementation",
    subtitle: "Tries",
    summary: "Tree-like data structure for efficient retrieval of keys in a dataset of strings.",
    complexity: {
      time: "O(L)",
      space: "O(A·N·L)",
      note: "Lookup depends only on word length L, not on how many words are stored — the whole point of a trie.",
    },
    description: "A Trie (pronounced 'try', from retrieval) is a tree-like data structure used to store a dynamic set of strings or associative array where the keys are strings. Unlike a binary search tree, nodes in a trie do not store the full key; instead, the position of a node in the tree defines the key associated with it. Each node typically stores a map of characters to child nodes, and a boolean flag indicating if it marks the end of a word. Tries are highly efficient for operations like prefix matching, auto-completion, and spell-checking, offering O(L) time complexity for insertion, deletion, and search (where L is the length of the string), which is often faster than hash tables for string operations as it avoids hash collisions and handles prefixes naturally.",
    useCases: [
      "Autocompletion in search bars. Spell checkers. IP routing (longest prefix matching). Dictionary implementations. DNA sequence matching. T9 predictive text."
    ],
    illustration: `
                        <div class="text-center font-mono">
                            <div class="bg-blue-100 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">Root</div>
                            <div class="flex justify-center w-full space-x-4 mt-2">
                                <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">c</div>
                                <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">a</div>
                            </div>
                            <div class="flex justify-center w-full space-x-4 mt-2">
                                <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">a</div>
                                <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">t</div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Path 'c' -> 'a' -> 't' forms "cat".</div>
                        </div>
                    `,
    code: {
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True`,
      typescript: `class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Inserts a word into the trie.
     * @param {string} word The word to insert.
     */
    insert(word: string): void {
        let currentNode = this.root;
        for (const char of word) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }
            currentNode = currentNode.children.get(char)!;
        }
        currentNode.isEndOfWord = true;
    }

    /**
     * Searches for a word in the trie.
     * @param {string} word The word to search for.
     * @returns {boolean} True if the word is in the trie, false otherwise.
     */
    search(word: string): boolean {
        let currentNode = this.root;
        for (const char of word) {
            if (!currentNode.children.has(char)) {
                return false;
            }
            currentNode = currentNode.children.get(char)!;
        }
        return currentNode.isEndOfWord;
    }

    /**
     * Checks if there is any word in the trie that starts with the given prefix.
     * @param {string} prefix The prefix to search for.
     * @returns {boolean} True if any word starts with the prefix, false otherwise.
     */
    startsWith(prefix: string): boolean {
        let currentNode = this.root;
        for (const char of prefix) {
            if (!currentNode.children.has(char)) {
                return false;
            }
            currentNode = currentNode.children.get(char)!;
        }
        return true;
    }
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Implement Trie (Prefix Tree)",
          "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
        },
        {
          "name": "Longest Common Prefix",
          "url": "https://leetcode.com/problems/longest-common-prefix/"
        },
        {
          "name": "Word Search II (Partially Trie)",
          "url": "https://leetcode.com/problems/word-search-ii/"
        }
      ],
      "medium": [
        {
          "name": "Add and Search Word - Data structure design",
          "url": "https://leetcode.com/problems/add-and-search-word-data-structure-design/"
        },
        {
          "name": "Map Sum Pairs",
          "url": "https://leetcode.com/problems/map-sum-pairs/"
        },
        {
          "name": "Implement Magic Dictionary",
          "url": "https://leetcode.com/problems/implement-magic-dictionary/"
        },
        {
          "name": "Shortest Unique Substring (GFG)",
          "url": "https://www.geeksforgeeks.org/shortest-unique-substring/"
        },
        {
          "name": "Replace Words",
          "url": "https://leetcode.com/problems/replace-words/"
        }
      ],
      "hard": [
        {
          "name": "Word Search II",
          "url": "https://leetcode.com/problems/word-search-ii/"
        },
        {
          "name": "Concatenated Words",
          "url": "https://leetcode.com/problems/concatenated-words/"
        },
        {
          "name": "Maximum XOR of Two Numbers in an Array (using Trie)",
          "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"
        },
        {
          "name": "Palindrome Pairs",
          "url": "https://leetcode.com/problems/palindrome-pairs/"
        },
        {
          "name": "Stream of Characters",
          "url": "https://leetcode.com/problems/stream-of-characters/"
        }
      ]
    },
  },
];
