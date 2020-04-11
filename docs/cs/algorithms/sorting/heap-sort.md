#### Overview

Heap sort is a comparison-based sorting technique based on [Binary Heap](../../data-structure/heap.md) data structure.

#### Algorithm

1. Build a max heap from the input data.
2. At this point, the largest item is stored at the root of the heap. Replace it with the last item of the heap followed by reducing the size of heap by 1. Finally, heapify the root of tree.
3. Repeat step 2 while size of heap is greater than 1.

#### Implementation

```java
static <T extends Comparable<? super T>> void heapSort(T[] array) {
	Heap<T> heap = new MaxHeap<>(array);
	for (int i = heap.size() - 1; i > 0; i--) {
		Heap.swap(heap.array, i, 0);
		heap.heapSize--;
		heap.heapify(0);
	}
}
```

#### Time Complexity

Time complexity of `heapify()` is $O(\log{}n)$. Time complexity of `buildHeap()` is $O(n)$ and overall time complexity of Heap Sort is $O(n\log{}n)$.

#### Notes

1. Heap sort is an **in-place** algorithm.
2. Its typical implementation is **not stable**.
3. Heap sort algorithm has limited uses because Quick Sort and Merge Sort are better in practice. Nevertheless, the Heap data structure itself is enormously used.

#### References

1. [HeapSort - GeeksforGeeks](https://www.geeksforgeeks.org/heap-sort/)
