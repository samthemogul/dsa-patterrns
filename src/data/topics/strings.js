// Strings
export const name = "Strings";

export const topics = [
  {
    id: "string-algorithms-kmp",
    title: "KMP Algorithm",
    subtitle: "String Algorithms",
    summary: "Efficiently searches for occurrences of a 'word' within a 'text' using a precomputed LPS array.",
    complexity: {
      time: "O(n + m)",
      space: "O(m)",
      note: "Linear regardless of input — the LPS table means the text pointer never moves backwards.",
    },
    description: "The Knuth-Morris-Pratt (KMP) algorithm is an efficient string-searching algorithm that avoids re-scanning characters of the text by utilizing information about prefixes of the pattern that are also suffixes. It pre-processes the pattern to build a 'Longest Proper Prefix which is also Suffix' (LPS) array. This array helps in skipping characters in the text when a mismatch occurs, leading to a linear time complexity of O(N + M), where N is text length and M is pattern length.",
    useCases: [
      "Searching for a pattern in a large text file. Text editors for 'find' functionality. DNA sequence analysis. Any scenario requiring efficient substring search."
    ],
    illustration: `
                        <div class="flex flex-col items-center font-mono text-sm">
                            <div class="bg-blue-100 p-2 rounded-md border border-blue-300 mb-2">
                                Text: A B C D A B C D E
                            </div>
                            <div class="bg-green-100 p-2 rounded-md border border-green-300">
                                Pattern: A B C D
                            </div>
                            <div class="text-sm text-gray-600 mt-2">KMP uses LPS array to avoid redundant comparisons.</div>
                        </div>
                    `,
    code: {
      python: `def compute_lps_array(pattern):
    length = 0
    lps = [0] * len(pattern)
    i = 1
    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps

def kmp_search(text, pattern):
    M = len(pattern)
    N = len(text)
    lps = compute_lps_array(pattern)
    
    i = 0 # index for text
    j = 0 # index for pattern
    while i < N:
        if pattern[j] == text[i]:
            i += 1
            j += 1
        if j == M:
            # print(f"Found pattern at index {i - j}")
            j = lps[j - 1]
        elif i < N and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return -1 # Or list of indices`,
      typescript: `function computeLPSArray(pattern: string): number[] {
    const M = pattern.length;
    const lps: number[] = new Array(M).fill(0);
    let length = 0;
    let i = 1;

    while (i < M) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

function kmpSearch(text: string, pattern: string): number {
    const N = text.length;
    const M = pattern.length;
    const lps = computeLPSArray(pattern);

    let i = 0; // index for text
    let j = 0; // index for pattern
    while (i < N) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        if (j === M) {
            // console.log(\`Found pattern at index \${i - j}\`);
            return i - j; // Return first occurrence
            // j = lps[j - 1]; // For all occurrences
        } else if (i < N && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return -1;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Implement strStr()",
          "url": "https://leetcode.com/problems/implement-strstr/"
        },
        {
          "name": "Longest Common Prefix",
          "url": "https://leetcode.com/problems/longest-common-prefix/"
        },
        {
          "name": "Valid Anagram",
          "url": "https://leetcode.com/problems/valid-anagram/"
        },
        {
          "name": "Count and Say",
          "url": "https://leetcode.com/problems/count-and-say/"
        },
        {
          "name": "Reverse String",
          "url": "https://leetcode.com/problems/reverse-string/"
        }
      ],
      "medium": [
        {
          "name": "Find the Index of the First Occurrence in a String",
          "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/"
        },
        {
          "name": "Shortest Palindrome",
          "url": "https://leetcode.com/problems/shortest-palindrome/"
        },
        {
          "name": "Longest Happy Prefix",
          "url": "https://leetcode.com/problems/longest-happy-prefix/"
        },
        {
          "name": "Repeated String Match",
          "url": "https://leetcode.com/problems/repeated-string-match/"
        },
        {
          "name": "Rabin-Karp Algorithm (GFG)",
          "url": "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/"
        },
        {
          "name": "Minimum Window Substring",
          "url": "https://leetcode.com/problems/minimum-window-substring/"
        },
        {
          "name": "Longest Repeating Character Replacement",
          "url": "https://leetcode.com/problems/longest-repeating-character-replacement/"
        },
        {
          "name": "Permutation in String",
          "url": "https://leetcode.com/problems/permutation-in-string/"
        },
        {
          "name": "Group Anagrams",
          "url": "https://leetcode.com/problems/group-anagrams/"
        },
        {
          "name": "Decode String",
          "url": "https://leetcode.com/problems/decode-string/"
        }
      ],
      "hard": [
        {
          "name": "Shortest Palindrome",
          "url": "https://leetcode.com/problems/shortest-palindrome/"
        },
        {
          "name": "Substring with Concatenation of All Words",
          "url": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
        },
        {
          "name": "Text Justification",
          "url": "https://leetcode.com/problems/text-justification/"
        },
        {
          "name": "Distinct Subsequences",
          "url": "https://leetcode.com/problems/distinct-subsequences/"
        },
        {
          "name": "Longest Duplicate Substring",
          "url": "https://leetcode.com/problems/longest-duplicate-substring/"
        }
      ]
    },
  },
  {
    id: "string-algorithms-rabinkarp",
    title: "Rabin-Karp Algorithm",
    subtitle: "String Algorithms",
    summary: "A probabilistic string matching algorithm using hashing to quickly filter out impossible matches.",
    complexity: {
      time: "O(n + m)",
      space: "O(1)",
      note: "Average case. Degrades to O(n·m) if hash collisions force a full comparison at every position.",
    },
    description: "The Rabin-Karp algorithm is a string-searching algorithm that uses hashing to find any one of a set of pattern strings in a text. It computes a hash value for the pattern and then for each window of the text of the same size as the pattern. If the hash values match, it performs a character-by-character comparison to confirm a true match, mitigating hash collisions. Its average time complexity is O(N + M), but worst-case can be O(N*M) with many hash collisions.",
    useCases: [
      "Plagiarism detection. Finding multiple patterns in a text. Large text processing where exact matches are needed."
    ],
    illustration: `
                        <div class="flex flex-col items-center font-mono text-sm">
                            <div class="bg-blue-100 p-2 rounded-md border border-blue-300 mb-2">
                                Text: A B C D E F G
                            </div>
                            <div class="bg-green-100 p-2 rounded-md border border-green-300">
                                Pattern: C D E
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Hash of 'CDE' matches window hash.</div>
                        </div>
                    `,
    code: {
      python: `def rabin_karp(text, pattern, q=101, d=256):
    M = len(pattern)
    N = len(text)
    p_hash = 0
    t_hash = 0
    h = 1

    for i in range(M - 1):
        h = (h * d) % q

    for i in range(M):
        p_hash = (d * p_hash + ord(pattern[i])) % q
        t_hash = (d * t_hash + ord(text[i])) % q

    for i in range(N - M + 1):
        if p_hash == t_hash:
            match = True
            for j in range(M):
                if text[i + j] != pattern[j]:
                    match = False
                    break
            if match:
                return i # Pattern found at index i

        if i < N - M:
            t_hash = (d * (t_hash - ord(text[i]) * h) + ord(text[i + M])) % q
            if t_hash < 0:
                t_hash += q
    return -1`,
      typescript: `function rabinKarp(text: string, pattern: string, q: number = 101, d: number = 256): number {
    const M = pattern.length;
    const N = text.length;
    let pHash = 0; // hash value for pattern
    let tHash = 0; // hash value for text window
    let h = 1; // d^(M-1) % q

    for (let i = 0; i < M - 1; i++) {
        h = (h * d) % q;
    }

    for (let i = 0; i < M; i++) {
        pHash = (d * pHash + pattern.charCodeAt(i)) % q;
        tHash = (d * tHash + text.charCodeAt(i)) % q;
    }

    for (let i = 0; i <= N - M; i++) {
        if (pHash === tHash) {
            let match = true;
            for (let j = 0; j < M; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return i; // Pattern found at index i
            }
        }

        if (i < N - M) {
            tHash = (d * (tHash - text.charCodeAt(i) * h) + text.charCodeAt(i + M)) % q;
            if (tHash < 0) { // Ensure positive hash
                tHash += q;
            }
        }
    }
    return -1;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Implement strStr()",
          "url": "https://leetcode.com/problems/implement-strstr/"
        },
        {
          "name": "Longest Common Prefix",
          "url": "https://leetcode.com/problems/longest-common-prefix/"
        },
        {
          "name": "Valid Palindrome",
          "url": "https://leetcode.com/problems/valid-palindrome/"
        },
        {
          "name": "Reverse String",
          "url": "https://leetcode.com/problems/reverse-string/"
        },
        {
          "name": "Check if One String Swap Can Make Strings Equal",
          "url": "https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal/"
        }
      ],
      "medium": [
        {
          "name": "Find the Index of the First Occurrence in a String",
          "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/"
        },
        {
          "name": "Repeated String Match",
          "url": "https://leetcode.com/problems/repeated-string-match/"
        },
        {
          "name": "Longest Repeating Character Replacement",
          "url": "https://leetcode.com/problems/longest-repeating-character-replacement/"
        },
        {
          "name": "Permutation in String",
          "url": "https://leetcode.com/problems/permutation-in-string/"
        },
        {
          "name": "Minimum Window Substring",
          "url": "https://leetcode.com/problems/minimum-window-substring/"
        },
        {
          "name": "Group Anagrams",
          "url": "https://leetcode.com/problems/group-anagrams/"
        },
        {
          "name": "Count Palindromic Substrings",
          "url": "https://leetcode.com/problems/palindromic-substrings/"
        },
        {
          "name": "Longest Palindromic Substring",
          "url": "https://leetcode.com/problems/longest-palindromic-substring/"
        },
        {
          "name": "Shortest Palindrome",
          "url": "https://leetcode.com/problems/shortest-palindrome/"
        },
        {
          "name": "Decode String",
          "url": "https://leetcode.com/problems/decode-string/"
        }
      ],
      "hard": [
        {
          "name": "Substring with Concatenation of All Words",
          "url": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
        },
        {
          "name": "Longest Duplicate Substring",
          "url": "https://leetcode.com/problems/longest-duplicate-substring/"
        },
        {
          "name": "Find All Duplicates in a String (GFG)",
          "url": "https://www.geeksforgeeks.org/find-all-duplicates-in-a-string/"
        },
        {
          "name": "Distinct Subsequences",
          "url": "https://leetcode.com/problems/distinct-subsequences/"
        },
        {
          "name": "Text Justification",
          "url": "https://leetcode.com/problems/text-justification/"
        }
      ]
    },
  },
];
