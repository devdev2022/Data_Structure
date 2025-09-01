import { Heap } from "./heap/heap.mjs";

class Node {
  constructor() {
    this.children = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let currentNode = this.root;
    for (let char of word) {
      if (currentNode.children[char] != null) {
        currentNode = currentNode.children[char];
      } else {
        let newNode = new Node();
        currentNode.children[char] = newNode;
        currentNode = newNode;
      }
    }
    currentNode.children["*"] = 0;
  }

  search(word, isCounting = false) {
    let currentNode = this.root;
    for (let char of word) {
      if (currentNode.children[char] != null) {
        currentNode = currentNode.children[char];
      } else {
        return null;
      }
    }

    if (isCounting == true) {
      currentNode.children["*"]++;
    }

    return currentNode;
  }

  getAllWords(startNode = null, word = "", words = []) {
    let currentNode = this.root;
    if (startNode != null) {
      currentNode = startNode;
    }

    for (let key in currentNode.children) {
      let childNode = currentNode.children[key];
      if (key == "*") {
        words.push(new WordData(word, childNode));
      } else {
        this.getAllWords(childNode, word + key, words);
      }
    }
    return words;
  }

  autoComplete(word) {
    let currentNode = this.search(word);
    if (currentNode == null) {
      return null;
    }
    return this.getAllWords(currentNode, word);
  }

  autoCompleteByCount(word) {
    let words = this.autoComplete(word);

    let heap = new Heap();
    heap.isBigPriority = function (first, second) {
      return first.priority > second.priority;
    };

    for (let word of words) {
      heap.insert(word);
    }

    let sortedBySearchCount = [];
    do {
      let removed = heap.remove();
      if (removed == null) {
        break;
      } else {
        sortedBySearchCount.push(removed);
      }
    } while (true);

    return sortedBySearchCount;
  }
}

class WordData {
  constructor(word, count) {
    this.word = word;
    this.count = count;
    this.priority = count;
  }
}

let trie = new Trie();
trie.insert("고등어");
trie.insert("김치");
trie.insert("김치찜");
trie.insert("김치찌개");

console.log("===== 두부 검색 =====");
console.log(trie.search("두부"));

console.log(trie.search("===== 김치 검색 ====="));
console.log(trie.search("김치"));

console.log("===== 모든 단어 검색 ====");
console.log(trie.getAllWords());

console.log("===== 김 검색 =====");
console.log(trie.autoComplete("김"));

console.log("===== 검색어 추천 =====");
trie.search("김치찌개", true);
trie.search("김치찌개", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치찜", true);

console.log(trie.autoCompleteByCount("김치"));
