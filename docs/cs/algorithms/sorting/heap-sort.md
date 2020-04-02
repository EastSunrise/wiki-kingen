#### Overview

Heap sort is a comparison-based sorting technique based on Binary Heap data structure.

#### Binary Heap

A Binary Heap is a Complete Binary Tree where items are stored in a special order such that value in a parent node is greater(or smaller) than the values in its two children nodes. The former is called as max heap and the latter is called min heap.

The heap can be represented by array. If the parent node is stored at index $i$, the left child can be calculated by $2i+1$ and right child by $2i+2$ (assuming the indexing starts at 0).

#### Algorithm

1. Build a max heap from the input data.
2. At this point, the largest item is stored at the root of the heap. Replace it with the last item of the heap followed by reducing the size of heap by 1. Finally, heapify the root of tree.
3. Repeat step 2 while size of heap is greater than 1.

##### Heap

```java
// Data structure of Heap
public class Heap<V extends Comparable<? super V>> {
	V[] array;
	int heapSize;// [0, array.length]

	Heap(V[] array) {
		this.array = array;
		heapSize = array.length;
		buildHeap();
	}

	// build a max heap
	void buildHeap() {
		for (int i = array.length / 2 - 1; i >= 0; i--) {
			heapify(i);
		}
	}

	void heapify(int i){
		while (true) {
			int l = left(i), r = right(i), largest = i;
			if (l < heapSize && array[l].compareTo(array[largest]) > 0) {
				largest = l;
			}

			if (r < heapSize && array[r].compareTo(array[largest]) > 0) {
				largest = r;
			}

			if (largest != i) {
				swap(array, i, largest);
			} else {
				break;
			}
		}
	}

	/* common operations */

	void insert(V key) {
		if (heapSize == array.length) {
			throw new ArrayIndexOutOfBoundsException();
		}

		heapSize++;
		updateKey(heapSize - 1, key);
	}

	void delete(int i) {
		if (isEmpty() || i < 0 || i >= heapSize) {
			throw new ArrayIndexOutOfBoundsException();
		}

		updateKey(i, array[heapSize - 1]);
		heapSize--;
	}

	void updateKey(int i, V key) {
		if (i >= heapSize) {
			throw new IndexOutOfBoundsException();
		}

		array[i] = key;
		heapify(i);
		while (i > 0 && array[parent(i)].compareTo(array[i]) < 0) {
			swap(array, i, parent(i));
			i = parent(i);
		}
	}

	V getHead() {
		return isEmpty() ? null : array[0];
	}

	V extractHead() {
		if (isEmpty()) {
			return null;
		}

		V max = getHead();
		array[0] = array[heapSize-- - 1];
		heapify(0);
		return max;
	}


	/* Basic methods */

	// Get index of parent node
	int parent(int i) {
		return (i - 1) >> 1;
	}

	// Get index of left child node
	int left(int i) {
		return (i << 1) + 1;
	}

	// Get index of right child node
	int right(int i) {
		return (i + 1) << 1;
	}

	int size() {
		return heapSize;
	}

	boolean isEmpty() {
		return heapSize == 0;
	}
}
```

##### Heap Sort

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

##### Time Complexity

Time complexity of `heapify()` is $O(\log{}n)$. Time complexity of `buildHeap()` is $O(n)$ and overall time complexity of Heap Sort is $O(n\log{}n)$.

#### Notes

1. Heap sort is an **in-place** algorithm.
2. Its typical implementation is **not stable**.
3. Heap sort algorithm has limited uses because Quick Sort and Merge Sort are better in practice. Nevertheless, the Heap data structure itself is enormously used.

#### References

1. [HeapSort - GeeksforGeeks](https://www.geeksforgeeks.org/heap-sort/)