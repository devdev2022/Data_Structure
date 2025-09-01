import { Heap } from "./heap.mjs";

class MyData {
  constructor(data) {
    this.data = data;
    this.priority = data;
  }
}

let heap = new Heap();
heap.insert(new MyData(2));
heap.insert(new MyData(8));
heap.insert(new MyData(5));
heap.insert(new MyData(6));
heap.insert(new MyData(10));
heap.insert(new MyData(4));
heap.insert(new MyData(3));
heap.insert(new MyData(7));
heap.insert(new MyData(9));
heap.insert(new MyData(1));

let arr = [];

arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());

console.log(arr);
